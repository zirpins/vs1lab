const express = require("express");
const credentials = require("./credentials");
const sessions = require("express-session");
const app = express();

app.use(sessions({
    secret: credentials.cookieSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {signed: true}
}));

app.listen(3001, () => console.log("Server listening on port 3001"));

app.get("/countMe", (req, res) => {
    const session = req.session;
    if (session.views) {
        session.views++;
        res.send("You have been here " + session.views +
            " times (last visit: " + session.lastVisit + ")");
        session.lastVisit = new Date().toLocaleDateString();
    }
    else {
        session.views = 1;
        session.lastVisit = new Date().toLocaleDateString();
        res.send("This is your first visit!");
    }
});