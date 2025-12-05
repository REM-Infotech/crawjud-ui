"""Task module for Celery."""

from task_manager import bots
from task_manager.tasks import database, mail

__all__ = ["bots", "database", "mail"]
