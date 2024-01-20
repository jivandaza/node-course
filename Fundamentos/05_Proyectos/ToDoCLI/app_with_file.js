import { readFileSync, writeFileSync, existsSync } from "fs";
import { createInterface } from 'readline';
import chalk from "chalk";

const tasks = [];
const DB_FILE = "tasks.txt";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    clearWindow();
    displayMenu();
    loadTasksOfFile();
    chooseOption();
}

function displayMenu() {
    console.log(chalk.yellow.bold("\n\t\t🦊🦊🦊 To Do APP 🐺🐺🐺"));
    console.log(chalk.blue.bold("\n\t 1. Agregar tarea. "));
    console.log(chalk.blue.bold("\n\t 2. Listado tareas. "));
    console.log(chalk.blue.bold("\n\t 3. Completar tarea. "));
    console.log(chalk.blue.bold("\n\t 4. Borrar tarea. "));
    console.log(chalk.blue.bold("\n\t 5. Salir de APP. "));
}

function chooseOption() {
    const text = chalk.yellowBright.bold("\n\t Elegir opcion: ");
    rl.question(text, (choice) => {
        switch (choice) {
            case "1": displayAddTask();
                break;
            case "2": displayListTask();
                break;
            case "3": displayCompletedTask();
                break;
            case "4": displayDeleteTask();
                break;
            case "5":
                displayMessageWarning("Saliendo...");
                console.log("\n");
                rl.close();
                break;
            default:
                displayMessageError("Elección no es valida");
                displayMessageWarning("Intentar nuevamente");
                displayLoadingView(main);
                break;
        }
    });
}

function loadTasksOfFile() {
    // Verificar si el archivo existe de forma sincrónica
    if (!existsSync(DB_FILE)) {
        try {
            // Si el archivo no existe, se crea de forma bloqueante
            writeFileSync(DB_FILE, '', "utf-8");
            //displayMessageAccept("La base de datos esta disponible");
        } catch (error) {
            displayMessageError("Error al crear el archivo: " + error.message);
            displayMessageWarning("La base de datos no esta disponible");
        }
    } else {
        try {
            const data = readFileSync(DB_FILE, "utf-8");
            const lines = data.split("\n");
            tasks.length = 0;

            lines.forEach((line) => {
                if (line.trim() !== "") {
                    const [title, description, completedStr] = line.split(";");
                    const completed = completedStr.trim().toLowerCase() === 'true';
                    addTaskInList({
                        title,
                        description,
                        completed: completed === true
                    });
                }
            });
        } catch (err) {
            displayMessageError("Error al leer el archivo: " + err.message);
            displayMessageWarning("La base de datos no esta disponible");
        }
    }
}

function saveTaskInFile() {
    const data = tasks.map((task) => `${task.title};${task.description};${task.completed}`).join("\n");
    writeFileSync(DB_FILE, data, "utf-8");
}

function displayAddTask() {
    clearWindow();
    displayTitleOptions("AGREGAR TAREA");
    console.log(chalk.blueBright.bold("\n\tNumero: "+(tasks.length+1)));
    const textTitle = chalk.blue.bold("\n\tIngresar titulo: ");
    rl.question(textTitle, (title) => {
        if (!title) {
            displayMessageError("El titulo esta vacio");
            displayMessageWarning("Intentar nuevamente");
            displayLoadingView(displayAddTask);
        } else {
            clearWindow();
            displayTitleOptions("AGREGAR TAREA");
            console.log(chalk.blueBright.bold("\n\tNumero: "+(tasks.length+1)));
            console.log(chalk.blue.bold("\n\tIngresar titulo: "+title));
            const textDescription = chalk.blue.bold("\n\tIngresar descripcion: ");
            rl.question(textDescription, (description) => {
                if (!description) {
                    displayMessageError("La descripcion esta vacia");
                    displayMessageWarning("Intentar nuevamente");
                    displayLoadingView(displayAddTask);
                } else  {
                    clearWindow();
                    displayTitleOptions("AGREGAR TAREA");
                    console.log(chalk.blueBright.bold("\n\tNumero: "+(tasks.length+1)));
                    console.log(chalk.blue.bold("\n\tIngresar titulo: "+title));
                    console.log(chalk.blue.bold("\n\tIngresar descripcion: "+description));
                    addTaskInList({
                        title,
                        description,
                        completed: false
                    });
                    saveTaskInFile();
                    displayMessageAccept("Tarea agregada a la base de datos");
                    questionOption(displayAddTask);
                }
            });
        }
    });
}

function displayListTask() {
    clearWindow();
    displayTitleOptions("LISTADO TAREAS");
    if (!IsListTaskEmpty()) {
        tasks.forEach((item, index) => {
            let status = item.completed ? "✔️" : "❌";
            if (item.completed) {
                console.log(chalk.green.bold(" \n\t "+(index+1)+" - "+item.title+" - "+item.description+" - "+status+"  "));
            } else  {
                console.log(chalk.red.bold(" \n\t "+(index+1)+" - "+item.title+" - "+item.description+" - "+status+"  "));
            }
        });
        const textNext = chalk.bgYellowBright.bold("\n\t Enter para continuar ");
        rl.question(textNext, () => {
            displayLoadingView(main);
        });
    }
}

