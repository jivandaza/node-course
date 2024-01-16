const fs = require( "fs" );

console.log( "\nInicio del programa\n" );

const data = fs.readFile( "data.txt", "utf-8", ( err, data ) => {
    if ( err ) throw err;
    console.log( data );
});

console.log( "\nFin del programa\n" );