## Introdução

Esse projeto foi construído a partir de um dos módulos presentes dentro __trilha de Node.js__, do programa __Ignite__, da plataforma de ensino __Rocketseat__.

## Objetivo

O propósito desse projeto foi criar uma __aplicação Back-end__, _sem usar quaisquer outras __libs__ ou __dependências externas___, exceto, é claro, o próprio __Node.js__, que simule um cenário real em que, o __Front-end__, faria _chamadas as __APIs___ e receberia, de volta, alguma _resposta_, dependendo da __solicitação__ que ele realizou. 

As informações obtidas serão providas a partir de um arquivo, em formato _JSON_, que ficará no lado do Back-end, simulando um __Banco de Dados__.

Dependendo da __solicitação__ que for ser realizada pelo __Front-end__, o __Back-end__ poderá fazer tanto __buscas__ quanto __alterações__ neste __Banco de Dados__.

## Tecnologias

- `node@18.12.1`
- `npm@8.19.2`

## Comandos

```bash
$ npm run dev
```

## Observações

O comando `npm run dev` só funcionará na versão do Node.js, especificada na seção ___Tecnologias___, pois a flag `--watch` foi uma ___adição__ recente a linguagem, __eliminando__ a necessidade em se instalar __libs externas___ (__nodemon__, por exemplo), para __assistir__ as __mudanças__ feitas nos arquivos editados e __reiniciar__ a __aplicação Back-end__ de forma __automática__. 

Ainda sobre a necessidade de se utilizar a versão especifica do Node.js, citado no parágrafo acima, este projeto tem uma pasta, nomeada `streams`. _Ela não impacta na execução desta __aplicação Back-end___ mas se, por algum caso, for executado o arquivo `fake-upload-to-http-stream.js`,
com o servidor rodando a partir do arquivo `stream-http-server.js`, sem a versão do Node.js correta, a funcionalidade `fetch`, que realizará uma requisição HTTP para o servidor em questão, _não irá funcionar_. A seguir, segue um _snippet de código_ que faz a mesma coisa que a funcionalidade `fetch` realizará, porém com uma maior compatibilidade para versões anteriores do Node.js, comparada com a que é requirida para este projeto:

```Javascript
import http from 'node:http'

http.get({
    method: 'POST',
    origin: 'localhost',
    port: 3334
}, (res) => {
    let data = ''
    
    res.on("data", chunck => data += chunck)

    res.on("end", () => JSON.stringify(data))
})
```

No que diz respeito ao tipo de __importação/exportação__ de __módulos__ utilizados neste projeto, foi escolhido o `ESModule` ou invés do `CommonJS`. Essa configuração se encontra presente no arquivo `package.json` (`"type": "module"`).

Por conta desta escolha, as variáveis globais do Node.js `__dirname` e `__filename` __NÃO FUNCIONAM__ quando, o tipo (`"type"`) de __módulo__ utilizado para __importação/exportação__, for o `"module"` do _ESModule_. Com isso, a forma de saber o __path__, por exemplo, nesta situação, será a partir do uso do `import.meta.url`.

Algumas outras informações utéis, poderão ser encontradas, dentro de cada arquivo, em forma de comentário, para ajudar na compreensão de algumas particulariedas existentes dentro do Node.js.

## API

| Verbo  | API                              | Descrição                                                                                     |
|--------|----------------------------------|-----------------------------------------------------------------------------------------------|
| GET    | `http://localhost:3333/users`  | Busca por todas os usuários cadastrados. Também é possível passar o _queryParams_ `search` para realizar uma busca filtrada.
| POST   | `http://localhost:3333/users`  | Cria um novo usuário.                    |
| PUT   | `http://localhost:3333/users/:userId`       | Altera um registro de usuário, a partir do seu userId.
| DELETE | `http://localhost:3333/users/:userId` | Deleta um usuário a partir do seu userId                                         |

## Fluxograma

A figura abaixo mostra, de uma forma mais visual, como que funciona uma __requisição__ e como se é obtida a sua __resposta__:

<img style="padding: 1rem 0;" src="https://raw.githubusercontent.com/lucasmdc/01-fundamentos-nodejs/main/assets/fluxograma-request-response.png" alt="Fluxograma que representa como que uma requisição é feita e como ela é retornada a quem a solicitou, utilizando um cenário cliente (navegador)/servidor" />

Nesse cenário, o exemplo explorado foi um clássico modelo __cliente/servidor__ mas, essa figura acima, pode ser utilizada também para entendermos o que acontece internamente dentro desse projeto, quando nós fazemos as __chamadas__ as __APIs__ para obtermos uma determinada __resposta__ delas. 







