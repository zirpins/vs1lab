/**
 * Template für Übungsaufgabe VS1lab/Aufgabe3
 * Das Skript soll die Serverseite der gegebenen Client Komponenten im
 * Verzeichnisbaum implementieren. Dazu müssen die TODOs erledigt werden.
 */

/**
 * Definiere Modul Abhängigkeiten und erzeuge Express app.
 */

var http = require('http');
//var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');

var app;
app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// Setze ejs als View Engine
app.set('view engine', 'ejs');

/**
 * Konfiguriere den Pfad für statische Dateien.
 * Teste das Ergebnis im Browser unter 'http://localhost:3000/'.
 */

app.use(express.static(__dirname + "/public"));

/**
 * Konstruktor für GeoTag Objekte.
 * GeoTag Objekte sollen min. alle Felder des 'tag-form' Formulars aufnehmen.
 */

function GeoTag (latitude, longitude, name, hashtag) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.name = name;
    this.hashtag = hashtag;
}

/**
 * Modul für 'In-Memory'-Speicherung von GeoTags mit folgenden Komponenten:
 * - Array als Speicher für Geo Tags.
 * - Funktion zur Suche von Geo Tags in einem Radius um eine Koordinate.
 * - Funktion zur Suche von Geo Tags nach Suchbegriff.
 * - Funktion zum hinzufügen eines Geo Tags.
 * - Funktion zum Löschen eines Geo Tags.
 */

var InMemoryModule = (function () {
    let memory = [];

    return {
        SearchRad : function (rad, lat, long) {
            let ret = [];
            memory.forEach(function (obj) {
                if (Math.sqrt(Math.pow(obj.latitude - lat, 2) + Math.pow(obj.longitude - long, 2)) <= rad) {
                    ret.push(obj);
                }
            })
            return ret;
        },

        SearchTerm : function (mem, term) {
            let ret = [];
            mem.forEach(function (obj) {
                if(obj.name.toUpperCase().includes(term.toUpperCase()) || obj.hashtag.toUpperCase().includes(term.toUpperCase())) {
                    ret.push(obj);
                }
            })
            return ret;
        },

        AddGeoTag : function (geo) {
            if(!memory.includes(geo)) {
                memory.push(geo);
            }
            return memory.indexOf(geo);
        },

        RemoveGeoTag : function (id) {
            if(memory[id] != null) {
                memory.splice(id,1);
            }
        },

        ReturnMemory : function () {
            return memory;
        },

        ChangeGeoTag : function (id, geo) {
            memory[id] = geo;
        },

        ReturnGeoTag : function (id) {
          return memory[id];
        }

    }

})();

/**
 * Route mit Pfad '/' für HTTP 'GET' Requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests enthalten keine Parameter
 *
 * Als Response wird das ejs-Template ohne Geo Tag Objekte gerendert.
 */

app.get('/', function(req, res) {
    res.render('gta', {
        taglist: [],
        reslatitude : null,
        reslongitude: null,
    });
});

/**
 * Route mit Pfad '/tagging' für HTTP 'POST' Requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests enthalten im Body die Felder des 'tag-form' Formulars.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * Mit den Formulardaten wird ein neuer Geo Tag erstellt und gespeichert.
 *
 * Als Response wird das ejs-Template mit Geo Tag Objekten gerendert.
 * Die Objekte liegen in einem Standard Radius um die Koordinate (lat, lon).
 */

app.post("/tagging", function(req, res){
    let tag = new GeoTag(req.body.latitude, req.body.longitude, req.body.name, req.body.hashtag);

    InMemoryModule.AddGeoTag(tag);

    res.render('gta', {
        taglist : InMemoryModule.SearchRad(0.5, req.body.latitude, req.body.longitude),
        reslatitude : req.body.latitude,
        reslongitude : req.body.longitude,
    })

});

/**
 * Route mit Pfad '/discovery' für HTTP 'POST' Requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests enthalten im Body die Felder des 'filter-form' Formulars.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * Als Response wird das ejs-Template mit Geo Tag Objekten gerendert.
 * Die Objekte liegen in einem Standard Radius um die Koordinate (lat, lon).
 * Falls 'term' vorhanden ist, wird nach Suchwort gefiltert.
 */

app.post("/discovery", function(req, res){

    res.render('gta', {
        taglist : InMemoryModule.SearchTerm(InMemoryModule.SearchRad(0.5, req.body.latitude, req.body.longitude), req.body.search),
        reslatitude : req.body.latitude,
        reslongitude : req.body.longitude,
    })
});


app.post("/geotags", function(req, res){

    let jsonString = JSON.stringify(req.body);
    let tag = JSON.parse(jsonString);
    let id = InMemoryModule.AddGeoTag(tag);
    res.setHeader("Location", id);
    res.sendStatus(201);
});

app.get("/geotags", function(req, res){
    let list;

    if(req.query.term == null) {
        list = InMemoryModule.SearchRad(req.query.radius, req.query.latitude, req.query.longitude);
    } else {
        list = InMemoryModule.SearchTerm(InMemoryModule.SearchRad(req.query.radius, req.query.latitude, req.query.longitude), req.query.term);
    }
    res.send(JSON.stringify(list));
});

app.get("/geotags/:id", function(req,res) {
    res.send(JSON.stringify(InMemoryModule.ReturnGeoTag(req.params.id)));
});

app.delete("/geotags/:id", function(req,res) {
    InMemoryModule.RemoveGeoTag(req.params.id);
    res.send(null);
});

app.put("/geotags/:id", function(req,res) {
    let json_string = JSON.stringify(req.body);
    let tag = JSON.parse(json_string);
    InMemoryModule.ChangeGeoTag(req.params.id, tag);
    res.send(null);
});

/**
 * Setze Port und speichere in Express.
 */

var port = 3000;
app.set('port', port);

/**
 * Erstelle HTTP Server
 */

var server = http.createServer(app);

/**
 * Horche auf dem Port an allen Netzwerk-Interfaces
 */

server.listen(port);
