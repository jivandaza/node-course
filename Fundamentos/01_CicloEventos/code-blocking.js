const fs = require( "fs" );

console.log( "\nInicio del programa\n" );

const data = fs.readFileSync( "data.txt", "utf-8" );

console.log( data );

console.log( "\nFin del programa\n" );