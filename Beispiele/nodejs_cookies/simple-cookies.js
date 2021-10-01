var express = require("express");
var http = require("http");
var credentials = require("./credentials.js");
var cookies = require("cookie-parser");

var app = express();
app.use(cookies(credentials.cookieSecret));
http.createServer(app).listen(3000);

app.get("/sendMeCookies", function(req, res) {
    console.log("Cookies sent");
    res.cookie("chocolate", "monster");
    res.cookie("signed_choco", "monster", {signed: true});
    res.send();
});

app.get("/listAllCookies", function (req, res) {
    console.log("\n++++ /listallcookies (unsigned) ++++");
    console.log(req.cookies);
    console.log("\n++++ /listallcookies (signed) ++++");
    console.log(req.signedCookies);
    res.send();
});
