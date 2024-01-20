import { createServer } from "http";

//   request = req   ->   response = res
const server = createServer((req, res) => {
    //res.writeHead(200, { "Content-Type" : "text/plain; charset=utf-8" });
    //res.end("¡Hola Mundo! 😉");
    res.writeHead(200, { "Content-Type" : "text/html; charset=utf-8" });
    res.end("<h1>¡Hola Mundo! 😉</h1>");
});

server.listen(3000, "127.0.0.1", () => {
    console.log("Servidor web en ejecución en http://127.0.0.1:3000");
});