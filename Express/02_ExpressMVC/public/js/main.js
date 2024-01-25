/*
import data from "./../../models/data.js"

const $btnCompleted = document.querySelectorAll(".completed-button");


$btnCompleted.forEach(($btn) => {
    $btn.addEventListener("click", (e) => {
        e.preventDefault();
        let href = $btn.getAttribute("href");
        let id = extractTaskIdFromHref(href);
        console.log(id);
        if (id === null || isNaN(id)) {
            alert("El id de la tarea no es valido");
        } else if (!existTask(id)) {
            alert(`El id ${id} no existe en la BD`);
        }
    });
})


const existTask = (id) => {
    let task = data.tasks.find((task) => task.id === id);

    return !!task;
}

function extractTaskIdFromHref(href) {
    const match = href.match(/\/completed\/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
}
 */

/*
const validateCompleted = (url) => {
    let urlCompleted = `http://localhost:3000${url}`;
    location.href = "http://localhost:3000";
    console.log(url, urlCompleted);
    fetch(`${url}`, {
        method: 'GET',
        mode: 'cors'
    })
        .then(response => {
            if (response.ok) {
                console.log("La tarea se ha completado con éxito");
            } else {
                if (response.status === 404) {
                    alert("Tarea no encontrada");
                } else {
                    alert(`Error al completar la tarea. Código de estado: ${response.status}`);
                }
            }
        })
        .catch(error => {
            if (error.code === 'net::ERR_SSL_PROTOCOL_ERROR') {
                console.error("Error de protocolo SSL:", error);
            }
            console.error("Error al completar la tarea:", error)}
        );
};
*/

console.log("Hola mundo desde Express.js");