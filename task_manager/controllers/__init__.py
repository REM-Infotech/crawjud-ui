"""Módulo de controle de classes para os robôs."""

from task_manager.controllers.csi import CsiBot
from task_manager.controllers.elaw import ElawBot
from task_manager.controllers.esaj import ESajBot
from task_manager.controllers.pje import PjeBot
from task_manager.controllers.projudi import ProjudiBot

__all__ = ["CsiBot", "ESajBot", "ElawBot", "PjeBot", "ProjudiBot"]
