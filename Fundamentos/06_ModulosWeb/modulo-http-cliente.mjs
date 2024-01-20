/*
import { get } from "http";

const urlSiteHttp = {
    hostname: "jonmircha.com",
    port: 80,
    path: "/cursos"
}

get(urlSiteHttp, (res) => {
    console.log(
        `\n\tEl sitio ${urlSiteHttp.hostname} ha respondido.
        \n\tCódigo: ${res.statusCode}
        \n\tMensaje: ${res.statusMessage}\n`
    );
}).on("error", (err) => {
   console.error(
       `\n\tEl sitio ${urlSiteHttp.hostname} NO ha respondido.
        \n\tCódigo: ${err.code}
        \n\tMensaje: ${err.message}\n`
   );
});
*/

import { get } from "https";

const urlSiteHttps = {
    hostname: "jonmircha.com",
    port: 443,
    path: "/cursos"
}

get(urlSiteHttps, (res) => {
    console.log(
        `\n\tEl sitio ${urlSiteHttps.hostname} ha respondido.
        \n\tCódigo: ${res.statusCode}
        \n\tMensaje: ${res.statusMessage}\n`
    );
}).on("error", (err) => {
    console.error(
        `\n\tEl sitio ${urlSiteHttps.hostname} NO ha respondido.
        \n\tCódigo: ${err.code}
        \n\tMensaje: ${err.message}\n`
    );
});