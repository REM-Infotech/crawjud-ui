"""Fornece classes e funções para gerenciar andamentos do bot Jusds.

Este módulo inclui:
- Classe Andamentos: executa e gerencia andamentos;
- Função raise_error: lança exceções de execução.
"""

from typing import NoReturn

from selenium.webdriver.support.wait import WebDriverWait  # noqa: F401

from task_manager.common.exceptions import ExecutionError
from task_manager.resources.elements import jusds as el  # noqa: F401

from .master import JusdsBot


def raise_error(message: str) -> NoReturn:
    """Empty.

    Raises:
        ExecutionError: ExecutionError

    """
    raise ExecutionError(message=message)


class Andamentos(JusdsBot):
    """Gerencie e execute andamentos do bot Jusds.

    Esta classe executa e controla o processamento dos andamentos.
    """

    def execution(self) -> None:
        """Execute o processamento dos andamentos do bot Jusds.

        Itera sobre os andamentos e finaliza a execução ao término.
        """
        frame = self.frame
        self.total_rows = len(frame)

        for pos, value in enumerate(frame):
            self.row = pos + 1
            self.bot_data = value

        self.finalizar_execucao()

    def queue(self) -> None:
        """Implementa a lógica de fila dos andamentos.

        Esta função será responsável por gerenciar a fila.
        """
