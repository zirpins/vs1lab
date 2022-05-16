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

/**
 * The module "geotag-examples" ...
 * ...
 *
 * TODO: implement the module in the file "../models/geotag-examples.js"
 */
// eslint-disable-next-line no-unused-vars
const GeoTagExamples = require("../models/geotag-examples");




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
  let tagStore = new GeoTagStore();
  tagStore.populate();
  res.render('index', { taglist: tagStore.geoTags, userLatitude: "", userLongitude: "" })
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

router.post('/tagging', (req, res) => {
  let name = req.body.tagging_name;
  let latitude = req.body.tagging_latitude;
  let longitude = req.body.tagging_longitude;
  let hashtag = req.body.tagging_hashtag;

  let tagStore = new GeoTagStore();
  tagStore.populate();

  let geoTagObject = new GeoTag(name, latitude, longitude, hashtag);

  let tagsInMemory = tagStore.getNearbyGeoTags(geoTagObject);
  tagsInMemory.push(geoTagObject);

  res.render('index', { taglist: tagsInMemory, userLatitude: req.body.tagging_latitude, userLongitude: req.body.tagging_longitude  })
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

router.post('/discovery', (req, res) => {
  let keyword = req.body.discovery_searchterm;

  let tagStore = new GeoTagStore();
  tagStore.populate();

  let tagsInMemory = tagStore.searchNearbyGeoTags(keyword);

  res.render('index', { taglist: tagsInMemory, userLatitude: req.body.discovery_latitude, userLongitude: req.body.discovery_longitude })
});

module.exports = router;
