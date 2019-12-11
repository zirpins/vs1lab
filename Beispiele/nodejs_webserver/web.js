const http = require("http");
const url = require("url");
let server;

// Diese Funktion reagiert auf HTTP Requests,
// hier wird also die Web Anwendung implementiert!
const simpleHTTPResponder = function (req, res) {

    // Routing bedeutet, anhand der URL Adresse
    // unterschiedliche Funktionen zu steuern.
    // Dazu wird zunächst die URL Adresse benötigt
    const url_parts = url.parse(req.url, true);

    // Nun erfolgt die Fallunterscheidung,
    // hier anhand des URL Pfads
    if (url_parts.pathname === "/greetme") {

        // HTTP Header müssen gesetzt werden
        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        // Auch URL Query Parameter können abgefragt werden
        const query = url_parts.query;
        let name = "Anonymous";
        if (query.name !== undefined) {
            name = query.name;
        }

        // HTML im Script zu erzeugen ist mühselig...
        res.end('<html lang="en"><head><title>Greetme</title></head><body><H1>Greetings ' +
            name + "!</H1></body></html>");

        // nun folgt der zweite Fall...
    } else {
        res.writeHead(404, {
            "Content-Type": "text/html"
        });
        res.end(
            '<html lang=""><head><title>Error</title></head><body><H1>Only /greetme is implemented.</H1></body></html>'
        );
    }
};

// Webserver erzeugen, an Endpunkt binden und starten
server = http.createServer(simpleHTTPResponder);
const port = process.argv[2];
server.listen(typeof port !== "undefined" ? port : 3000);
