"""Autenticador PJe."""

from __future__ import annotations

import base64
import traceback
from contextlib import suppress
from os import environ
from pathlib import Path
from typing import TYPE_CHECKING
from uuid import uuid4

import jpype
import pyotp
import requests
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.serialization import (
    Encoding,
)
from cryptography.hazmat.primitives.serialization.pkcs12 import load_pkcs12

# Importa classes Java
from jpype import JArray, JByte, JClass
from pykeepass import PyKeePass
from selenium.common import TimeoutException
from selenium.common.exceptions import (
    UnexpectedAlertPresentException,
)
from selenium.webdriver import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.wait import WebDriverWait

from task_manager.common import auth_error
from task_manager.constants import NO_CONTENT_STATUS
from task_manager.constants.pje import ENDPOINT_DESAFIO
from task_manager.resources.auth.main import AutenticadorBot
from task_manager.resources.elements import pje as el
from task_manager.resources.formatadores import random_base36

if TYPE_CHECKING:
    from cryptography.x509 import Certificate
    from seleniumwire.request import Request

    from task_manager.controllers.pje import PjeBot

if not jpype.isJVMStarted():
    jpype.startJVM()


ByteArrayInputStream = JClass("java.io.ByteArrayInputStream")
CertificateFactory = JClass("java.security.cert.CertificateFactory")
ArrayList = JClass("java.util.ArrayList")


