"""Copie arquivos do diretório .build para o destino do renderer Vite.

Garanta que todos os arquivos gerados pelo Nuxt sejam movidos para o diretório
correto do Vite para servir ao frontend.

Uso:
    Execute este script após o build do Nuxt para garantir que os arquivos
    estáticos estejam disponíveis para o Vite servir no frontend.
"""

import shutil
from contextlib import suppress
from pathlib import Path

# Define o diretório de trabalho base
WORKDIR = Path.cwd()

# Ajusta o diretório de trabalho caso esteja dentro de 'scripts'
if "scripts" in str(WORKDIR):
    # Exibe o diretório atual para depuração
    print(f"\n\n\n{WORKDIR}\n\n\n")  # noqa: T201
    WORKDIR = WORKDIR.parent


def copiar_arquivos_nuxt_para_vite() -> None:
    """Copia todos os arquivos do diretório .build para o destino do renderer Vite.

    Garante que a estrutura de diretórios seja mantida e que arquivos existentes
    sejam sobrescritos se necessário.

    Não recebe parâmetros e não retorna valores.
    """
    # Caminho do diretório de saída do Nuxt
    nuxt_files = WORKDIR.joinpath(".build")
    # Caminho do destino do Vite
    target = WORKDIR.joinpath(".vite", "renderer")

    # Cria o diretório de destino, se não existir
    target.mkdir(exist_ok=True, parents=True)

    # Percorra todos os arquivos do diretório .build
    for root, _, files in nuxt_files.walk():
        for file in files:
            try:
                file_move = Path(root).joinpath(file)

                # Calcula o caminho relativo do arquivo em relação ao diretório .build
                rel_path = file_move.relative_to(nuxt_files)

                # Cria o diretório de destino mantendo a estrutura
                dest_path = target.joinpath(rel_path.parent)
                dest_path.mkdir(parents=True, exist_ok=True)

                # Remove o arquivo de destino se já existir
                with suppress(Exception):
                    if dest_path.joinpath(file).exists():
                        dest_path.joinpath(file).unlink(missing_ok=True)

                # Copia o arquivo para o destino mantendo a estrutura
                shutil.copy(str(file_move), str(dest_path.joinpath(file)))

            except Exception as e:
                # Exibe o erro caso ocorra durante a cópia
                print(e)  # noqa:T201


if __name__ == "__main__":
    """
    Execute a função principal para copiar os arquivos do Nuxt para o Vite.
    """
    copiar_arquivos_nuxt_para_vite()
