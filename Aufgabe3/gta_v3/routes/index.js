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
const geoTagStore = GeoTagStore.getInstance(); 

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
  const currentLat = req.body.Latitude || ''; 
  const currentLon = req.body.Longitude || ''; 
  //const geoTagStore = new GeoTagStore(); // create instance of GeoTagStore
  const taglist = geoTagStore.getNearbyGeoTags(currentLat, currentLon, 1000000); // default radius = 100
  //const taglist = geoTagStore.getAllGeoTags(); 
  console.log('taglist:', taglist);
  res.render('index', { taglist, currentLat, currentLon}); 

  // render the template with current cordinates, if available
});

/**
 * Route '/tagging' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests carry the fields of the tagging form in the body.                       **
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

router.post('/tagging',(req, res) => {
  const currentLat = req.body.Latitude || ''; 
  const currentLon = req.body.Longitude || ''; 
  //const geoTagStore = new GeoTagStore(); // create instance of GeoTagStore
  const newTag = new GeoTag(currentLat, currentLon, req.body.NameLocation, req.body.HashtagLocation); // create new Tag
  geoTagStore.addGeoTag(newTag); // add new tag to taglist
  const taglist = geoTagStore.getNearbyGeoTags(currentLat, currentLon, 100); // default radius = 100
  console.log('taglist:', taglist);
  res.render('index', { taglist, currentLat, currentLon}); 
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
  const currentLat = req.body.Latitude || ''; 
  const currentLon = req.body.Longitude || ''; 
  const keyword = req.body.SearchTerm || ''; 
  const taglist = geoTagStore.searchNearbyGeoTags(currentLat, currentLon, 100, keyword); // default radius = 100
  //console.log('taglist:', taglist);
  console.log('keyword:', keyword); 
  res.render('index', { taglist, currentLat, currentLon, keyword}); 
}); 

module.exports = router;
