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

// App routes (A3)

/**
 * Route '/' for HTTP 'GET' requests.
 * (https://expressjs.com/en/4x/api/application/#appget)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */

router.get('/', (req, res) => {
  res.render('index', { taglist: [] })
});

// API routes (A4)

/**
 * Route '/api/geotags' for HTTP 'GET' requests.
 * (https://expressjs.com/en/4x/api/application/#appget)
 *
 * Requests contain the fields of the Discovery form as query.
 * (https://expressjs.com/en/4x/api/request/#reqquery)
 *
 * As a response, an array with Geo Tag objects is rendered as JSON.
 * If 'searchterm' is present, it will be filtered by search term.
 * If 'latitude' and 'longitude' are available, it will be further filtered based on radius.
 */

// TODO: ... your code here ...


/**
 * Route '/api/geotags' for HTTP 'POST' requests.
 * (https://expressjs.com/en/4x/api/application/#apppost)
 *
 * Requests contain a GeoTag as JSON in the body.
 * (https://expressjs.com/en/4x/api/request/#reqbody)
 *
 * The URL of the new resource is returned in the header as a response.
 * The new resource is rendered as JSON in the response.
 */

// TODO: ... your code here ...


/**
 * Route '/api/geotags/:id' for HTTP 'GET' requests.
 * (https://expressjs.com/en/4x/api/application/#appget)
 *
 * Requests contain the ID of a tag in the path.
 * (https://expressjs.com/en/4x/api/request/#reqparams)
 *
 * The requested tag is rendered as JSON in the response.
 */

// TODO: ... your code here ...


/**
 * Route '/api/geotags/:id' for HTTP 'PUT' requests.
 * (https://expressjs.com/en/4x/api/application/#appput)
 *
 * Requests contain the ID of a tag in the path.
 * (https://expressjs.com/en/4x/api/request/#reqparams)
 * 
 * Requests contain a GeoTag as JSON in the body.
 * (https://expressjs.com/en/4x/api/request/#reqbody)
 *
 * Changes the tag with the corresponding ID to the sent value.
 * The updated resource is rendered as JSON in the response. 
 */

// TODO: ... your code here ...


/**
 * Route '/api/geotags/:id' for HTTP 'DELETE' requests.
 * (https://expressjs.com/en/4x/api/application/#appdelete)
 *
 * Requests contain the ID of a tag in the path.
 * (https://expressjs.com/en/4x/api/request/#reqparams)
 *
 * Deletes the tag with the corresponding ID.
 * The deleted resource is rendered as JSON in the response.
 */

// TODO: ... your code here ...

module.exports = router;
