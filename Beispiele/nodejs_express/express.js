var express = require("express");
var http = require("http");
var app;

app = express();
http.createServer(app).listen(3000);

// Dateien im "static" Unterverzeichnis ausliefern
// Index deaktivieren mit ...static(PATH,{index:false})
app.use(express.static(__dirname + "/static"));

// Mit Express ist Routing einfach:
app.get("/", function(req, res) {
	// Auch HTTP Header werden automatisch gesetzt
	res.send("What?");
});

app.get("/greetings", function(req, res) {
	const url_parts = new URL(req.url, `http://${req.headers.host}`);
	const query = url_parts.searchParams;

	var name = (query.has("name")) ? query.get("name") : "Anonymous";
	res.send("Greetings " + name);
});

app.get("/cheerio", function(req, res) {
	res.send("Cheerio.");
});
