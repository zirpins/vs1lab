const express = require("express");
const credentials = require("./credentials.js");
const cookies = require("cookie-parser");

const app = express();
app.use(cookies(credentials.cookieSecret));
app.listen(3000, () => console.log("Server listening on port 3000"));

app.get("/sendMeCookies", (req, res) => {
    console.log("Cookies sent");
    res.cookie("chocolate", "monster");
    res.cookie("signed_choco", "monster", {signed: true});
    res.send();
});

app.get("/listAllCookies", (req, res) => {
    console.log("\n++++ /listallcookies (unsigned) ++++");
    console.log(req.cookies);
    console.log("\n++++ /listallcookies (signed) ++++");
    console.log(req.signedCookies);
    res.send();
});
