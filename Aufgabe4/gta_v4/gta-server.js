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
app.set('view engine', 'ejs'); //vllt hier was machen? für aufgabe 4!!!!!!!!!

/**
 * Konfiguriere den Pfad für statische Dateien.
 * Teste das Ergebnis im Browser unter 'http://localhost:3000/'.
 */

// TODO: CODE ERGÄNZEN
app.use(express.static(__dirname + "/public"));


/**
 * Konstruktor für GeoTag Objekte.
 * GeoTag Objekte sollen min. alle Felder des 'tag-form' Formulars aufnehmen.
 */

// TODO: CODE ERGÄNZEN
function GeoTag(latitude, longitude, name, hashtag){
  this.name = name;
  this.latitude = latitude;
  this.longitude = longitude;
  this.hashtag = hashtag;
};
/*
Alternative:
class GeoTag{
  constructor(latitude, longitude,.....)
  this.latitude = latitude;
  ...
  fast wie in java
}
*/
/**
 * Modul für 'In-Memory'-Speicherung von GeoTags mit folgenden Komponenten:
 * - Array als Speicher für Geo Tags.
 * - Funktion zur Suche von Geo Tags in einem Radius um eine Koordinate.
 * - Funktion zur Suche von Geo Tags nach Suchbegriff.
 * - Funktion zum hinzufügen eines Geo Tags.
 * - Funktion zum Löschen eines Geo Tags.
 */

// TODO: CODE ERGÄNZEN
var geoTagModule = (function() {
  var geoTags = [];

  return{

    searchInRadius: function(radius, longitude, latitude){
      var res = [];
      geoTags.forEach(function(geoTag){
        var disLong = longitude - geoTag.longitude;
        var disLat = latitude - geoTag.latitude;
        var distance = Math.sqrt(disLong * disLong + disLat * disLat);
        if(distance <= radius){
          res.push(geoTag);
          }
      });
      return res;
    },

    searchForTerm:function(term, array){
      var res = [];
      array.forEach(function(geoTag){
        if(geoTag.name.toLowerCase().includes(term.toLowerCase())
          || geoTag.hashtag.toLowerCase().includes(term.toLowerCase())){
          res.push(geoTag);
        }
      });
      return res;
    },

    addGeoTag:function(latitude, longitude, name, tag){
      geoTags.push(new GeoTag(latitude, longitude, name, tag));
    },

    deleteGeoTag:function(tag){
      var idx = geoTags.indexOf(tag);
      if(idx !== -1){
        geoTags.splice(idx, 1);
      }
    },

    get:function(){
      return geoTags;
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
        fLat:'',
        fLong:'',
        tLat:'',
        tLong:'',
        maptaglist:JSON.stringify([])
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

// TODO: CODE ERGÄNZEN START
app.post('/tagging', function(req, res){
    var lat = req.body.tLatitude;
    var long = req.body.tLongitude;
    geoTagModule.addGeoTag(lat, long, req.body.tName, req.body.hashtag);
    var tags = geoTagModule.searchInRadius(20, long, lat);

    res.render('gta', {
      taglist: tags,
      fLat:lat,
      fLong:long,
      tLat:lat,
      tLong:long,
      maptaglist:JSON.stringify(tags)
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

// TODO: CODE ERGÄNZEN
app.post('/discovery', function(req, res){
      var lat = req.body.fLatitude;
      var long = req.body.fLongitude;
      var tags = geoTagModule.searchInRadius(20, long, lat);

      if(req.body.discovery){
          tags = geoTagModule.searchForTerm(req.body.discovery, tags);
          if(tags.length > 0){
            lat = tags[0].latitude;
            long = tags[0].longitude;
          }
      }

      res.render('gta', {
        taglist: tags,
        fLat: lat,
        fLong: long,
        tLat: lat,
        tLong: long,
        maptaglist: JSON.stringify(tags)
      });
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
