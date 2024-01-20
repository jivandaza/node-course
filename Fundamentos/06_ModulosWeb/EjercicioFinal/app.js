import chalk from "chalk";
import { createServer } from "http";
import http from "http";
import https from "https";
import {existsSync, writeFileSync} from "fs";

let htmlCode = "",
    options = {
        host: null,
        port: null,
        path: null,
        method: 'GET'
    };

const hostname = "localhost",
    port = 3000,
    DB_FILE = "index.html";

function loadTasksOfFile() {
    if (!existsSync(DB_FILE)) {
        try {
            writeFileSync(DB_FILE, '', "utf-8");
        } catch (error) {
            displayMessageError("Error al crear el archivo: " + error.message);
            displayMessageWarning("La base de datos no esta disponible");
        }
    } else {
        writeFileSync(DB_FILE, '', "utf-8");
        writeFileSync(DB_FILE, htmlCode, "utf-8");
    }
}

function displayMessageError(message) {
    console.log(chalk.bgRedBright.white.bold("\n\t "+message+" "));
}

function displayMessageWarning(message) {
    console.log(chalk.bgYellowBright.white.bold("\n\t "+message+" \n"));
}

function displayConsoleText(text) {
    console.log(chalk.cyan.bold("\n\t"+text));
}

function verifyHostName(host) {
    const pattern = /^[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+$/;
    return pattern.test(host);
}

function verifyPort(port) {
    const number = Number(port);
    return !isNaN(number) && (number === 80 || number === 443);
}

function correctPath(path) {
    if (!path) {
        return "/";
    } else if (path[0] === "/") {
        return path;
    } else {
        return "/" + path;
    }
}

function makeHTTPRequest(options) {
    const req = http.request(options, (res) => {
        ShowRequestInformation(res, "http");
    });

    req.on('error', (err) => {
        ShowRequestErrorInformation(err);
    });

    req.end();
}

function makeHTTPSRequest(options) {
    const req = https.request(options, (res) => {
        ShowRequestInformation(res, "https");
    });

    req.on('error', (err) => {
        ShowRequestErrorInformation(err);
    });

    req.end();
}

function ShowRequestInformation(res, protocol) {
    displayConsoleText(`El sitio ${protocol}://www.${options.host}${options.path} ha respondido.`);
    displayConsoleText(`Código: ${res.statusCode}`);
    displayConsoleText(`Mensaje: ${res.statusMessage}\n`);
    res.on("data", (data) => {
        htmlCode += data;
        loadTasksOfFile();
        //console.log(data, data.toString());
    });
}

function ShowRequestErrorInformation(err) {
    displayMessageError(`El sitio ${options.host}${options.path} NO ha respondido.`);
    displayMessageError(`Código: ${err.code}`);
    displayMessageError(`Mensaje: ${err.message}`);
    console.log("");
    process.exit(1);
}

const webServer = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(htmlCode);
};

function initApp() {
    loadTasksOfFile();
    if (!process.argv[2] || !process.argv[3]) {
        displayMessageError("Por favor, proporcione un nombre de pagina y un número de puerto");
        displayMessageWarning("Ejecute el siguiente comando: node app.js [host] [port] [path]");
    } else {
        if (!verifyHostName(process.argv[2]) || !verifyPort(process.argv[3])) {
            displayMessageError("Por favor, proporcione un nombre de pagina o número de puerto correctamente");
            displayMessageWarning("Ejecute el siguiente comando: node app.js [host] [port] [path]");
        } else {
            options = {
                host: process.argv[2].toLowerCase(),
                port: Number(process.argv[3]),
                path: correctPath(process.argv[4])
            }

            if (options.port === 80) {
                makeHTTPRequest(options);
            } else if (options.port === 443) {
                makeHTTPSRequest(options);
            }

            createServer(webServer).listen(port, hostname, () => {
                displayConsoleText(`Servidor corriendo en http://${hostname}:${port}/`)
            });
        }
    }
}

initApp();