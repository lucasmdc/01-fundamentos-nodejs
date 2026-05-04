# Changelog

## [1.2.0] - 04/05/2026

### Alterado
- Reestruturação da pasta `/streams`, organizando as implementações em `/streams/classes`
- Refinamento completo do `README.md`, com melhorias de clareza, organização e detalhamento técnico
- Ajuste na documentação das rotas e separação entre API principal e endpoints de stream

### Adicionado
- Comando `dev:stream` para execução isolada do servidor de streams
- Novo endpoint `/all-stream-stages`, demonstrando o uso de `Readable`, `Transform` e `Writable` com `pipeline`
- Novo endpoint `/during-receive-chunk`, demonstrando o envio progressivo de dados
- Novo endpoint `/after-received-all-chunks`, demonstrando o envio completo de dados
- Implementações customizadas de streams (`Readable`, `Writable` e `Transform`) para fins didáticos

### Removido
- Códigos duplicados e exemplos redundantes relacionados a streams

### Corrigido
- Ajustes e padronização de comentários explicativos nos arquivos-fonte
- Correções de nomenclatura, organização e consistência na documentação

---

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