// Netflix & Spotify

// Importação de clientes via CSV (Excel)
// 1gb - 1.000.000
// POST /upload import.csv

// 10mb/s - 100s

// 100s -> Inserções no banco de dados

// 10mb/s -> 10.000 

// Ler os dados aos poucos e o processando enquanto algo(arquivo, json...) ainda não foi baixado por completo

// Readable Streams / Writable Streams

// process.stdin // entrada - Readable Streams (leitura)
// .pipe(process.stdout) // saida - Writable Streams (processamento)

// Tem a Duplex Strem que seria a junção de Readble com Writable Streams
import { Readable, Transform, Writable } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1
    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
    
                this.push(buf)
            }
        }, 1000)
    }
}

class InverseNumberStream extends Transform {
    _transform(chunck, encoding, callback) {
        const transformed = Number(chunck.toString()) * -1
        /* 
            callback => primeiro parâmetro dispara erro caso algo inesperado 
                aconteça com o chunk que será transformado.
                Caso esse parametro receber null, significa que está tudo certo
                segundo parâmetro retorna o chunk transformado
        */
        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable {
    // chunck => pedaços do dado que chegam no Writable Stream
    // encoding => tipo de codifição
    // callback => função que será chamada após a finalização do processamento
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

// new OneToHundredStream().pipe(process.stdout)
// new OneToHundredStream().pipe(new MultiplyByTenStream())
new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())