function displayCompletedTask() {
    clearWindow();
    displayTitleOptions("COMPLETAR TAREA");
    if (!IsListTaskEmpty()) {
        if (AllTasksAreCompleted()) {
            displayMessageError("No hay tareas por completar");
            displayMessageWarning("Intente agregar una tarea");
            displayLoadingView(main);
        } else {
            const text = chalk.blue.bold("\n\tIngresar numero: ");
            rl.question(text, (numeroText) => {
                if (!numeroText) {
                    displayMessageError("El numero esta vacio");
                    displayMessageWarning("Intentar nuevamente");
                } else {
                    let numero = 0;
                    try {
                        numero = parseInt(numeroText);
                        if (numero <= 0 || numero > tasks.length) {
                            displayMessageError("No se encuentra la tarea");
                            displayMessageWarning("Intentar nuevamente");
                        } else {
                            if (tasks[numero-1].completed) {
                                displayMessageError("Tarea se encuentra completada");
                                displayMessageWarning("Intentar nuevamente");
                            } else {
                                tasks[numero-1].completed = true;
                                saveTaskInFile();
                                displayMessageAccept("Tarea completada con exito");
                            }
                        }
                    } catch(error) {
                        displayMessageError("ERROR: "+error.message);
                        displayMessageWarning("Intentar nuevamente");
                    }
                }
                setTimeout(() => {
                    questionOption(displayCompletedTask);
                }, 2000);
            });
        }
    }
}

function displayDeleteTask() {
    clearWindow();
    displayTitleOptions("BORRAR TAREA");
    if (!IsListTaskEmpty()) {
        if (!AllTasksAreCompleted()) {
            displayMessageError("No hay tareas completas por borrar");
            displayMessageWarning("Intente completar una tarea");
            displayLoadingView(main);
        } else {
            const text = chalk.blue.bold("\n\tIngresar numero: ");
            rl.question(text, (numeroText) => {
                if (!numeroText) {
                    displayMessageError("El numero esta vacio");
                    displayMessageWarning("Intentar nuevamente");
                    setTimeout(() => {
                        questionOption(displayDeleteTask);
                    }, 2000);
                } else {
                    let numero = 0;
                    try {
                        numero = parseInt(numeroText);
                        if (numero <= 0 || numero > tasks.length) {
                            displayMessageError("No se encuentra la tarea");
                            displayMessageWarning("Intentar nuevamente");
                            setTimeout(() => {
                                questionOption(displayDeleteTask);
                            }, 2000);
                        } else {
                            if (!tasks[numero-1].completed) {
                                displayMessageError("Tarea no se encuentra completada");
                                displayMessageWarning("Intentar nuevamente");
                                setTimeout(() => {
                                    questionOption(displayDeleteTask);
                                }, 2000);
                            } else {
                                deleteTaskInList(numero-1);
                                saveTaskInFile();
                                displayMessageAccept("Tarea borrada con exito");
                                setTimeout(() => {
                                    questionOption(displayDeleteTask);
                                }, 2000);
                            }
                        }
                    } catch(error) {
                        displayMessageError("ERROR: "+error.message);
                        displayMessageWarning("Intentar nuevamente");
                        setTimeout(() => {
                            questionOption(displayDeleteTask);
                        }, 2000);
                    }
                }
            });
        }
    }
}

function addTaskInList(task) {
    tasks.push(task);
}

function deleteTaskInList(id) {
    tasks.forEach((task, index) => {
        if (id === index) {
            tasks.splice( index, 1 );
        }
    });
}

function clearWindow() {
    console.clear();
}

function displayMessageError(message) {
    console.log(chalk.bgRedBright.white.bold("\n\t "+message+" "));
}

function displayMessageAccept(message) {
    console.log(chalk.bgGreenBright.white.bold("\n\t "+message+" "));
}

function displayMessageWarning(message) {
    console.log(chalk.bgYellowBright.white.bold("\n\t "+message+" "));
}

function displayTitleOptions(title) {
    console.log(chalk.bgBlueBright.white.bold("\n\t\t "+title+" "));
}

function displayLoadingView(view) {
    setTimeout(() => {
        view();
    }, 2000);
}

const questionOption = (option) => {
    const text = chalk.blue.bold("\n\tDesea continuar [S/N]: ");
    rl.question(text, (opc) => {
        if (!opc) {
            displayMessageError("La opcion esta vacia");
            displayMessageWarning("Intentar nuevamente");
            setTimeout(() => {
                questionOption(option);
            }, 2000);
        } else {
            opc = opc.toUpperCase();
            if (opc === "S") {
                displayLoadingView(option);
            } else if (opc === "N") {
                displayLoadingView(main);
            } else {
                displayMessageError(" La opcion no es valida ");
                displayMessageWarning("Intentar nuevamente");
                setTimeout(() => {
                    questionOption(option);
                }, 2000);
            }
        }
    });
}

const IsListTaskEmpty = () => {
    if (tasks.length === 0) {
        displayMessageError("No se encuentran tareas");
        displayMessageWarning("Agregar nueva tarea");
        setTimeout(() => {
            displayAddTask();
        }, 2000);
        return true;
    } else {
        return false;
    }
}

const AllTasksAreCompleted = () => {
    let state = true;
    tasks.forEach((task) => {
        if (!task.completed) {
            state = false;
        }
    });
    return state;
}

main();