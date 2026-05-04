import http from 'node:http'
import { pipeline } from 'node:stream/promises'

// Streams podem ser:
// - Readable (leitura)
// - Writable (escrita)
// - Duplex (leitura e escrita)
// - Transform (duplex que transforma os dados)
import { InverseNumberStream } from './classes/InverseNumberStream.js'
import { OneToHundredStream } from './classes/OneToHundredStream.js'
import { MultiplyByTenStream } from './classes/MultiplyByTenStream.js' 

const routes = [
    {   
        method: 'POST',
        path: '/during-receive-chunk',
        handler: duringReceiveChunk
    },
    {
        method: 'POST',
        path: '/after-received-all-chunks',
        handler: afterReceivedAllChunks
    },
    {
        method: 'POST',
        path: '/all-stream-stages',
        handler: allStreamStages
    },
]

function duringReceiveChunk (req, res) {
    /*
        Nesta abordagem, os chunks recebidos pela requisição
        podem ser processados e encaminhados continuamente,
        sem a necessidade de aguardar que todo o conteúdo
        seja recebido para então responder.

        Essa estratégia é útil para cenários em que o envio
        progressivo traz vantagens, como streaming de áudio,
        vídeo, arquivos grandes ou texto em tempo real.
    */

    pipeline(
        req,
        new InverseNumberStream(),
        res,
    ).catch(() => {
        res.writeHead(500)
        res.end('Erro no processamento\n')
    })
}

async function afterReceivedAllChunks (req, res) {
    /*
        Nesta abordagem, os chunks recebidos são armazenados
        temporariamente em memória até que todo o conteúdo
        da requisição seja recebido.

        Após isso, os buffers são concatenados para formar
        o payload completo.

        Essa estratégia é útil quando é necessário trabalhar
        com a mensagem inteira antes do processamento,
        como em muitos casos de JSON tradicional,
        onde normalmente usamos JSON.parse() no conteúdo completo.
    */

    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers)

    // Adiciona quebra de linha para melhor visualização no terminal (ex: curl).
    return res.end(fullStreamContent.toString() + '\n') 
}

async function allStreamStages(req, res) {
   try {
        await pipeline(
            new OneToHundredStream(),
            new InverseNumberStream(),
            new MultiplyByTenStream(res)
        )
    } catch (err) {
        res.writeHead(500)
        res.end('Erro no processamento\n')
    }
}

const server = http.createServer((req, res) => {
    const matchRoute = routes.find(({ method, path }) => {
        return req.url === path && req.method === method
    })

    if (matchRoute) {
        return matchRoute.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3334)