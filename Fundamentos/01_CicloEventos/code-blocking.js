const fs = require( "fs" );

console.log( "\nInicio del programa\n" );

// Primero hace esta operacion que es Syncrona (Bloqueante)
const data = fs.readFileSync( "data.txt", "utf-8" );

// Para despues hacer esta operación (No Bloqueante)
console.log( data );

console.log( "\nFin del programa\n" );