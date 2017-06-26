var express = require("express"); 
var url = require("url");
var http = require("http");
var app;

var port = process.argv[2];
app = express();
http.createServer(app).listen(3000);

app.get("/hello", function (req, res) {
  var query = url.parse(req.url, true).query;
  var name = (query["name"]!=undefined) ? query["name"] : "Anonymous";
  res.send("<html><head></head><body><h1>Greetings " + name + ", have a nice day!</h1></body></html>");
});
