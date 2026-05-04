import { Writable } from 'node:stream'

export class MultiplyByTenStream extends Writable {
  constructor(res) {
    super()
    this.res = res
  }

  _write(chunk, encoding, callback) {
    const result = Number(chunk.toString()) * 10

    this.res.write(String(result) + '\n')
    callback()
  }

  _final(callback) {
    this.res.end()
    callback()
  }
}