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

function Geotag(latitude, longitude, name, hashtag, id){
    this.latitude = latitude;
    this.longitude = longitude;
    this.name = name;
    this.hashtag = hashtag;
    this.identifier = id;
}

/**
 * Modul für 'In-Memory'-Speicherung von GeoTags mit folgenden Komponenten:
 * - Array als Speicher für Geo Tags.
 * - Funktion zur Suche von Geo Tags in einem Radius um eine Koordinate.
 * - Funktion zur Suche von Geo Tags nach Suchbegriff.
 * - Funktion zum hinzufügen eines Geo Tags.
 * - Funktion zum Löschen eines Geo Tags.
 */

var geotagModule = (function (){
    /* 'private' Member */
    // Array als Speicher für Geo Tags
    var geoTags = [];

    /* 'public' Member als Rückgabe-Objekt */
    return{
        //Funktion zur Suche von Geo Tags in einem Radius um eine Koordinate
        searchGeotagsRadius : function (latitude, longitude) {
            var radius = 100;
            var tagsFound = [];
            geoTags.forEach(function (tag){
                if(radius >= Math.sqrt(Math.pow(tag.latitude - latitude, 2)
                    + Math.pow(tag.longitude - longitude, 2))){
                    tagsFound.push(tag);
                }
            });
            return tagsFound;
        },
        //Funktion zur Suche von Geo Tags nach Suchbegriff
        searchGeotags : function (search){
            var tagsFound = [];
            geoTags.forEach(function (tag){
                if(tag.name.toString().includes(search.toString())){
                    tagsFound.push(tag);
                }
            });
            console.log(tagsFound)
            return tagsFound;
        },
        //Funktion zum hinzufügen eines Geo Tags
        addGeoTag : function (latitude, longitude, name, hashtag){
            var newGeotag = new Geotag(latitude, longitude, name, hashtag);
           geoTags.push(newGeotag);
        },
        //Funktion zum Löschen eines Geo Tags
        deleteGeotag : function (tag){
            geoTags.splice(tag, 1);

        },
        getList : function () {
            return geoTags;
        }

    };
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
        newLatitude : req.body.latitude,
        newLongitude : req.body.longitude
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

app.post('/tagging', function (req,res){
    geotagModule.addGeoTag(req.body.latitude, req.body.longitude, req.body.name, req.body.hashtag);
    var tagInRadius = geotagModule.searchGeotagsRadius(req.body.latitude, req.body.latitude);

    res.render('gta', {
        taglist: tagInRadius,
        newLatitude : req.body.latitude,
        newLongitude : req.body.longitude,
        TagListJSON : JSON.stringify(tagInRadius)
    });
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

app.post('/discovery', function (req,res){
    var tagInRadius = geotagModule.searchGeotagsRadius(req.body.latitude, req.body.latitude);
    if (req.body.search !== undefined) {
        tagInRadius = geotagModule.searchGeotags(req.body.search, tagInRadius)
        console.log("tags sind" + tagInRadius)
    }

    res.render('gta', {
        taglist: tagInRadius,
        newLatitude : req.body.hidden_latitude,
        newLongitude : req.body.hidden_longitude,
        TagListJSON : JSON.stringify(tagInRadius)
    });
});

app.post('/geotags', bodyParser.json(), function (req, res) {
    let lat = req.body.latitude;
    let long = req.body.longitude;
    let name = req.body.name;
    let hashtag = req.body.hashtag;
    geotagModule.addGeoTag(lat, long, name, hashtag);
    console.log(long);
    res.status(201);
    res.json(geotagModule.getList());

})

app.get("/geotags", function (req, res) {
    let lat = req.query.latitude;
    let long = req.query.longitude;
    let searchterm = req.query.search;
    if (searchterm.charAt(0) === "%") { //reverse escape
        searchterm = searchterm.substring(1);
        searchterm = "#" + searchterm;
    }
    var taglist = geotagModule.searchGeotagsRadius(lat, long);
    if (searchterm !== "" && searchterm !== undefined) {
        taglist = geotagModule.searchGeotags(searchterm);
    }
    res.status(200);
    res.json(taglist);

});

app.get('/geotags/read/:id', function(req, res){
    console.log('Calling API to read Tag with id: ' + req.params.id);
    if (req.params.id<geotagModule.getList().length) {
        res.send(JSON.stringify(geotagModule.getList()[req.params.id]));
    }
    else {
        res.sendStatus(404) //Fehler: Ressource nicht gefunden
    }

});

app.post('/geotags/:id/delete', function(req, res){
    console.log('Calling API to delete Tag with id: ' + req.params.id);
    if (req.params.id<geotagModule.getList().length) {
        geotagModule.deleteGeotag(req.params.id);
        res.sendStatus(200) //erfolgreich gelöscht
    }
    else
        res.sendStatus(404) //Fehler: Ressource nicht gefunden
});

app.post('/geotags/add', function(req, res){
    geotagModule.addGeoTag(req.query);
    console.log("Calling API to add new Tag");
    res.sendStatus(201);    //HTTP Response Code ist 201 (Created)
});

app.put("/geotags/:id", bodyParser.json(), function (req, res) {
    var list = geotagModule.getList();
    var index = req.params.id;
    let lat = req.body.latitude;
    let long = req.body.longitude;
    let name = req.body.name;
    let hashtag = req.body.hashtag;
    var found = false;
    var newtag = new Geotag(lat, long, name, hashtag, index);
    if(true){
        list.every(function (tag, ind) {
            if (index == tag.identifier) {
                geotagModule.deleteGeotag(ind, newtag);
                res.sendStatus(204);
                found = true;
                return false;
            }
            return true;
        });
        if(found == false)
            res.sendStatus(404);
    }else
        res.sendStatus(400);


});

/*app.post('/geotags/:id/change', function(req, res){
    console.log("Calling API to add change Tag with id: " + req.params.id);
    if (req.params.id<geotagModule.getList().length) {
        var ret = JSON.stringify(geotagModule.getList()[req.params.id]);
        geotagModule.getList()[req.params.id]=new Geotag(req.query);
        res.send(ret);
    }
    else {
        res.sendStatus(404) //Fehler: Ressource nicht gefunden
    }
});*/
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