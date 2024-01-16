import { createInterface } from 'readline';
import chalk from "chalk";

const tasks = [];

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    console.clear();
    displayMenu();
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

function displayAddTask() {
    console.clear();
    displayTitleOptions("AGREGAR TAREA");
    console.log(chalk.blueBright.bold("\n\tNumero: "+(tasks.length+1)));
    const textTitle = chalk.blue.bold("\n\tIngresar titulo: ");
    rl.question(textTitle, (title) => {
        if (!title) {
            displayMessageError("El titulo esta vacio");
            displayMessageWarning("Intentar nuevamente");
            displayLoadingView(displayAddTask);
        } else {
            console.clear();
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
                    tasks.push({
                        title,
                        description,
                        completed: false
                    });
                    console.clear();
                    displayTitleOptions("AGREGAR TAREA");
                    console.log(chalk.blueBright.bold("\n\tNumero: "+(tasks.length)));
                    console.log(chalk.blue.bold("\n\tIngresar titulo: "+title));
                    console.log(chalk.blue.bold("\n\tIngresar descripcion: "+description));
                    displayMessageAccept("Tarea agregada con exito");
                    questionOption(displayAddTask);
                }
            });
        }
    });
}

function displayListTask() {
    console.clear();
    displayTitleOptions("LISTADO TAREAS");
    if (tasks.length === 0) {
        displayMessageError("No se encuentran tareas");
        displayMessageWarning("Agregar nueva tarea");
        displayLoadingView(displayAddTask);
    } else {
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
    console.clear();
    displayTitleOptions("COMPLETAR TAREA");
    if (tasks.length === 0) {
        displayMessageError("No se encuentran tareas");
        displayMessageWarning("Agregar nueva tarea");
        displayLoadingView(displayAddTask);
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

function displayDeleteTask() {
    console.clear();
    displayTitleOptions("BORRAR TAREA");
    if (!IsListTaskEmpty()) {
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
                            tasks.forEach((task, index) => {
                                if (numero-1 === index) {
                                    tasks.splice( index, 1 );
                                }
                            });
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
        displayMessageError(" No se encuentran tareas ");
        setTimeout(() => {
            displayAddTask();
        }, 2000);
        return true;
    } else {
        return false;
    }
}

main();