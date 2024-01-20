import { createServer } from "http";
import { get } from "https";

const hostname = "localhost",
    port = 3000,
    options = {
        host: "jonmircha.com",
        port: 443,
        path: "/",
    };

let htmlCode = "";

const httpClient = (res) => {
    console.log(
        `\n\tEl sitio ${options.host} ha respondido.
        \n\tCódigo: ${res.statusCode}
        \n\tMensaje: ${res.statusMessage}\n`
    );

    res.on("data", (data) => {
        htmlCode += data;
        //console.log(data, data.toString());
    });
};

const httpError = (err) => {
    console.error(
        `\n\tEl sitio ${options.host} NO ha respondido.
        \n\tCódigo: ${err.code}
        \n\tMensaje: ${err.message}\n`
    );
};

const webServer = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(htmlCode);
};

//  instancia cliente HTTP o HTTPs
get(options, httpClient).on("error", httpError);

//  instancia servidor local HTTP
createServer(webServer).listen(port, hostname, () => {
    console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});