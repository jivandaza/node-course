/*let tasks = [
    { id: 1, title: "Tarea 1", completed: false },
    { id: 2, title: "Tarea 2", completed: true },
];*/

import data from "../models/data.js";

const getAllTasks = (req, res) => {
    let tasks = data.tasks;
    res.render("index", {title: "Lista de Tareas", tasks});
}

const getAddTaskForm = (req, res) => {
    res.render("add", {title: "Agregar Tarea"});
}

const getEditTaskForm = (req, res) => {
    let id = parseInt(req.params.id),
        task =
            data.tasks.find((task)=> task.id === id);
    if (!task) {
        res.render("error", {title: "Error 404 Not Found", message: `El id ${id} para editar la tarea no existe en la BD`});
    } else {
        res.render("edit", {title: "Editar Tarea", task});
    }
}

const addTask = (req, res) => {
    let { title } = req.body,
        id = data.tasks.length + 1;
        title = capitalizeFirstLetter(title);
    data.tasks.push({id, title, completed: false});
    res.redirect("/");
}

const editTask = (req, res) => {
    let id = parseInt(req.params.id);
    let taskIndex = data.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        res.render("error", {title: "Error 404 Not Found", message: `El id ${id} para editar la tarea no existe en la BD`});
    } else {
        data.tasks[taskIndex].title = req.body.title;
        res.redirect("/");
    }
}

const completedTask = (req, res) => {
    let id = parseInt(req.params.id);
    let task = data.tasks.find((task) => task.id === id);

    if (task) {
        task.completed = true;
        res.redirect("/");
    } else {
        res.render("error", {title: "Error 404 Not Found", message: `El id ${id} para completar la tarea no existe en la BD`});
    }
}

const uncompletedTask = (req, res) => {
    let id = parseInt(req.params.id);
    let task = data.tasks.find((task) => task.id === id);

    if (task) {
        task.completed = false;
        res.redirect("/");
    } else {
        res.render("error", {title: "Error 404 Not Found", message: `El id ${id} para desmarcar la tarea no existe en la BD`});
    }
}

const removeTask = (req, res) => {
    let id = parseInt(req.params.id);
    let taskIndex = data.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        res.render("error", {title: "Error 404 Not Found", message: `El id ${id} para eliminar la tarea no existe en la BD`});
    } else {
        data.tasks = data.tasks.filter((task) => task.id !== id);
        res.redirect("/");
    }
}

export default {
    getAllTasks,
    getAddTaskForm,
    getEditTaskForm,
    addTask,
    editTask,
    completedTask,
    uncompletedTask,
    removeTask
}

function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}