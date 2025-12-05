"""Corrija caminhos de arquivos estáticos do Nuxt em arquivos públicos.

Este script percorre arquivos HTML, CSS e JS na pasta .output/public,
substituindo referências absolutas a /_nuxt por caminhos relativos ./_nuxt.
"""

import sys
from contextlib import suppress
from pathlib import Path

WORKDIR = Path.cwd()

if "scripts" in str(WORKDIR):
    print(f"\n\n\n{WORKDIR}\n\n\n")  # noqa: T201
    WORKDIR = WORKDIR.parent

work_dir = WORKDIR.joinpath(".build")
old = "/assets"
new = "./assets"

old2 = 'baseURL:"/"'
new2 = 'baseURL:"./"'

# extensões que você quer processar (ou deixe vazio para pegar tudo)
extensions = {".html", ".css", ".js"}

for root, _, filenames in work_dir.walk():
    for filename in filenames:
        # pula arquivos binários (imagens, etc.)
        if extensions and not any(filename.endswith(ext) for ext in extensions):
            continue

        filepath = root.joinpath(filename)
        with suppress(UnicodeDecodeError):
            content = Path(filepath).read_text(encoding="utf-8")

            if old in content:
                content = content.replace(old, new)

                with suppress(Exception):
                    content = content.replace(old2, new2)
                    sys.stdout.write(content)

                Path(filepath).write_text(content, encoding="utf-8")
                print(f"Corrigido: {filepath}")  # noqa: T201
                with suppress(Exception):
                    sys.stdout.write(f"Corrigido: {filepath}")


print("Substituição concluída!")  # noqa: T201
