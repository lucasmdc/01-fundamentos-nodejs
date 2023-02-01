// CommonJS => require import/export (funciona se em, package.json, o atributo type for igual a "commonjs" que é o padrão) 
// namespace para separar os módulos internos do node com aqueles que são instalados na aplicação
//const http = require('node:http')

// ESModule => import/export (funciona se em, package.json, o atributo type for igual a "module")
import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

// Aplicações HTTP => API

// HTTP
// - Método HTTP
// - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Busca recurso
// POST => Cria recurso
// PUT => Atualiza recurso quase ou totalmente por completo no back-end
// PATCH => Atualiza uma informação especifica de um recurso no back-end
// DELETE => Deleta

// GET /users => Buscando usuários do back-end
// POST /users => Criar um usuários no back-end

// Stateful - Stateless

// Stateful - 
// - informações salvas em memória.
// - se a aplicação cair e/ou for desligada, o seu funcionamento não voltará como estava antes. 

// Stateless - informações salvas em BD, Arquivos em HD
// - informações salvas em BD, Arquivos em HD...
// - se a aplicação cair e/ou for desligada, o seu funcionamento voltará como estava antes. 

// JSON - JavaScript Object Notation

// Cabeçalhos (Requisições/Resposta) => Metadados
// Informações para que, tanto o backend, quanto o frontend saibam lidar
// com aquele dado

// HTTP Status code
// Resultado da comunicação entre front-end/back-end

//req => entrada
//res => saída
//entrada + saída => stream para APIs

// Três forma de enviar informações para a API
// Query Params :
//      http://localhost:3333/users?userId=1&name=Lucas 
//      URL Statefull - Não são armazenados fisicamente
//      Dados que não são sensíveis
//      Modificar a resposta obtida a partir de uma requisição feita a API sem alterar fisicamente nenhum dado
//      Filtros, Paginação, Buscas
// Route Param:
//      http://localhost:3333/users/1
//      Identificação do recurso pela própria url
//      Dados que não são sensíveis
// Request Body Params
//      Dados sensíveis (HTTPS)
//      Mais difícies de serem descriptografados e/ou interceptados
//      Envio de formulários

const server = http.createServer(async (req, res) => {
    const { method, url } = req
    
    // interceptors - possuem req e res no momento em que a requisição chega na API e a resposta é devolvido pelo mesmo
    await json(req, res)

    const route = routes.find(route => {
       // return route.method === method && route.path === url
       return route.method === method && route.path.test(url)
    })

    if(route) {
        const routeParams = req.url.match(route.path)

        const { query, ...params } = routeParams.groups
        req.params = params
        req.query = query ? extractQueryParams(query) : {}
        
        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333)