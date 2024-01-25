const calculate = require("./calculadora.js");

console.log(`
    La suma de 2 + 4 es: ${calculate.sumar( 2, 4 )}
`);

console.log(`
    La resta de 5 - 2 es: ${calculate.restar( 5, 2 )}
`);

console.log(`
    La multiplicacion de 3 * 4 es: ${calculate.multiplicar( 3, 4 )}
`);

console.log(`
    La division de 9 / 3 es: ${calculate.dividir( 9, 3 )}
`);

console.log(`
    La residuo de 12 % 3 es: ${calculate.modulo( 12, 3 )}
`);

