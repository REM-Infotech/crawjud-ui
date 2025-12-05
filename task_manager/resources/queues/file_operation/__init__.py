"""Operações de planilhas."""

from task_manager.resources.queues.file_operation.error import SaveError
from task_manager.resources.queues.file_operation.success import SaveSuccess

__all__ = ["SaveError", "SaveSuccess"]
