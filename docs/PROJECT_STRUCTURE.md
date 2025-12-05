# Estrutura do Projeto

## Raiz (`./`)

- `README.md`, `LICENSE`, `package.json`, `pyproject.toml`, `requirements.txt`, `compose.yml`, etc.
- Configurações: `.env`, `.gitignore`, `.pre-commit-config.yaml`, `ruff.toml`, `tsconfig.json`, etc.

## Diretórios Principais

- [`api/`](./api/): Backend Python (API)
  - `base/`, `config/`, `constants/`, `decorators/`, `extensions/`, `interfaces/`, `models/`, `resources/`, `routes/`, `static/`, `types_app/`, `_forms/`
  - Arquivos principais: `__init__.py`, `__main__.py`
  - Exemplos de subpastas:
    - `base/_sqlalchemy/`: Modelos e queries SQLAlchemy
    - `models/`: Modelos de dados (ex: `_bot.py`, `_jwt.py`, `_users.py`)
    - `routes/`: Rotas da API (ex: `auth/`, `bots.py`, `handlers/`)
    - `_forms/`: Formulários e validações

- [`task_manager/`](./task_manager/): Gerenciador de tarefas Python
  - `base/`, `bots/`, `common/`, `config/`, `constants/`, `controllers/`, `decorators/`, `extensions/`, `interfaces/`, `models/`, `proto/`, `resources/`, `tasks/`, `types_app/`
  - Arquivos principais: `__init__.py`, `__main__.py`, `_hook.py`

- [`app/`](./app/): Frontend Nuxt 3 (Vue)
  - `assets/`, `components/`, `dist-electron/`, `electron/`, `layouts/`, `middleware/`, `pages/`, `plugins/`, `stores/`, `types/`, `utils/`
  - Arquivo principal: `app.vue`

- [`home-ui/`](./home-ui/): Frontend React (provavelmente painel administrativo)
  - `src/` (com `components/`, `pages/`, etc.)
  - Configurações: `vite.config.ts`, `tailwind.config.ts`, `tsconfig.json`, etc.

- [`scripts/`](./scripts/): Scripts utilitários Python
  - Exemplos: `copy_nuxt_public.py`, `fix_nuxt_paths.py`

- [`plugins/`](./plugins/): Plugins TypeScript
  - Exemplos: `NuxtFixes.ts`, `ViteForgePlugin.ts`

- [`docs/`](./docs/): Documentação
  - `contrib/`: Guias de contribuição
  - Arquivos: `PROJECT_STRUCTURE.md`, `CODE_OF_CONDUCT.md`, etc.

- [`output/`](./output/): Saída de processamento (subpastas diversas)

- [`img/`](./img/): Imagens do projeto

- [`public/`](./public/): Arquivos públicos (ex: imagens, `robots.txt`)

- [`chrome-extensions/`](./chrome-extensions/): Extensões Chrome utilizadas

- [`makers/`](./makers/): Scripts de build/empacotamento (ex: `SquirrelMaker.ts`, `WixMaker.ts`)

---

> Para detalhes de cada módulo, consulte os READMEs ou documentação específica de cada pasta.
