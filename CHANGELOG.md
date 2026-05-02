# Changelog

## [1.1.0] - 02/05/2026

### Alterado
- A rota `GET /users` passou a utilizar filtros específicos por query params:
  - `name`
  - `email`

### Removido
- Parâmetro genérico `search`

### Corrigido
- Lógica de busca ajustada para ignorar filtros vazios

---

## [1.0.0] - 01/05/2026

### Adicionado
- Primeira release estável do projeto
- CRUD de usuários com persistência em JSON
- Estudos com Streams nativas do Node.js
- Documentação inicial do projeto