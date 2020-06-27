/**
 * Template für Übungsaufgabe VS1lab/Aufgabe3
 * Das Skript soll die Serverseite der gegebenen Client Komponenten im
 * Verzeichnisbaum implementieren. Dazu müssen die TODOs erledigt werden.
 */

/**
 * Definiere Modul Abhängigkeiten und erzeuge Express app.
 */

var http = require('http');
var logger = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');

var app;
app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
//app.use(bodyParser.json);

// Setze ejs als View Engine
app.set('view engine', 'ejs');

/**
 * Konfiguriere den Pfad für statische Dateien.
 * Teste das Ergebnis im Browser unter 'http://localhost:3000/'.
 */

app.use(express.static(__dirname + '/public'));

/**
 * Konstruktor für GeoTag Objekte.
 * GeoTag Objekte sollen min. alle Felder des 'tag-form' Formulars aufnehmen.
 */

function GeoTag(latitude, longitude, name, hashtag) {
    this.latitude = latitude
    this.longitude = longitude
    this.name = name
    this.hashtag = hashtag

    this.getName = function () {
        return this.name;
    };

    this.getLatitude = function () {
        return this.latitude;
    };

    this.getLongitude = function () {
        return this.longitude;
    };

    this.getHashtag = function () {
        return this.hashtag;
    };

    this.toString = function () {
        return "GeoTag: [name=" + this.name + "][latitude=" + this.latitude + "][longitude=" + this.longitude + "][hashtag=" + this.hashtag + "]";
    }
};

/**
 * Modul für 'In-Memory'-Speicherung von GeoTags mit folgenden Komponenten:
 * - Array als Speicher für Geo Tags.
 * - Funktion zur Suche von Geo Tags in einem Radius um eine Koordinate.
 * - Funktion zur Suche von Geo Tags nach Suchbegriff.
 * - Funktion zum hinzufügen eines Geo Tags.
 * - Funktion zum Löschen eines Geo Tags.
 */

var geoTagModul = (function() {
    // Private
    var tagList = [];
    /**
     * Converts degree to radian values
     * @param {double} degree Degree to be converted to radian
     */
    var degreeToRadian = function (degree) {
        return degree * (Math.PI/180)
    }
    // Public
    return {
        /**
         * Returns an array of GeoTags in a certain radius
         * @param {double} latitude Latitude in °
         * @param {double} longitude Longitude in °
         * @param {double} radius Radius in km
         * @param {GeoTag} list (Optional) Array of GeoTags
         */
        searchByRadius: function(latitude, longitude, radius, list) {
            if (list === undefined) {
                list = tagList
            }
            var results = []
            // Comparing every value with the Haversine formula for distance
            list.forEach(function (geoTag) {
                var latitude1 = degreeToRadian(latitude)
                var latitude2= degreeToRadian(geoTag.latitude)
                var divLat = degreeToRadian(geoTag.latitude - latitude)
                var divLon = degreeToRadian(geoTag.longitude - longitude)
                var distance = Math.sin(divLat/2) * Math.sin(divLat/2)
                    + Math.cos(latitude1) * Math.cos(latitude2)
                    * Math.sin(divLon/2) * Math.sin(divLon/2);
                distance = 2 * Math.atan2(Math.sqrt(distance), Math.sqrt(1-distance))
                distance = distance * 6371
                console.log('distance: ' + distance)// TODO: remove later
                if (distance <= radius) {
                    results.push(geoTag)
                }
            });
            return results
        },

        /**
         * Returns an array of Geotags that have the searchTerm as an infix in their name or hashtag
         * @param {String} searchTerm Infix to look for
         * @param {GeoTag} list (Optional) Array of GeoTags
         */
        searchByTerm: function(searchTerm, list) {
            if (list === undefined) {
                list = tagList
            }
            var results = []
            var reg = new RegExp(searchTerm, 'i')
            results = list.filter(function (geoTag) {
                return (reg.test(geoTag.name) || reg.test(geoTag.hashtag))
            })
            return results
        },

        /**
         * Adds a GeoTag to the list
         * @param {latitude} latitude of new geo tag
         * @param {longitude} longitude of new geo tag
         * @param {name} name of new geo tag
         * @param {hashtag} hashtag of new geo tag
         */
        addGeoTag: function (latitude, longitude, name, hashtag) {
            tagList.push(new GeoTag(latitude, longitude, name, hashtag));
        },

        /**
         * Deletes a GeoTag
         * @param {int} index Index of the GeoTag to be deleted
         */
        deleteGeoTagByIndex: function(index) {
            tagList.splice(index)
        },

        /**
         * Deletes geo tag
         * @param {geoTag} geo tag to delete
         */
        deleteGeoTagByGeoTag: function (geoTag) {
            if (geoTag instanceof GeoTag) {
                for (var i = 0; i < tagList.length; i++) {
                    if (tagList[i].name === geoTag.name
                        && tagList[i].latitude === geoTag.latitude
                        && tagList[i].longitude === geoTag.longitue
                        && tagList[i].hashtag === geoTag.hashtag) {

                        tagList.slice(i + 1);
                    }
                }
            }
        },
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
        lati: req.body.latitude,
        longi: req.body.longitude
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

app.post('/tagging', function (req, res) {
    // Create new GeoTag
    geoTagModul.addGeoTag(req.body.latitude, req.body.longitude, req.body.name, req.body.hashtag)
    // Create list of GeoTags in a certain radius
    console.log('have it') // TODO: remove later
    var toRender = geoTagModul.searchByRadius(req.body.latitude, req.body.longitude, 5)
    res.render('gta', {
        taglist: toRender,
        lati: req.body.latitude,
        longi: req.body.longitude
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

app.post('/discovery', function (req, res) {
    // Creat list of GeoTags in a certain radius
    var toRender = geoTagModul.searchByRadius(req.body.latitude, req.body.longitude, 5)
    console.log('toRender: [' + toRender + ']')// TODO: remove later
    // Reduce list to GeoTags with a certain infix
    if (req.body.discovery !== undefined) {
        toRender = geoTagModul.searchByTerm(req.body.discovery, toRender)
    }
    console.log('toRender: [' + toRender + ']')// TODO: remove later
    res.render('gta', {
        taglist: toRender,
        lati: req.body.latitude,
        longi: req.body.longitude
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
