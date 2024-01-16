const calculadora = require("./calculadora.js");

console.log(`
    La suma de 2 + 4 es: ${calculadora.sumar( 2, 4 )}
`);

console.log(`
    La resta de 5 - 2 es: ${calculadora.restar( 5, 2 )}
`);

console.log(`
    La multiplicacion de 3 * 4 es: ${calculadora.multiplicar( 3, 4 )}
`);

console.log(`
    La division de 9 / 3 es: ${calculadora.dividir( 9, 3 )}
`);

console.log(`
    La residuo de 12 % 3 es: ${calculadora.modulo( 12, 3 )}
`);

