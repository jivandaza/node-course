/*let tasks = [
    { id: 1, title: "Tarea 1", completed: false },
    { id: 2, title: "Tarea 2", completed: true },
];*/

import data from "../models/data.js";

const getAllTasks = (req, res) => {
    let tasks = data.tasks;
    res.json({ tasks });
}

const getTask = (req, res) => {
    let id = parseInt(req.params.id);
    let taskIndex = data.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        res.status(404).json({ err: true, message: `La tarea con el id: ${id} no se encuentra en la BD` });
    } else {
        res.json({task: data.tasks[taskIndex]});
    }
}

const addTask = (req, res) => {
    let { title } = req.body;

    if (!title) {
        res.status(404).json({ err: true, message: "El titulo de la tarea no se ingreso" });
    } else {
        let id = data.tasks.length + 1;
            title = capitalizeFirstLetter(title);

        data.tasks.push({id, title, completed: false});
        res.json({err: false, message: `La tarea con el id:${id} fue agregada`});
    }
}

const editTask = (req, res) => {
    let id = parseInt(req.params.id);
    let taskIndex = data.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        res.status(404).json({ err: true, message: `La tarea con el id: ${id} no se encuentra en la BD` });
    } else {
        let { title } = req.body;

        if (!title) {
            res.status(404).json({ err: true, message: "El titulo de la tarea no se ingreso" });
        } else {
            data.tasks[taskIndex].title = req.body.title;
            res.json({err: false, message: `La tarea con el id:${id} fue editada`});
        }
    }
}

const completedTask = (req, res) => {
    let id = parseInt(req.params.id);
    let task = data.tasks.find((task) => task.id === id);

    if (task) {
        task.completed = true;
        res.json({err: false, message: `La tarea con el id:${id} esta completada`});
    } else {
        res.status(404).json({ err: true, message: `La tarea con el id: ${id} no se encuentra en la BD` });
    }
}

const uncompletedTask = (req, res) => {
    let id = parseInt(req.params.id);
    let task = data.tasks.find((task) => task.id === id);

    if (task) {
        task.completed = false;
        res.json({err: false, message: `La tarea con el id:${id} esta no completada`});
    } else {
        res.status(404).json({ err: true, message: `La tarea con el id: ${id} no se encuentra en la BD` });
    }
}

const removeTask = (req, res) => {
    let id = parseInt(req.params.id);
    let taskIndex = data.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        res.status(404).json({ err: true, message: `La tarea con el id: ${id} no se encuentra en la BD` });
    } else {
        data.tasks.splice(taskIndex, 1);
        res.json({err: false, message: `La tarea con el id:${id} fue eliminada`});
    }
}

export default {
    getAllTasks,
    getTask,
    addTask,
    editTask,
    completedTask,
    uncompletedTask,
    removeTask
}

function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}