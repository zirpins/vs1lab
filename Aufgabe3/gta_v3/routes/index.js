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
const GeoTag = require('../models/geotag'); //javadaki import gibi models klasöründeki geotag.js'yi include etmis oluyorsun.

/**
 * The module "geotag-store" exports a class GeoTagStore. 
 * It provides an in-memory store for geotag objects.
 * 
 * TODO: implement the module in the file "../models/geotag-store.js"
 */

// eslint-disable-next-line no-unused-vars

const GeoTagStore = require('../models/geotag-store');
const {application} = require("express");//bu sanirim vardi. yokmus. bu ne ise yariyor? sanirim includes express

const store = new GeoTagStore()//yeni bir instance? yaratiyorsun

/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */

// TODO: extend the following route example if necessary
//Bunu extend ettik

router.get('/', (req, res) => {
  const tags = store.getAllGeoTags() //geotagstore'a bu isimde bir tane method yazdik
  res.render('index', { taglist: tags })
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

router.post("/tagging", (req, res) => {
  const data = req.body

  const geoTag = new GeoTag(data.tag_latitude, data.tag_longitude, data.tag_name, data.tag_hashtag)
  store.addGeoTag(geoTag)

  return res.redirect('back')//tag'i ekledikten sonra eski haline dönüyor.
})


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

//index.ejs icindeki <form class="discovery__search" id="discoveryFilterForm" action="/discovery" method="post"> kisminda
//yer alan searchterm, tag_latitude, tag_longitude field'larini kullanacaksin.

router.post("/discovery", (req, res) => { //path kismina, form'daki action bölümünde yazani kullaniyoruz.
  const dataDisco = req.body

  const geoTag = new GeoTag(data.searchterm, data.tag_latitude, data.tag_longitude)//name kisminda yazanlari kullaniyoruz.
  store.addGeoTag(geoTag)//burada getall yerine filtreleme yapacagiz!!! googledan arastir, bulursun dedi. filter gibi bir sey vardi dedigimde de ".filter()" fonksiyonunu kullanabilirsin dedi.

  return res.redirect('back')//burada da filtrelemeyle ilgili bir seyler olacak. redirect yerine send olabilir
  //post olabilir, baska bir sey de olabilir. kesinlikle back olmayacak döndügü sey de.
  //döndügü sey, yani geri verdigi sey filtrelenmis geotaglar olacak. ona göre bir sey yazman lazim.
})




module.exports = router;
