const http = require("http");

// Diese Funktion reagiert auf HTTP Requests,
// hier wird also die Web Anwendung implementiert!
const simpleHTTPResponder = (req, res) => {

    // Routing bedeutet, anhand der URL Adresse
    // unterschiedliche Funktionen zu steuern.
    // Dazu wird zunächst die URL Adresse benötigt.
    // (Hier wird die WHATWG URL API mit der
    // URL Klasse verwendet.)
    const url = new URL(req.url, `http://${req.headers.host}`);

    // Nun erfolgt die Fallunterscheidung,
    // hier anhand des URL Pfads
    if (url.pathname === "/greetme") {

        // HTTP Header müssen gesetzt werden
        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        // Auch URL Query Parameter können abgefragt werden
        const query = url.searchParams;
        let name = "Anonymous";
        if (query.has("name")) {
            name = query.get("name");
        }

        // HTML im Script zu erzeugen ist mühselig...
        res.end(`<html lang="en"><head><title>Greetme</title></head><body><h1>Greetings ${name}!</h1></body></html>`);

        // nun folgt der zweite Fall...
    } else {
        res.writeHead(404, {
            "Content-Type": "text/html"
        });
        res.end(
            '<html lang="en"><head><title>Error</title></head><body><h1>Only /greetme is implemented.</h1></body></html>'
        );
    }
};

// Webserver erzeugen, an Endpunkt binden und starten
const server = http.createServer(simpleHTTPResponder);
const port = process.argv[2] ?? 3000;
server.listen(port);
console.log(`Server listening on port ${port}`);
