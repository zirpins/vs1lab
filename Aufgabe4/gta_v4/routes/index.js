// File origin: VS1LAB A3

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
 * 
 * TODO: implement the module in the file "../models/geotag.js"
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag');

/**
 * The module "geotag-store" exports a class GeoTagStore. 
 * It provides an in-memory store for geotag objects.
 * 
 * TODO: implement the module in the file "../models/geotag-store.js"
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store');
const geoTagStore = new GeoTagStore();

/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */

// TODO: extend the following route example if necessary
router.get('/', (req, res) => {
  const allTags = geoTagStore.geoTagMultiSet;
  res.render('index', { taglist: allTags, currentLatitude: '', currentLongitude: '', searchTerm: ''})
});

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
router.post('/tagging', (req, res) => {
    const name = req.body.name;
    const hashtag = req.body.hashtag;
    const latitude = parseFloat(req.body.latitude);
    const longitude = parseFloat(req.body.longitude);
    const radius = parseFloat(req.body.radius) || 100;

    const newGeoTag = new GeoTag(latitude, longitude, name, hashtag);

    geoTagStore.addGeoTag(newGeoTag);

    const nearbyTags = geoTagStore.getNearbyGeoTags(newGeoTag, radius);

    res.render('index', {taglist: nearbyTags, 
        currentLatitude: latitude, 
        currentLongitude: longitude,
        searchTerm: ''});    
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

// TODO: ... your code here ...
router.post('/discovery', (req, res) => {
    const latitude = parseFloat(req.body.latitude);
    const longitude = parseFloat(req.body.longitude);
    const radius = parseFloat(req.body.radius) || 100;
    const searchTerm = req.body.searchTerm || '';

    const locationGeoTag = new GeoTag(latitude, longitude,'', '');

    let resultTags;

    if (searchTerm) {
        
        resultTags = geoTagStore.searchNearbyGeoTags(searchTerm, locationGeoTag, radius);
    } else {
        
        resultTags = geoTagStore.getNearbyGeoTags(locationGeoTag, radius);
    }

    res.render('index', { taglist: resultTags, 
        currentLatitude: latitude, 
        currentLongitude: longitude,
        searchTerm: searchTerm });
});

// API routes (A4)

/**
 * Route '/api/geotags' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the fields of the Discovery form as query.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * As a response, an array with Geo Tag objects is rendered as JSON.
 * If 'searchterm' is present, it will be filtered by search term.
 * If 'latitude' and 'longitude' are available, it will be further filtered based on radius.
 */

// TODO: ... your code here ...

router.get('/api/geotags', (req, res) => {
  const latitude = parseFloat(req.query.latitude);
  const longitude = parseFloat(req.query.longitude);
  const radius = parseFloat(req.query.radius) || 100;
  const searchTerm = req.query.searchTerm || '';

  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 5;

  const locationGeoTag = new GeoTag(latitude, longitude, '', '');

  let resultTags;
  if (searchTerm) {
    resultTags = geoTagStore.searchNearbyGeoTags(searchTerm, locationGeoTag, radius);
  } else {
    resultTags = geoTagStore.getNearbyGeoTags(locationGeoTag, radius);
  }

  const totalItems = resultTags.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  const items = resultTags.slice(start, start + pageSize);

  res.json({ items, page: safePage, pageSize, totalItems, totalPages }); //json Seiten
});



/**
 * Route '/api/geotags' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * The URL of the new resource is returned in the header as a response.
 * The new resource is rendered as JSON in the response.
 */

// TODO: ... your code here ...

router.post('/api/geotags', (req, res) => {
    const name = req.body.name;
    const hashtag = req.body.hashtag;
    const latitude = parseFloat(req.body.latitude);
    const longitude = parseFloat(req.body.longitude);
    
    const newGeoTag = new GeoTag(latitude, longitude, name, hashtag);
    const created = geoTagStore.addGeoTag(newGeoTag);

    res.location(`/api/geotags/${created.id}`);
    res.status(201).json(created);
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

// TODO: ... your code here ...

router.get('/api/geotags/:id', (req, res) => {
    const tagId = req.params.id;
    const geoTag = geoTagStore.getGeoTagById(tagId);

    if (geoTag) {
        res.json(geoTag);
    } else {
        res.status(404).send({ error: 'GeoTag not found' });
    }
});


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

// TODO: ... your code here ...

router.put('/api/geotags/:id', (req, res) => {
    const tagId = req.params.id;
    const name = req.body.name;
    const hashtag = req.body.hashtag;
    const latitude = parseFloat(req.body.latitude);
    const longitude = parseFloat(req.body.longitude);

    const updatedGeoTag = new GeoTag(latitude, longitude, name, hashtag);
    updatedGeoTag.id = tagId;

    const success = geoTagStore.updateGeoTag(tagId, updatedGeoTag);

    if (success) {
        res.json(updatedGeoTag);
    } else {
        res.status(404).send({ error: 'GeoTag not found' });
    }
});


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

// TODO: ... your code here ...

router.delete('/api/geotags/:id', (req, res) => {
    const tagId = req.params.id;
    const deletedGeoTag = geoTagStore.getGeoTagById(tagId);

    if (deletedGeoTag) {
        geoTagStore.deleteGeoTag(tagId);
        res.json(deletedGeoTag);
    } else {
        res.status(404).send({ error: 'GeoTag not found' });
    }
});

module.exports = router;
