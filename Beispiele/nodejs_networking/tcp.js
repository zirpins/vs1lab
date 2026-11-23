// Module laden; const erzeugt Konstanten
const fs = require("fs");
const net = require("net");
const filename = "todos.txt";

// Hier wird der Server erzeugt
const server = net.createServer((connection) => {
	// Bei einer neuen Verbindung wird diese Funktion ausgeführt
	console.log("Subscriber connected.");
	connection.write(`Watching ${filename}...\n`);
	// watcher setup
	const watcher = fs.watch(filename, () => {
		connection.write(`Changed: ${Date.now()}\n`);
	});
	// cleanup: Beim Schließen der Verbindung wird folgende Funktion ausgeführt
	connection.on("close", () => {
		console.log("Subscriber disconnected.");
		watcher.close();
	});
});

// Am Ende wird der Server gestartet und 'hört' auf seinem Endpunkt
server.listen(5432, () => {
	console.log("Listening for subscribers...");
});