class AutenticadorPJe(AutenticadorBot):
    """Implemente autenticação no PJe usando certificado digital.

    Atributos:
        _chain (list[Certificate]): Cadeia de certificados.
        bot (PjeBot): Instância do bot PJe.
    """

    _chain: list[Certificate]
    bot: PjeBot

    def __init__(self, bot: PjeBot) -> None:
        """Inicialize o autenticador PJe com certificado e chave.

        Args:
            bot (PjeBot): Instância do bot PJe.

        """
        super().__init__(bot=bot)

    def load_certificado(self) -> None:
        senha_certificado = self.senha_certificado.encode()
        bytes_cert = self.certificado.read_bytes()

        tuple_load_pkcs12 = load_pkcs12(bytes_cert, senha_certificado)

        self.key = tuple_load_pkcs12.key
        self.cert = tuple_load_pkcs12.cert
        self._chain = [self.cert]
        self._chain.extend(tuple_load_pkcs12.additional_certs)
        self.alg_map = {
            "SHA256withRSA": hashes.SHA256(),
            "SHA1withRSA": hashes.SHA1(),  # noqa: S303
            "MD5withRSA": hashes.MD5(),  # noqa: S303
        }

    def __call__(self) -> bool:
        """Realize o login no PJe e retorne True se for bem-sucedido.

        Returns:
            bool: Indica se o login foi realizado com sucesso.

        """
        sucesso_login = False
        self.load_certificado()
        try:
            url = el.LINK_AUTENTICACAO_SSO.format(regiao=self.regiao)
            self.driver.get(url)

            if "https://sso.cloud.pje.jus.br/" not in self.driver.current_url:
                return True

            self.wait.until(
                ec.presence_of_element_located((
                    By.CSS_SELECTOR,
                    el.CSS_FORM_LOGIN,
                )),
            )

            self._login_certificado()
            self._desafio_duplo_fato()
            sucesso_login = WebDriverWait(
                driver=self.driver,
                timeout=10,
                poll_frequency=0.3,
                ignored_exceptions=(UnexpectedAlertPresentException),
            ).until(ec.url_contains("pjekz"))

        except (
            TimeoutException,
            UnexpectedAlertPresentException,
            requests.RequestException,
        ) as e:
            exc = "\n".join(traceback.format_exception(e))
            self.print_message(
                message=f"Erro ao realizar autenticação: {exc}",
                message_type="error",
            )

        return sucesso_login

    def _login_certificado(self) -> None:
        autenticado = self.autenticar()
        if not autenticado:
            auth_error()

        desafio = autenticado[0]
        uuid_sessao = autenticado[1]

        self.driver.execute_script(el.COMMAND, el.ID_INPUT_DESAFIO, desafio)
        self.driver.execute_script(el.COMMAND, el.ID_CODIGO_PJE, uuid_sessao)
        self.driver.execute_script("document.forms[0].submit()")

    def _desafio_duplo_fato(self) -> None:
        otp_uri = _get_otp_uri()
        otp = str(pyotp.parse_uri(uri=otp_uri).now())

        input_otp = WebDriverWait(self.driver, 60).until(
            ec.presence_of_element_located((
                By.CSS_SELECTOR,
                'input[id="otp"]',
            )),
        )

        input_otp.send_keys(otp)
        input_otp.send_keys(Keys.ENTER)

    def _confirmar_login(self) -> bool:
        with suppress(TimeoutException):
            return WebDriverWait(
                driver=self.driver,
                timeout=10,
                poll_frequency=0.3,
                ignored_exceptions=(UnexpectedAlertPresentException),
            ).until(ec.url_contains("pjekz"))

        return False

    def assinar(self, valor: bytes | str) -> None:
        """Assine o valor informado usando o certificado digital.

        Args:
            valor (bytes | str): Valor a ser assinado.

        Returns:
            None

        Raises:
            ValueError: Se o algoritmo não for suportado.

        """
        if isinstance(valor, str):
            valor = valor.encode()

        digest = self.alg_map.get("MD5withRSA")
        if not digest:
            raise ValueError("Algoritmo não suportado: " + "MD5withRSA")

        self._assinatura = self.key.sign(
            valor,
            padding.PKCS1v15(),
            digest,
        )

        return self

    def autenticar(self) -> tuple[str, str] | None:
        """Realiza a autenticação no PJe e retorne desafio e uuid.

        Returns:
            tuple[str, str] | None: Desafio e uuid ou None se falhar.

        """
        # enviar diretamente ao endpoint PJe (exemplo)
        desafio = random_base36()
        self.assinar(desafio)
        uuid_tarefa = str(uuid4())
        ssopayload = {
            "uuid": uuid_tarefa,
            "mensagem": desafio,
            "assinatura": self.assinatura_base64,
            "certChain": self.cadeia_certificado_b64,
        }

        resp = requests.post(ENDPOINT_DESAFIO, json=ssopayload, timeout=30)

        if resp.status_code == NO_CONTENT_STATUS:
            return desafio, uuid_tarefa

        return None, None

    def generate_pkipath_java(self) -> str:
        """Gere cadeia de certificados em formato PkiPath Base64.

        Returns:
            str: Cadeia de certificados codificada em Base64.

        """
        cf = CertificateFactory.getInstance("X.509")
        java_chain = ArrayList()

        for cert in self._chain:
            # converte o certificado DER em InputStream Java
            der = cert.public_bytes(Encoding.DER)
            der_array = JArray(JByte)(der)
            bais = ByteArrayInputStream(der_array)
            java_cert = cf.generateCertificate(bais)
            java_chain.add(java_cert)

        # gera o CertPath e exporta em formato PkiPath
        cert_path = cf.generateCertPath(java_chain)
        pkipath_bytes = cert_path.getEncoded("PkiPath")

        return base64.b64encode(bytes(pkipath_bytes)).decode("utf-8")

    def get_headers_cookies(self) -> tuple[dict[str, str], dict[str, str]]:
        """Retorne os headers e cookies atuais do navegador.

        Returns:
            (tuple[dict[str, str], dict[str, str]]):
                Dicionários com headers e cookies.

        """
        return (
            self._header_to_dict(),
            self._cookie_to_dict(),
        )

    def _header_to_dict(self) -> dict[str, str]:
        request = self._filter_request()

        return {
            str(header): str(value) for header, value in request.headers.items()
        }

    def _cookie_to_dict(self) -> dict[str, str]:
        cookies_driver = self.driver.get_cookies()
        return {
            str(cookie["name"]): str(cookie["value"])
            for cookie in cookies_driver
        }

    def _filter_request(self) -> Request:
        return list(
            filter(
                lambda item: f"https://pje.trt{self.regiao}.jus.br/pje-comum-api/"
                in item.url,
                self.driver.requests,
            ),
        )[-1]

    @property
    def assinatura_base64(self) -> str | None:
        """Retorne assinatura em Base64 ou None se não existir."""
        if self._assinatura:
            return base64.b64encode(self._assinatura).decode()

        return None

    @property
    def cadeia_certificado_b64(self) -> str | None:
        """Retorne a cadeia de certificados codificada em Base64."""
        if self._chain:
            return self.generate_pkipath_java()

        return None

    @property
    def regiao(self) -> str:
        """Retorne a região do bot PJe."""
        return self.bot.regiao

    @property
    def senha_certificado(self) -> str:
        return self.bot.config["senha_certificado"]

    @property
    def certificado(self) -> Path:
        out = self.bot.output_dir_path
        path_certificado = out.joinpath(self.bot.config["certificado"])

        if not path_certificado.exists():
            certificado = self.bot.config["certificado"]
            path_object = Path(self.bot.config["folder_objeto_minio"])
            object_name = path_object.joinpath(certificado).as_posix()

            self.bot.file_manager.fget_object(
                bucket_name="outputexec-bots",
                object_name=object_name,
                file_path=str(path_certificado),
            )

        return path_certificado


def _get_otp_uri() -> str:
    file_db = str(Path(environ.get("KBDX_PATH")))
    file_pw = environ.get("KBDX_PASSWORD")
    kp = PyKeePass(filename=file_db, password=file_pw)

    return kp.find_entries(
        otp=".*",
        url="https://sso.cloud.pje.jus.br/",
        regex=True,
        first=True,
    ).otp
