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
const geoTagStore = GeoTagStore.getInstance(); 
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
  const currentLat = req.body.Latitude || ''; 
  const currentLon = req.body.Longitude || ''; 
  //const geoTagStore = new GeoTagStore(); // create instance of GeoTagStore
  const taglist = geoTagStore.getNearbyGeoTags(currentLat, currentLon, 1000000); // default radius = 100
  //const taglist = geoTagStore.getAllGeoTags(); 
  console.log('taglist:', taglist);
  res.render('index', { taglist, currentLat, currentLon}); 

  // render the template with current cordinates, if available
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

// TODO: ... your code here ...
router.get('/api/geotags', (req, res) => {
  const currentLat = req.query.Latitude || ''; 
  const currentLon = req.query.Longitude || ''; 
  const keyword = req.query.SearchTerm || ''; 
  const taglist = geoTagStore.searchNearbyGeoTags(currentLat, currentLon, 100000000, keyword); // default radius = 100
  //console.log('taglist:', taglist);
  console.log('\nkeyword:', keyword); 
  //console.log('\nMatching geotags:', taglist); 
  //res.render('index', { taglist, currentLat, currentLon, keyword}); 
  res.json(taglist); 
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

// TODO: ... your code here ...
router.post('/api/geotags', (req, res) => {
  const curLat = req.body.Latitude || '';
  const curLon = req.body.Longitude || ''; 
  const curName = req.body.NameLocation || ''; 
  const curHash = req.body.HashtagLocation || '';  
  // extract data from form fields (curName -> current Name)
  const newTag = new GeoTag(curLat, curLon, curName, curHash); 
  geoTagStore.addGeoTag(newTag); 
  const newURL = `/api/geotags/${encodeURIComponent(newTag.Name)}`; 
    
  res.status(201).location(newURL).json(newTag);  
  //res.status(201).json(newTag); 

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
router.get('/api/geotags/:keyword', (req, res) => {
  const currentLat = req.query.Latitude || ''; 
  const currentLon = req.query.Longitude || ''; 
  const keyword = req.params.keyword || ''; 
  const taglist = geoTagStore.searchNearbyGeoTags(currentLat, currentLon, 100000000, keyword); // default radius = 100
  //console.log('taglist:', taglist);
  console.log('\nkeyword:', keyword); 
  console.log('\nMatching geotags:', taglist); 
  //res.render('index', { taglist, currentLat, currentLon, keyword}); 
  res.json(taglist); 
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
router.put('/api/geotags/:keyword', (req, res) => {
  const curLat = req.body.Latitude || '';
  const curLon = req.body.Longitude || '';
  const curName = req.body.NameLocation || '';
  const curHash = req.body.HashtagLocation || '';
  const keyword = req.params.keyword || '';
  // extract data from form fields (curName -> current Name)

  // Remove existing GeoTag
  geoTagStore.removeGeoTag(keyword);

  // Create new GeoTag
  const newTag = new GeoTag(curLat, curLon, curName, curHash);
  geoTagStore.addGeoTag(newTag);

  //const newURL = `/api/geotags/${encodeURIComponent(newTag.Name)}`;

  // Respond with the updated GeoTag
  res.status(200).json(newTag);
  //res.status(201).location(newURL).json(newTag);
  //res.status(200).location(newURL).json({ message: 'Tag updated successfully', newTag });

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
router.delete('/api/geotags/:keyword', (req, res) => {
  const keyword = req.params.keyword || ''; 
  geoTagStore.removeGeoTag(keyword); 
  res.status(200).json({ message: 'Tag deleted...'});
});


module.exports = router;
