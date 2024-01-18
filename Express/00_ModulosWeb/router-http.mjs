import { createServer } from "http";

//   request = req   ->   response = res
const server = createServer((req, res) => {
    let statusValue = 200;
    let printText;
    switch (req.url) {
        case "/":
            printText = "Home | 🏠";
            break;
        case "/hola":
            printText = "Hola | 🖖";
            break;
        case "/contacto":
            printText = "Contacto | 📲";
            break;
        case "/sobreNosotros":
            printText = "Sobre Nosotros | 📖";
            break;
        default:
            statusValue = 404;
            printText = "Not Found | ❌";
    }
    res.writeHead(statusValue, { "Content-Type" : "text/html; charset=utf-8" });
    res.end(`<h1>${printText}</h1>`);
});

server.listen(3000, "127.0.0.1", () => {
    console.log("Servidor web en ejecución en http://127.0.0.1:3000");
});