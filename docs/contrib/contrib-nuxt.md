# Guia de Contribuição – Frontend Nuxt

## Requisitos

- Node.js 18+
- pnpm

## Como Contribuir

- Faça um fork do repositório e clone para sua máquina:
  > ```powershell
  > git clone https://github.com/seu-usuario/CrawJUD.git
  > cd CrawJUD/frontend
  > ```
- Crie uma branch descritiva:
  > ```powershell
  > git checkout -b feat/nome-da-feature
  > ```
- Instale as dependências:
  > ```powershell
  > pnpm install
  > ```
- Configure variáveis de ambiente conforme `.env.example`.

## Testes e Qualidade

- Execute o servidor de desenvolvimento:
  > ```powershell
  > pnpm dev
  > ```
- Rode os testes (se aplicável):
  > ```powershell
  > pnpm test
  > ```
- Siga o padrão de código e utilize comentários claros.

## Boas Práticas

- Use nomes descritivos para variáveis e funções.
- Escreva componentes reutilizáveis.
- Consulte o [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md).
- Abra um Pull Request detalhando suas alterações e relacione issues, se aplicável.
