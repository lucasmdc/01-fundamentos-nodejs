import { Transform } from 'node:stream'

export class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        /*
            Observação:
            Este exemplo assume que cada chunk contém um número completo.
            Em cenários reais, chunks podem chegar fragmentados,
            exigindo tratamento adicional para reconstrução dos dados.
        */
        const transformed = Number(chunk.toString()) * -1
        /*
            callback:
            - O primeiro parâmetro indica erro. Caso seja diferente de null,
            a stream entra em estado de erro.
            - Quando null, indica que o processamento ocorreu com sucesso.

            - O segundo parâmetro representa o dado transformado,
            que será encaminhado para a próxima etapa da stream.
        */

        /*
            buffer: 
            - Representação do espaço em memória do computador
            usados especificamente para armazenar/ler chunks 
            e, depois, esvasia-las após serem transportados,
            repetindo esse ciclo até que todo o dado seja enviado 
            ao seu destino.
            - formato binário > hexadecimal
            
            Adiciona quebra de linha para melhor visualização no terminal (ex: curl).
        */
        callback(null, Buffer.from(String(transformed) + '\n'))
    }
}