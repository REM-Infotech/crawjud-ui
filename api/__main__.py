"""Inicie a aplicação Flask e o servidor SocketIO.

Este script é o ponto de entrada principal para a API. Ele cria a aplicação,
carrega as rotas e executa o servidor SocketIO na porta definida.
"""

from __future__ import annotations

import importlib
from os import environ
from typing import TYPE_CHECKING

from api import create_app

if TYPE_CHECKING:
    from flask_socketio import SocketIO

# Porta padrão para execução do servidor Flask
FLASK_PORT: int = 5000

# Crie a aplicação Flask
app = create_app()
# Defina a porta a partir da variável de ambiente ou use o padrão
port: int = int(environ.get("FLASK_PORT", FLASK_PORT)) or FLASK_PORT
# Obtenha a extensão SocketIO da aplicação
io: SocketIO = app.extensions["socketio"]
# Importe rotas para garantir o registro
importlib.import_module("api.routes", __package__)

# Execute o servidor SocketIO
io.run(app, host="localhost", port=port, allow_unsafe_werkzeug=True)
