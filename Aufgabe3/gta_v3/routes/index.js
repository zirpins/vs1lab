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
 *
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag');

/**
 * The module "geotag-store" exports a class GeoTagStore.
 * It provides an in-memory store for geotag objects.
 *
 *
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store');

var tagStore = new GeoTagStore();
tagStore.fillExamples();

/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */


router.get('/', (req, res) => {
    res.render('index', {
        taglist: tagStore.geotags,
        ejs_latitude: "",
        ejs_longitude: "",
        ejs_mapTagList: JSON.stringify(tagStore.geotags)
    })
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
    let getStoreTag = tagStore.geotags;
    let lat = req.body["latitude"];
    let long = req.body["longitude"];
    let name = req.body["name"];
    let hash = req.body["hash"];
    tagStore.addGeoTag(lat, long, name, hash);
    let tempTagList = getStoreTag.getNearbyGeoTags(lat, long, 50); /*ToDo: Radius traken*/

    res.render('index', {
        taglist: tempTagList, ejs_latitude: lat, ejs_longitude: long,
        ejs_mapTagList: JSON.stringify(tempTagList)
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
router.post('/discovery', (req, res) => {
    let lat = req.body["latitude"];
    let long = req.body["longitude"];
    let searchTerm = req.body["query"];

    let tempTagList = tagStore.searchNearbyGeoTags(lat, long, searchTerm, 50);

    res.render('index', {
        taglist: tempTagList, ejs_latitude: lat, ejs_longitude: long,
        ejs_mapTagList: JSON.stringify(tempTagList)
    });
});

module.exports = router;
