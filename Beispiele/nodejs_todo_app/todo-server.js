var express = require("express");
var http = require("http");

var port = 3000;
var app = express();
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(port);
console.log('Server startet on port 3000');

var todos = [];
var t1 = {
    message: "Mow the cat",
    type: 1,
    deadline: "12/12/2016"
};
var t2 = {
    message: "Feed the lawn",
    type: 3,
    deadline: "20/12/2016"
};
todos.push(t1);
todos.push(t2);

function logger(request, response, next) {
    console.log('%s\t%s\t%s', new Date(),
        request.method, request.url);
    next();
}

function getTodos(request, response, next) {
    console.log("todos requested!");
    response.json(todos);
}

//clients requests todos
app.get("/todos", logger, getTodos);

//add todo to the server
app.get("/addtodo", function(request, response) {
    const url_parts = new URL(request.url, `http://${request.headers.host}`);
	const query = url_parts.searchParams;

    if (query.has("message")) {
        var tx = {
            message: query.get("message"),
            type: query.get("type"),
            deadline: query.get("deadline")
        };
        todos.push(tx);
        console.log("Added " + tx.message);
        response.end("Todo added successfully");
    } else {
        response.end("Error: missing message parameter");
    }
});