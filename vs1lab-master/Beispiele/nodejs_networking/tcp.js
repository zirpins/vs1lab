"use strict";
// const erzeugt Konstanten
const fs = require('fs'),
	net = require('net'),
	filename = 'todos.txt',
	// Hier wird der Server erzeugt
	server = net.createServer(function(connection) {
		// Bei einer neuen Verbindung wird diese Funktion ausgeführt
		console.log("Subscriber connected");
		connection.write("Now watching " + filename + " for changes\n");
		var watcher = fs.watch(filename, function() {
			connection.write("File " + filename + " has changed: " + Date.now() +
				"\n");
		});

		// Beim schließen der Verbindung wird folgende Funktion ausgeführt
		connection.on('close', function() {
			console.log("Subscriber disconnected");
			watcher.close();
		});
	});

// Am Ende wird der Server gestartet und 'hört' auf seinem Endpunkt
server.listen(5432, function() {
	console.log("Listening to subscribers...");
});
