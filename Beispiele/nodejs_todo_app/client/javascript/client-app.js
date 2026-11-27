const addTodosToList = (todos) => {
    const todolist = document.getElementById("todo-list");
    for (const todo of todos) {
        const li = document.createElement("li");
        li.textContent = `TODO: ${todo.message}`;
        todolist.appendChild(li);
    }
};

const main = async () => {
    console.log("Loading todos from server");
    try {
        const response = await fetch("../todos");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        addTodosToList(await response.json());
    } catch (error) {
        console.log(`error: ${error.message}`);
    }
};

document.addEventListener("DOMContentLoaded", main);
