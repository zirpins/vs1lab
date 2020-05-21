var express = require("express"); 
var http = require("http");
var app;

var port = process.argv[2];
app = express();
http.createServer(app).listen(3000);

app.get("/hello", function (req, res) {
  const url_parts = new URL(req.url, `http://${req.headers.host}`);
	const query = url_parts.searchParams;
  var name = query.has("name") ? query.get("name") : "Anonymous";
  res.send("<html><head></head><body><h1>Greetings " + name + ", have a nice day!</h1></body></html>");
});
