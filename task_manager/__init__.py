"""CrawJUD - Sistema de Automação Jurídica."""

import importlib

from celery import Celery
from clear import clear
from dynaconf import FlaskDynaconf

import task_manager._hook as hook
from task_manager.base import FlaskTask
from task_manager.config import CeleryConfig, config
from task_manager.extensions import flaskapp

__all__ = ["hook"]

clear()


def make_celery() -> Celery:
    """Create and configure a Celery instance with Quart application context.

    Returns:
        Celery: Configured Celery instance.

    """
    FlaskDynaconf(
        app=flaskapp,
        instance_relative_config=True,
        extensions_list="EXTENSIONS",
        dynaconf_instance=config,
    )

    celery_app = Celery(flaskapp.name, task_cls=FlaskTask)
    celery_app.config_from_object(CeleryConfig(flaskapp.config))
    celery_app.set_default()
    flaskapp.extensions["celery"] = celery_app

    importlib.import_module("task_manager.tasks", __package__)

    return celery_app


app = make_celery()
