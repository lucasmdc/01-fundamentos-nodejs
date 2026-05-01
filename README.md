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

Para fins didáticos, os dados são persistidos em um arquivo no formato `JSON`, representando uma camada simples de armazenamento.

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

```bash
$ npm run dev
```

## 📝 Observações

O comando `npm run dev` depende da versão do Node.js indicada na seção **Pré-requisitos**, pois utiliza a flag `--watch`, adicionada nas versões mais recentes da plataforma.

Esse recurso permite monitorar alterações nos arquivos e reiniciar a aplicação automaticamente, eliminando a necessidade de ferramentas externas como [`nodemon`](https://nodemon.io/).

### 🌊 Pasta `streams`

O projeto contém uma pasta chamada `streams`, utilizada para estudos complementares sobre manipulação de dados em fluxo no Node.js.

Essa pasta não impacta a execução principal da aplicação. Porém, ao executar o arquivo `fake-upload-to-http-stream.js` em conjunto com `stream-http-server.js`, é necessário utilizar uma versão compatível do Node.js, pois o recurso nativo `fetch` pode não estar disponível em versões anteriores.

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

## ♻️ Retrocompatibilidade

### ⌨️ `fetch`

Em versões anteriores do Node.js, o recurso nativo `fetch` pode não estar disponível.

Nesses casos, requisições HTTP podem ser realizadas utilizando o módulo interno `http`:

```js
import http from 'node:http';

const req = http.request({
  method: 'POST',
  host: 'localhost',
  port: 3334
}, (res) => {
  let data = '';

  res.on('data', chunk => data += chunk);

  res.on('end', () => {
    console.log(data);
  });
});

req.end();
```

O exemplo acima é uma releitura simplificada do código presente no arquivo [`fake-upload-to-http-stream.js`](https://github.com/lucasmdc/01-fundamentos-nodejs/blob/main/streams/fake-upload-to-http-stream.js).

## 🔌 API

Rotas disponíveis no servidor local:

| Método   | Rota                                  | Descrição                                                                               |
| -------- | ------------------------------------- | --------------------------------------------------------------------------------------- |
| `GET`    | `http://localhost:3333/users`         | Lista todos os usuários cadastrados. Também aceita o parâmetro `search` para filtragem. |
| `POST`   | `http://localhost:3333/users`         | Cria um novo usuário.                                                                   |
| `PUT`    | `http://localhost:3333/users/:userId` | Atualiza os dados de um usuário pelo `userId`.                                          |
| `DELETE` | `http://localhost:3333/users/:userId` | Remove um usuário pelo `userId`. |                                                 
## 🗺️ Fluxograma

A imagem abaixo representa, de forma visual, o fluxo de uma requisição HTTP e o retorno da respectiva resposta em um modelo cliente-servidor.

<img style="padding: 1rem 0;" src="https://raw.githubusercontent.com/lucasmdc/01-fundamentos-nodejs/main/assets/fluxograma-request-response.png" alt="Fluxograma do fluxo de requisição e resposta HTTP entre cliente e servidor" />

O exemplo utiliza o cenário clássico entre cliente e servidor, demonstrando etapas como conexão TCP/IP, envio de dados, processamento da aplicação e retorno da resposta.

Além do contexto teórico, o diagrama também ajuda a compreender o comportamento interno deste projeto ao realizar chamadas para as APIs implementadas em Node.js.

Para complementar a compreensão do fluxograma apresentado acima, publiquei um artigo explicando, de forma didática, os fundamentos da arquitetura TCP/IP aplicados ao modelo cliente-servidor em requisições HTTP:
[O que é a arquitetura TCP/IP no modelo cliente-servidor para requisições HTTP](https://medium.com/@lucasmdclimao/o-que-%C3%A9-a-arquitetura-tcp-ip-no-modelo-cliente-servidor-para-requisi%C3%A7%C3%B5es-http-917070dcbc8d).









