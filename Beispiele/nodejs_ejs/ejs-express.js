const express = require("express");
const path = require("path");

const app = express();
app.listen(3000, () => console.log("Server listening on port 3000"));

const todos = [];
todos.push({message: 'Midterm exam tomorrow',dueDate: '12/11/2014'});
todos.push({message: 'Prepare for assignment 5',dueDate: '05/01/2015'});
todos.push({message: 'Sign up for final exam',dueDate: '06/01/2015'});

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.get("/todos", (req, res) => {
    res.render('todos', {
        title: 'My list of TODOs',
        todo_array: todos
    });
});
