// importa todos el modulo de file system
//const fs = require( "fs" );

/*const data = fs.readFile( "data.txt", "utf-8", ( err, data ) => {
    if ( err ) throw err;
    console.log( data );
});*/

// importa solo la funcion readFile del modulo file system
import { readFile } from "fs";

console.log( "\nInicio del programa\n" );

readFile( "data.txt", "utf-8", ( err, data ) => {
    if ( err ) throw err;
    console.log( data );
});

console.log( "\nFin del programa\n" );