# Fundamentos do Node.js

![Status](https://img.shields.io/badge/status-completed-success) 
![Type](https://img.shields.io/badge/portfolio-reference-blue) 
![License](https://img.shields.io/badge/license-MIT-lightgrey) 

> 🚀 **Status:** Projeto concluído.  
> 📚 Desenvolvido para fins educacionais e mantido como referência técnica e portfólio.

## 📌 Sobre o projeto

O **Fundamentos do Node.js** é um projeto desenvolvido a partir de um dos módulos da trilha de **Node.js** do programa **Ignite**, da plataforma de ensino **Rocketseat**.

## 🎯 Objetivo

O objetivo deste projeto foi desenvolver uma aplicação backend utilizando exclusivamente recursos nativos do **Node.js**, sem frameworks ou dependências externas.

A proposta simula um cenário real, em que uma aplicação frontend realiza requisições HTTP para uma API e recebe respostas conforme cada operação solicitada.

Para fins didáticos, os dados são persistidos em um arquivo no formato `JSON`, representando um mecanismo simples de persistência, sem uso de banco de dados.

Com isso, a aplicação permite executar operações de consulta e alteração de registros, simulando comportamentos comuns de um backend real.

## ⚙️ Pré-requisitos

Para executar o projeto, recomenda-se ter instalado:

* [`Node.js` **18.12.1**](https://nodejs.org/download/release/v18.12.1/)
* `npm` **8.19.2**
* [`nvm`](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) *(recomendado)*

> O `npm` acompanha a instalação padrão do `Node.js`.

Para verificar a versão instalada do `npm`:

```sh
npm -v
```

### ⌨️ Usando `nvm`

Instale a versão utilizada neste projeto:

```sh
nvm install 18.12.1
```

Em seguida, dentro do projeto, execute:

```sh
nvm use
```

> O comando `nvm use` utilizará a versão definida no arquivo `.nvmrc` presente no diretório atual.

## ▶️ Como executar

### 🔹 Aplicação

```bash
$ npm run dev
```

### 🔹 Stream

```bash
$ npm run dev:stream
```

## 📝 Observações

O comando `npm run dev` depende da versão do Node.js indicada na seção **Pré-requisitos**, pois utiliza a flag `--watch`, adicionada nas versões mais recentes da plataforma.

Esse recurso permite monitorar alterações nos arquivos e reiniciar a aplicação automaticamente, eliminando a necessidade de ferramentas externas como [`nodemon`](https://nodemon.io/).

### 🌊 Pasta `streams`

A pasta `streams` contém experimentos práticos voltados ao entendimento de processamento de dados em fluxo no Node.js, abordando conceitos como [Readable](https://nodejs.org/docs/latest-v18.x/api/stream.html#class-streamreadable), [Writable](https://nodejs.org/docs/latest-v18.x/api/stream.html#class-streamwritable) e [Transform](https://nodejs.org/docs/latest-v18.x/api/stream.html#class-streamtransform) streams.

Essa pasta não impacta a execução principal da aplicação.

### 📦 Sistema de módulos

Este projeto utiliza o padrão `ESModule`, definido no arquivo `package.json`:

```json
{
  "type": "module"
}
```

Por esse motivo, as variáveis globais `__dirname` e `__filename` não estão disponíveis, como ocorre em projetos `CommonJS`.

Nesses casos, caminhos e arquivos podem ser obtidos por meio de `import.meta.url`.

### 💡 Comentários no código

Informações complementares também podem ser encontradas diretamente nos arquivos-fonte, por meio de comentários explicativos sobre particularidades do Node.js e da implementação proposta.

## 🔌 API

### 🔹 Aplicação

URL Base: http://localhost:3333

| Método   | Rota                                  | Descrição                                                                               |
| -------- | ------------------------------------- | --------------------------------------------------------------------------------------- |
| `GET`    | `/users`         | Lista todos os usuários cadastrados. Também aceita os parâmetros `name` e `email` para filtragem. |
| `POST`   | `/users`         | Cria um novo usuário.                                                                   |
| `PUT`    | `/users/:userId` | Atualiza os dados de um usuário pelo `userId`.                                          |
| `DELETE` | `/users/:userId` | Remove um usuário pelo `userId`. |

### 🔹 Stream

URL Base: http://localhost:3334

| Método   | Rota                                  | Descrição                                                                               |
| -------- | ------------------------------------- | --------------------------------------------------------------------------------------- |
| `POST`    | `/during-receive-chunk`         | Simula o cenário do envio progressivo de dados  |
| `POST`   | `/after-received-all-chunks`         | Simula o cenário do envio completo de dados.                                                                   |
| `POST`    | `/all-stream-stages` | Simula o cenário completo de dados com uso das `streams` (Readable, Transform e Writable)                                     |
 

## 🗺️ Fluxograma

A imagem abaixo representa, de forma visual, o fluxo de uma requisição HTTP e o retorno da respectiva resposta em um modelo cliente-servidor.

<img style="padding: 1rem 0;" src="https://raw.githubusercontent.com/lucasmdc/01-fundamentos-nodejs/main/assets/fluxograma-request-response.png" alt="Fluxograma do fluxo de requisição e resposta HTTP entre cliente e servidor" />

O exemplo utiliza o cenário clássico entre cliente e servidor, demonstrando etapas como conexão TCP/IP, envio de dados, processamento da aplicação e retorno da resposta.

Além do contexto teórico, o diagrama também ajuda a compreender o comportamento interno deste projeto ao realizar chamadas para as APIs implementadas em Node.js.

Para complementar a compreensão do fluxograma apresentado acima, publiquei um artigo explicando, de forma didática, os fundamentos da arquitetura TCP/IP aplicados ao modelo cliente-servidor em requisições HTTP:
[O que é a arquitetura TCP/IP no modelo cliente-servidor para requisições HTTP](https://medium.com/@lucasmdclimao/o-que-%C3%A9-a-arquitetura-tcp-ip-no-modelo-cliente-servidor-para-requisi%C3%A7%C3%B5es-http-917070dcbc8d).

## 🧠 Principais aprendizados

- Manipulação de streams (Readable, Writable e Transform)
- Processamento de dados em fluxo (streaming vs buffering)
- Uso de `pipeline` para controle de fluxo e tratamento de erros
- Criação de servidor HTTP sem frameworks
- Estruturação de rotas e persistência em arquivo JSON









