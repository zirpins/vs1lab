const express = require("express");
const path = require("path");

const app = express();
const port = process.argv[2] ?? 3000;

// Dateien im "static" Unterverzeichnis ausliefern
// (Index deaktivieren mit ...static(PATH, { index: false }))
// Reihenfolge zählt: Diese Middleware steht vor den Routen,
// deshalb liefert GET / die Datei static/index.html.
app.use(express.static(path.join(__dirname, "static")));

// Formulardaten (application/x-www-form-urlencoded) nach req.body parsen
app.use(express.urlencoded({ extended: false }));

// Mit Express ist Routing einfach:
app.get("/", (req, res) => {
	// Auch HTTP Header werden automatisch gesetzt
	res.send("What?");
});

app.get("/greetings", (req, res) => {
	// Query-Parameter stehen in req.query
	const name = req.query.name ?? "Anonymous";
	res.send(`Greetings ${name}`);
});

app.get("/cheerio", (req, res) => {
	res.send("Cheerio.");
});

// Ein Formular sendet seine Felder per POST im Body
const todos = [];
app.post("/todos", (req, res) => {
	const message = req.body.message;
	todos.push(message);
	res.send(`Gespeichert: ${message} (${todos.length} TODOs)`);
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
