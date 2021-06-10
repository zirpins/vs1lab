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

// app.use(bodyParser.urlencoded({
//     extended: false
// }));

app.use(bodyParser.json());



// Setze ejs als View Engine
app.set('view engine', 'ejs');

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

function GeoTag(latitude, longitude, name, hashtag, id){

  this.name = name;
  this.latitude = latitude;
  this.longitude = longitude;
  this.hashtag = hashtag;

  this.id = id;

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

var idCounter = 0;
// TODO: CODE ERGÄNZEN
var geoTagModule = (function() {
  //private
  var geoTags = [];

  return{
  //public

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


    searchForTerm:function(term){
      var res = [];
      geoTags.forEach(function(geoTag){

        if(geoTag.name.toLowerCase().includes(term.toLowerCase())
          || geoTag.hashtag.toLowerCase().includes(term.toLowerCase())){
          res.push(geoTag);
        }
      });
      return res;
    },


    addGeoTag:function(tag){
      tag.id = idCounter++;
      geoTags.push(tag);
      return tag.id;

    },

    deleteGeoTag:function(tag){
      var idx = geoTags.indexOf(tag);
      if(idx !== -1){
        geoTags.splice(idx, 1);
      }
    },

    deleteGeoTagById:function(id){
      geoTags.forEach(function(element){
        if(element.id == id){
          var index = geoTags.indexOf(element);
          geoTags.splice(index, 1);
          return;
        }
      });
    },

    get:function(){
      return geoTags;
    },

    getTenItems:function(page, rows){
        var res = [];
        var start = rows * (page-1);
        var end = start  + rows + rows;
        var j;
        for(j = start; j < end; j++){
            if(geoTags[j] !== null) {
                res.push(geoTags[j]);
            }
            else{
                j = end;
            }
        }
        return res;
    },

    editTag: function(id, tag){
    geoTags.forEach(element => {
        if(element.id == id){
          if(tag.id){
            element.id = tag.id;
          }
          if(tag.longitude){
            element.longitude = tag.longitude;
          }
          if(tag.latitude){
            element.latitude = tag.latitude;
          }
          if(tag.name){
            element.name = tag.name;
          }
          if(tag.hashtag){
            element.hashtag = tag.hashtag;
          }
          return;
        }
      });
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

    geoTagModule.addGeoTag(new GeoTag(lat, long, req.body.tName, req.body.hashtag));

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

      var searchterm = req.body.discovery;
      var tags = [];

      if(searchterm){
        tags = geoTagModule.searchForTerm(searchterm);
        if(tags.length > 0){ //Zentriere auf erten Treffer
              lat = tags[0].latitude;
              long = tags[0].longitude;
            }
      }
      else{
        tags = geoTagModule.searchInRadius(20, long, lat);

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

//Route to get geotags by Searchterm, by radius or all
app.get('/geotags', function(req, res){
 if(req.query.latitude && req.query.longitude){
    var radius = 20;
    if(req.query.radius && req.query.radius > 0){
      radius = req.query.radius;
    }
    res.json(geoTagModule.searchInRadius(radius, req.query.longitude, req.query.latitude));
    return;
  }
  else if(req.query.longitude || req.query.latitude){
    res.status(400).send("request must provide 'latitude' & 'longitude' (&optional 'radius') parameter");
  }
  else if(req.query.search){
        res.json(geoTagModule.searchForTerm(req.query.search));
    return;
  }
  else if(req.query.currentpage && req.query.rows){
      res.json(geoTagModule.getTenItems(req.query.currentpage, req.query.rows));
      return;
  }
  else{
    res.json(geoTagModule.get());
    return;
  }
});

//Route to add new Geotag
app.post('/geotags', function(req, res){
    if(req.body.latitude && req.body.longitude && req.body.name && req.body.hashtag){
      var id = geoTagModule.addGeoTag(req.body);
      res.status(201).set("Location", "http://" + server.address().address + ":" + server.address().port + "/geotags/" + id).json(geoTagModule.get());
    }
    else{
      res.status(400).send("post request was invalid");
    }
});

//Route to get a specific container-ressource
app.get('/geotags/:id',function(req, res){
    geoTagModule.get().forEach(element => {
      if(element.id == req.params.id){
        res.json(element);
        return;
      }
    });
    //if not found then:
      res.status(404).send("tag id" + req.params.id + "not found");
});

app.put('/geotags/:id', function(req, res){
  if(req.body.latitude || req.body.longitude || req.body.name || req.body.hashtag){
    geoTagModule.editTag(req.params.id, req.body);
    res.status(200).send();
  }
  else{
    res.status(400).send("put request was invalid");
  }
});

app.delete('/geotags/:id', function(req, res){
  geoTagModule.deleteGeoTagById(req.params.id);
  res.status(200).send();
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
