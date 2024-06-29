// File origin: VS1LAB A3, A4

/**
 * This script defines the main router of the GeoTag server.
 * It's a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * Define module dependencies.
 */

const express = require('express');
const router = express.Router();

/**
 * The module "geotag" exports a class GeoTagStore. 
 * It represents geotags.
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag');

/**
 * The module "geotag-store" exports a class GeoTagStore. 
 * It provides an in-memory store for geotag objects.
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store');
let database = new GeoTagStore();
const exampleData = require('../models/geotag-examples');
exampleData.tagList.forEach(geotag => {
  database.addGeoTag(new GeoTag(geotag[1], geotag[2], geotag[0], geotag[3]))
});

// App routes (A3)

/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */

router.get('/', (req, res) => {
  res.render('index', { taglist: database.getAllGeoTags() })
});

// API routes (A4)

/**
 * Route '/api/geotags' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the fields of the Discovery form as query.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As a response, an array with Geo Tag objects is rendered as JSON.
 * If 'searchterm' is present, it will be filtered by search term.
 * If 'latitude' and 'longitude' are available, it will be further filtered based on radius.
 */

router.get('/api/geotags', (req, res) => {
  const searchRadius = 5000;
  var geotags = [];
  if (req.query.latitude && req.query.longitude)
    if (req.query.searchTerm)
      geotags = database.searchNearbyGeoTags(parseFloat(req.query.latitude), parseFloat(req.query.longitude), searchRadius, req.query.searchTerm);
    else
      geotags = database.getNearbyGeoTags(parseFloat(req.query.latitude), parseFloat(req.query.longitude), searchRadius);
  else
    geotags = database.getAllGeoTags();

  if (req.query.start)
    if (req.query.limit)
      geotags = geotags.slice(req.query.start, parseInt(req.query.start) + parseInt(req.query.limit));
    else
      geotags = geotags.slice(req.query.start);

  res.json(geotags);
});


/**
 * Route '/api/geotags' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * The URL of the new resource is returned in the header as a response.
 * The new resource is rendered as JSON in the response.
 */

router.post('/api/geotags', (req, res) => {
  const newGeoTag = new GeoTag(req.body.latitude, req.body.longitude, req.body.name, req.body.hashtag);
  database.addGeoTag(newGeoTag);
  res.status(201)
    .location(`/api/geotags/${newGeoTag.id}`)
    .json(newGeoTag);
});


/**
 * Route '/api/geotags/:id' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * The requested tag is rendered as JSON in the response.
 */

router.get('/api/geotags/:id', (req, res) => {
  let geotag = database.getGeoTagById(req.params.id);
  if (geotag === undefined) {
    res.sendStatus(404);
  }
  res.json(geotag);
})


/**
 * Route '/api/geotags/:id' for HTTP 'PUT' requests.
 * (http://expressjs.com/de/4x/api.html#app.put.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 * 
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * Changes the tag with the corresponding ID to the sent value.
 * The updated resource is rendered as JSON in the response. 
 */

router.put('/api/geotags/:id', (req, res) => {
  if (req.body.latitude && req.body.longitude && req.body.name && req.body.hashtag) {
    let geotag = database.updateGeoTagById(req.params.id, new GeoTag(req.body.latitude, req.body.longitude, req.body.name, req.body.hashtag));
    res.json(geotag);
  } else {
    res.sendStatus(400);
  }
})


/**
 * Route '/api/geotags/:id' for HTTP 'DELETE' requests.
 * (http://expressjs.com/de/4x/api.html#app.delete.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * Deletes the tag with the corresponding ID.
 * The deleted resource is rendered as JSON in the response.
 */

router.delete('/api/geotags/:id', (req, res) => {
  let geotag = database.getGeoTagById(req.params.id);
  database.removeGeoTagById(req.params.id);
  if (geotag === undefined)
    res.sendStatus(404);
  else
    res.json(geotag);
})












/**
 * Route '/tagging' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the tagging form in the body.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * Based on the form data, a new geotag is created and stored.
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the new geotag.
 * To this end, "GeoTagStore" provides a method to search geotags 
 * by radius around a given location.
 */

// TODO: ... your code here ...

/**
router.post('/tagging', (req, res) => {
  database.addGeoTag(new GeoTag(req.body.latitude, req.body.longitude, req.body.name, req.body.hashtag));
  res.render('index', {
    taglist: database.getAllGeoTags(), 
    query: req.body.query,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });
});

/**
 * Route '/discovery' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the discovery form in the body.
 * This includes coordinates and an optional search term.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the given coordinates.
 * If a search term is given, the results are further filtered to contain 
 * the term as a part of their names or hashtags. 
 * To this end, "GeoTagStore" provides methods to search geotags 
 * by radius and keyword.
 */

/**
// TODO: ... your code here ...
router.post('/discovery', (req, res) => {
  const searchRadius = 20000;
  const latitude = parseFloat(req.body.latitude);
  const longitude = parseFloat(req.body.longitude);
  let taglist = [];
 
  if (req.body.query) {
    taglist = database.searchNearbyGeoTags(latitude, longitude, searchRadius, req.body.query);
  } else {
    taglist = database.getNearbyGeoTags(latitude, longitude, searchRadius);
  }



  res.render('index', {
    taglist: taglist, 
    query: req.body.query,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });
})
  *
/* 
  7. Wenn du nun fertig bist, dann strenge dich an
  8. und nach deinem Herrn richte dein Begehren aus.
*/
module.exports = router;