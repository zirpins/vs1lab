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

var tagStore = new GeoTagStore();
//tagStore.fillExamples();
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
    res.render('index', {
        taglist: [],
        ejs_latitude: "",
        ejs_longitude: "",
        ejs_mapTagList: JSON.stringify(tagStore.geotags)
    })
});

router.post('/tagging', (req, res) => {
    let lat = req.body.Lat;
    let long = req.body.Long;
    let name = req.body.Name;
    let hash = req.body.Hashtag;
    tagStore.addGeoTag(lat, long, name, hash);
    let tempTagList = tagStore.getNearbyGeoTags(lat, long, 500);
    tempTagList.push(new GeoTag(lat, long, name, hash));

    res.render('index', {
        taglist: tempTagList, ejs_latitude: lat, ejs_longitude: long,
        ejs_mapTagList: JSON.stringify(tempTagList)
    });
});

router.get('/discovery', (req, res) => {
    let lat = req.body.latitudeDiscovery;
    let long = req.body.longitudeDiscovery;
    let searchTerm = req.body.searchDiscovery;
    let tempTagList = tagStore.searchNearbyGeoTags(lat, long, searchTerm, 500);
    res.render('index', {
        taglist: tempTagList, ejs_latitude: lat, ejs_longitude: long,
        ejs_mapTagList: JSON.stringify(tempTagList)
    });
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

// TODO:Aus meiner Sicht fertig, bitte überprüfen (P.)
router.get('/api/geotags', (req, res) => {
    let lat = req.body.latitudeDiscovery;
    let long = req.body.longitudeDiscovery;
    let searchterm = req.body.searchDiscovery;
    let taglist;
    if (searchterm !== undefined && (lat !== undefined && long !== undefined)) {
        taglist = tagStore.searchNearbyGeoTags(lat, long, searchterm, 10);
    } else if (lat !== undefined && long !== undefined) {                                   /*Von Oder zu && geändert*/
        taglist = tagStore.getNearbyGeoTags(lat, long, 10);
    }
    res.status(200).json(JSON.stringify(taglist));
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

// TODO:Aus meiner Sicht fertig, bitte überprüfen (P.)
router.post('/api/geotags', (req, res) => {
    let name = req.body.name;
    let lat = req.body.Lat;
    let long = req.body.Long;
    let hashtag = req.body.hashtag;
    tagStore.addGeoTag(name, lat, long, hashtag);
    res.append("URL", "api/geotags/" + name);
    res.status(201).json(JSON.stringify(tagStore.geotags));
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
router.get("/api/geotags/:id?", (req, res) => {

    // TODO:Aus meiner Sicht fertig, bitte überprüfen (P.)
    let id = req.params.id;
    let foundGeotag = tagStore.searchGeotagByID(id);
    res.status(200).json(JSON.stringify(foundGeotag));
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
router.put("/api/geotags/:id?", (req, res) => {
    // TODO:Aus meiner Sicht fertig, bitte überprüfen (P.)
    id = req.body.id;
    let lat = req.body.Lat;
    let long = req.body.Long;
    let name = req.body.Name;
    let hash = req.body.Hashtag;
    newGeotag = GeoTag(lat, long, name, hash)
    tagStore.putGeotag(newGeotag, id);
    res.status(202).json(JSON.stringify(tagStore.geotags));
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

router.delete("/api/geotags/:id?", (req, res) => {
    // TODO:Aus meiner Sicht fertig, bitte überprüfen (P.)
    let id = req.params.id;
    let foundGeotag = tagStore.searchGeotagByID(id);
    if (foundGeotag === undefined || tagStore.geotags === undefined)
        res.status(400);
    else {
        tagStore.removeGeoTag(foundGeotag[0].name);
        res.status(203).json(JSON.stringify(tagStore));
    }
});


module.exports = router;
