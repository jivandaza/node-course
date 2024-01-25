import express from "express";
import { resolve } from "path"

const app = express(),
    hostname = "localhost",
    port = 3000;

app.get("/", (req, res) => {
    console.log(resolve("index.html"));
    res.sendFile(resolve("index.html"));
});

app.listen(port, () => {
    console.log(`\n\tIniciando Express desde http://${hostname}:${port}\n`);
});