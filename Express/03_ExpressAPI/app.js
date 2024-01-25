import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import taskController from "./controllers/taskController.js";
import errorController from "./controllers/errorController.js";

const app = express(),
    hostname = "localhost",
    port = 3000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/tasks", taskController.getAllTasks);
app.get("/tasks/:id", taskController.getTask);
app.post("/tasks", taskController.addTask);
app.put("/tasks/:id", taskController.editTask);
app.put("/tasks/completed/:id", taskController.completedTask);
app.put("/tasks/uncompleted/:id", taskController.uncompletedTask);
app.delete("/tasks/:id", taskController.removeTask);

app.use(errorController.error404);

app.listen(port, () => {
    console.log(`\n\tLa API se inicio en http://${hostname}:${port}/tasks\n`);
});
