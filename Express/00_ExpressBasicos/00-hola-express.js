import express from "express";

const app = express(),
    hostname = "localhost",
    port = 3000;

app.get("/", (req, res) => {
    res.end("<h1>Hola Mundo desde Express.js</h1>");
    console.log(req);
    console.log(res);
});

app.listen(port, () => {
   console.log(`\n\tIniciando Express desde http://${hostname}:${port}\n`);
});

