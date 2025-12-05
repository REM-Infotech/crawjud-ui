# Guia de Contribuição – Backend Python

## Requisitos

- Python 3.14 (free thread)
- [uv](https://docs.astral.sh/uv)
- Docker (opcional, para serviços auxiliares)
- Redis e/ou outros serviços conforme `.env`

> **Importante:**
> Defina obrigatoriamente a variável de ambiente `UV_PYTHON` apontando para o executável correto do Python 3.14 free thread (exemplo: `python3.14t.exe` ou caminho absoluto).

- Exemplo no Windows PowerShell:
  > ```powershell
  > $env:UV_PYTHON = "C:\caminho\para\python3.14t.exe"
  > ```
- Exemplo no Linux/macOS:
  > ```sh
  > export UV_PYTHON=/usr/bin/python3.14t
  > ```

> **Obrigatório:**
> Instale e rode o pre-commit para garantir a padronização do código:

- PowerShell:
  > ```powershell
  > & "pre-commit install"
  > & "pre-commit run --all-files"
  > ```
- sh:
  > ```sh
  > pre-commit install
  > pre-commit run --all-files
  > ```

## Como Contribuir

- Faça um fork do repositório e clone para sua máquina:
  - PowerShell:
    > ```powershell
    > & "git clone https://github.com/seu-usuario/CrawJUD.git"
    > cd CrawJUD
    > ```
  - sh:
    > ```sh
    > git clone https://github.com/seu-usuario/CrawJUD.git
    > cd CrawJUD
    > ```

- Crie uma branch descritiva:
  - PowerShell:
    > ```powershell
    > & "git checkout -b feat/nome-da-feature"
    > ```
  - sh:
    > ```sh
    > git checkout -b feat/nome-da-feature
    > ```

- Instale as dependências com [uv](https://docs.astral.sh/uv):
  - PowerShell:
    > ```powershell
    > & "uv sync"
    > ```
  - sh:
    > ```sh
    > uv sync
    > ```

- Copie `.env.copy` para `.env` e ajuste conforme necessário.
- Siga o padrão de código e utilize docstrings em português.
- Escreva funções e métodos com tipagem explícita.

## Testes e Qualidade

- Execute os testes:
  - PowerShell:
    > ```powershell
    > & "pytest"
    > ```
  - sh:
    > ```sh
    > pytest
    > ```

- Ou com cobertura:
  - PowerShell:
    > ```powershell
    > & "pytest --cov=crawjud"
    > ```
  - sh:
    > ```sh
    > pytest --cov=crawjud
    > ```

- Use Docker Compose para serviços auxiliares, se necessário:

  > ```sh
  > docker compose -f compose-minio.yaml up -d
  > ```

## Boas Práticas

- Use nomes descritivos para variáveis e funções.
- Consulte o [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md).
- Abra um Pull Request detalhando suas alterações e relacione issues, se aplicável.
