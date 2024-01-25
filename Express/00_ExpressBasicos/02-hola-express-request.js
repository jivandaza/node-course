import express from "express";

const app = express(),
    hostname = "localhost",
    port = 3000;

app.get("/", (req, res) => {
    res.end("<h1>Hola Mundo desde Express.js</h1>");
});

app.get("/user/:id-:name-:age", (req, res) => {
    // http://localhost:3000/user/1065-jivandaza-28
    res.set({ "Content-Type" : "text/html; charset=utf-8" });
    let user = {
        id: req.params.id,
        name: req.params.name,
        age: req.params.age
    }
    res.end(`
        <h1>
            ${user.name}, Hola Mundo desde Express.js. Tu Id es ${user.id} y tienes ${user.age} años.
        </h1>
    `);
});

app.get("/search", (req, res) => {
    // http://localhost:3000/search?id=1082&name=jivandaza&age=27
    res.set({ "Content-Type" : "text/html; charset=utf-8" });
    let user = {
        id: req.query.id,
        name: req.query.name,
        age: req.query.age
    }
    res.end(`
        <h1>
            ${user.name}, Hola Mundo desde Express.js. Tu Id es ${user.id} y tienes ${user.age} años.
        </h1>
    `);
});

app.listen(port, () => {
    console.log(`\n\tIniciando Express desde http://${hostname}:${port}\n`);
});