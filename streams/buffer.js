/*
    Representação do espaço em memória do computador
    usados especificamente para armazenar/ler chunks 
    e, depois, esvasia-las após serem transportados,
    repetindo esse ciclo até que todo o dado seja enviado 
    ao seu destino.
*/

const buff = Buffer.from("hello")
// console.log(buff) // formato binário - hexadecimal
// console.log(buff.toJSON())