// File origin: VS1LAB A3

/**
 * This script defines the main router of the GeoTag server.
 * It's a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */
 const gtStore = require('../models/geotag-store');
 const memory = new gtStore();
 const gtExs = require('../models/geotag-examples');
 
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
const GeoTagExamples= require('../models/geotag-examples');

/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */
// TODO: extend the following route example if necessary
memory .loadExamples();
router.get('/', (req, res) => {
  res.render('index', { taglist: memory.getArr() , userLatValue: "", userLongValue: "", tagGeoTag: JSON.stringify(memory.getArr())})
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
router.post(`/tagging`, function(req, res){    
  memory.addGeoTag(new GeoTag(req.body.name, req.body.userLat, req.body.userLong, req.body.hashtag));
  let x = memory.getNearbyGeoTags(req.body.userLat, req.body.userLong);
    res.render("index", { 
      taglist: x,
      userLatValue: req.body.userLat,
      userLongValue: req.body.userLong,
      tagGeoTag: JSON.stringify(x)
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
 router.post(`/discovery`, function(req, res){
  var kw = req.body.search;
  var arr = memory.searchNearbyGeoTags(kw);
  
  res.render("index", { 
    taglist: arr,
    userLatValue: req.body.hiddenUserLat,
    userLongValue: req.body.hiddenUserLong,
    tagGeoTag: JSON.stringify(arr)
  });   
});

module.exports = router;
