import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform(chunck, encoding, callback) {
        const transformed = Number(chunck.toString()) * -1
        /* 
            callback => primeiro parâmetro dispara erro caso
                algo inesperado aconteça com o chunk que será transformado.
                Caso esse parametro receber null, significa que está tudo certo
        */
        // segundo parâmetro retorna o chunk transformado
        callback(null, Buffer.from(String(transformed)))
    }
}

function duringReceiveChunk (req, res) {
    /* 
        Dessa forma, conforme os pedaços de dados (chuncks) forem chegando
        eles serão processados e passados para frente
        sem a necessidade de esperar que os dado 
        chegue por completo para depois o encaminha-lo para quem o solicitou.

        Essa estratétigia é interessante para cenários em que
        o dado é do tipo áudio, vídeo ou até mesmo em formato de texto
    */
    return req
        .pipe(new InverseNumberStream())
        .pipe(res)
}

async function afterReceivedAllChunks (req, res) {
    /*
        Dessa forma, conforme os pedaços de dados (chuncks) forem chegando
        eles serão processados e não seram passados para frente.
        
        Aqui existe a necessidade de esperar que os dado chegue
        por completo para depois o encaminha-lo para quem o solicitou.

        Essa estratétigia é interessante para cenários em que
        o dado é do formato JSON, pois, se eu mandá-lo em partes,
        eu não consiguirei fazer nada com ele.
    */
    const buffers = []

    for await (const chunck of req) {
        buffers.push(chunck)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()

    return res.end(fullStreamContent)
}

const server = http.createServer(afterReceivedAllChunks)
server.listen(3334)