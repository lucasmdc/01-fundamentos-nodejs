// import fs from 'node:fs' // assincronismo com callback functions
import fs from 'node:fs/promises' // assincronismo com Promises

const databasePath = new URL('../db.json', import.meta.url) // o primeiro parametro serve como um comando 'cd'

export class Database {
    // '#' sintaxe node para dizer que uma determinado atributo/método da classe é privado
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8').then(data => {
            this.#database = JSON.parse(data)
        }).catch(() => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table, search) {
        // Nullish coalescing operator (??)
        let data = this.#database[table] ?? []
        
        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].includes(value)
                })
            })
        }

        return data
    }

    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()
        return data
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        
        if(rowIndex > -1){
            this.#database[table][rowIndex] = {id, ...data}
            this.#persist()
        }   
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        
        if(rowIndex > -1){
            this.#database[table].splice(rowIndex,1)
            this.#persist()
        }   
    }
}