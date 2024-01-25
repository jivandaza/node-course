import express from "express";
import { resolve } from "path";

const app = express(),
    hostname = "localhost",
    port = 3000;

app.get("/", (req, res) => {
    res.set({ "content-type": "text/html; charset=utf-8" });
    // se utiliza para enviar varias respuesta HTTP
    res.send("<h1>Hola Mundo desde Express.js desde el método send</h1>");
    // se utiliza para finalizar la respuesta HTTP
    //res.end("<h1>Hola Mundo desde Express.js desde el método end</h1>");
});

// Enviando una respuesta de tipo json
app.get("/json", (req, res) => {
    res.json({
       id: 1065,
       name: "jivandaza",
       age: 27,
       youtube: "@jivandaza"
    });
});

// Enviando una respuesta de tipo file
app.get("/archivo", (req, res) => {
    res.sendFile(resolve("index.html"));
});

app.get("/plantilla", (req, res) => {
    // No funciona esta ruta porque hay que especificar el motor de plantillas a express.js
    res.render("plantilla");
});

app.get("/jonmircha", (req, res) => {
    //res.send("<h1>Bienvenidos a jonmircha.com</h1>");
    res.redirect(301, "https://jonmircha.com");
});

app.listen(port, () => {
    console.log(`\n\tIniciando Express desde http://${hostname}:${port}\n`);
});