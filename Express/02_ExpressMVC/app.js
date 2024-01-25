import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url"
import taskController from "./controllers/taskController.js";
import errorController from "./controllers/errorController.js";

// configurar ruta de carpeta de directorio del proyecto
// Esto es para MAC
//const __dirname = path.dirname(new URL(import.meta.url).pathname);
// Cualquiera de estas 2 opciones es para WINDOWS
const __dirname = fileURLToPath(new URL(".", import.meta.url));
/*const __dirname = (process.platform === "win32")
    ? path.resolve()
    : path.dirname(new URL(import.meta.url).pathname);*/

const app = express(),
    hostname = "localhost",
    port = 3000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", taskController.getAllTasks);
app.get("/add", taskController.getAddTaskForm);
app.post("/add", taskController.addTask);
app.get("/edit/:id", taskController.getEditTaskForm);
app.post("/edit/:id", taskController.editTask);
app.get("/completed/:id", taskController.completedTask);
app.get("/uncompleted/:id", taskController.uncompletedTask);
app.get("/remove/:id", taskController.removeTask);

app.use(errorController.error404);

app.listen(port, () => {
    console.log(`\n\tLa aplicación se inicio en http://${hostname}:${port}\n`);
});
