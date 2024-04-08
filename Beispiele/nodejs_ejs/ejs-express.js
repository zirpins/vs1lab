var express = require("express");
var http = require("http");
var app;

app = express();
http.createServer(app).listen(3000);

var todos = [];
todos.push({message: 'Midterm exam tomorrow',dueDate: '12/11/2014'});
todos.push({message: 'Prepare for assignment 5',dueDate: '05/01/2015'});
todos.push({message: 'Sign up for final exam',dueDate: '06/01/2015'});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/todos", function(req, res) {
    res.render('todos', {
        title: 'My list of TODOs',
        todo_array: todos
    });
});
