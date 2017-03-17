var express = require("express");
var url = require("url");
var http = require("http");
var app;

app = express();
http.createServer(app).listen(3000);

// Mit Express ist Routing einfach:
app.get("/", function(req, res) {
	// Auch HTTP Header werden automatisch gesetzt
	res.send("What?");
})

app.get("/greetings", function(req, res) {
	var query = url.parse(req.url, true).query;
	var name = (query["name"] !== undefined) ? query["name"] : "Anonymous";
	res.send("Greetings " + name);
});

app.get("/cheerio", function(req, res) {
	res.send("Cheerio.");
});
