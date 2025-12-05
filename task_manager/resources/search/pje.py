"""Implemente buscas de processos no sistema PJe.

Este módulo contém classes e funções para consultar processos
no sistema PJe utilizando um cliente HTTP.
"""

from __future__ import annotations

from contextlib import suppress
from json.decoder import JSONDecodeError
from typing import TYPE_CHECKING

from task_manager.constants import HTTP_OK_STATUS
from task_manager.interfaces.pje import DictResults
from task_manager.resources.elements import pje as el
from task_manager.resources.search.main import SearchBot

if TYPE_CHECKING:
    from httpx import Client

    from task_manager.types_app import AnyType


class PjeSeach(SearchBot):
    """Implemente buscas de processos no sistema PJe.

    Esta classe herda de SearchBot e executa consultas
    utilizando um cliente HTTP para obter dados de processos.
    """

    def __call__(
        self,
        data: dict,
        row: int,
        client: Client,
    ) -> DictResults | None:
        """Realize a busca de um processo no sistema PJe.

        Args:
            data (BotData): Dados do processo a serem consultados.
            row (int): Índice da linha do processo na planilha de entrada.
            client (Client): Instância do cliente HTTP
                para requisições ao sistema PJe.
            regiao (str):regiao

        Returns:
            (DictResults | Literal["Nenhum processo encontrado"]): Resultado da
                busca do processo ou mensagem indicando
                que nenhum processo foi encontrado.

        """
        # Envia mensagem de log para task assíncrona
        id_processo: str
        numero_processo = data["NUMERO_PROCESSO"]
        message = f"Buscando processo {numero_processo}"
        self.print_message(
            message=message,
            row=row,
            message_type="log",
        )

        link = el.LINK_DADOS_BASICOS.format(
            trt_id=self.regiao,
            numero_processo=numero_processo,
        )

        response = client.get(url=link)

        if response.status_code != HTTP_OK_STATUS:
            self.print_message(
                message="Nenhum processo encontrado",
                message_type="error",
                row=row,
            )
            return None

        with suppress(JSONDecodeError, KeyError):
            data_request = response.json()
            if isinstance(data_request, list):
                data_request: dict[str, AnyType] = data_request[0]
            id_processo = data_request.get("id", "")

        if not id_processo:
            self.print_message(
                message="Nenhum processo encontrado",
                message_type="error",
                row=row,
            )
            return None

        url_ = el.LINK_CONSULTA_PROCESSO.format(
            trt_id=self.regiao,
            id_processo=id_processo,
        )
        result = client.get(url=url_)

        if not result:
            self.print_message(
                message="Nenhum processo encontrado",
                message_type="error",
                row=row,
            )
            return None

        return DictResults(
            id_processo=id_processo,
            data_request=result.json(),
        )
