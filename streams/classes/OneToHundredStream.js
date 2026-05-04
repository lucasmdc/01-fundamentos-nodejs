import { Readable } from 'node:stream'

export class OneToHundredStream extends Readable {
    index = 1
    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {    
                /*
                    buffer: 
                        - Representa uma área de memória utilizada para armazenar dados binários (bytes).
                */

                const buf = Buffer.from(String(i))
    
                this.push(buf)
            }
        }, 1000)
    }
}