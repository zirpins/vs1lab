// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
const GeoTag = require("../../models/geotag");

console.log("The geoTagging script is going to start...");

function updateMap(lat, long) {
    let nearTaglist = JSON.parse(document.getElementById("mapView").getAttribute("data-tags"));
    let mapManager = new MapManager("Gw7bY1FFm0uj813p5gaSZroP4lGKROBs");
    let mapUrl = mapManager.getMapUrl(lat, long, nearTaglist);
    document.getElementById("mapView").setAttribute("src", mapUrl);
}


/**
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
function updateLocation() {
    if (document.getElementById("latitude").getAttribute("value") === "" ||
        document.getElementById("longitude").getAttribute("value") === "") {

        LocationHelper.findLocation(function (locationHelper) {
            document.getElementById("latitudeZahl")
                .setAttribute("value", locationHelper.latitude);
            document.getElementById("latitude")
                .setAttribute("value", locationHelper.latitude);
            document.getElementById("longitudeZahl")
                .setAttribute("value", locationHelper.longitude);
            document.getElementById("longitude")
                .setAttribute("value", locationHelper.longitude);
            updateMap(locationHelper.latitude, locationHelper.longitude);
        })
    } else {
        let lat = document.getElementById("latitude").getAttribute("value");
        let long = document.getElementById("longitude").getAttribute("value");
        updateMap(lat, long);
    }
}

/*Fetch Tagging*/
async function postAdd(newGeotag){
    let res = await fetch("http://localhost:3000/geotags",{
        methode:"POST",
        headers: {"Content-Type": "application/json"},
        body: Json.stringify(newGeotag),
    });
    return await res.json();
}

//Fetch fuer discovery
async function getTagList(searchTerm){
    let geoTags = await fetch("http://localhost:3000/geotags" + searchTerm, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    });

    let latitude = geoTag.location.latitude;
    let longitude = geoTag.location.longitude;
    //Aufruf der Route mit allen Paramtern
    geoTags = await fetch("http://localhost:3000/api/geotags?latitude=" + latitude + "&longitude=" + longitude + "&searchterm=" + searchTerm);
    return await geoTags.json();
}

/*Event Listener TaggingButton*/
document.getElementById("tagging_button").addEventListener("submit", function (event){
        event.preventDefault();
        let Latitude = document.getElementById("latitude").getAttribute("value");
        let logitude = document.getElementById("longitude").getAttribute("value");
        let name =  document.getElementById("name").getAttribute("value");
        let hash = document.getElementById("Hashtag").getAttribute("value");//Todo: id Fragezeichen
        let newgeoTag =  new GeoTag(Latitude, logitude, name, hash);

        postAdd(newgeoTag).then(updateList).then(response => response.json()).catch(error => console.error("Fehler"));
    }
)}

/*Event Listener DiscoveryButton*/
document.getElementById("discovery_button").addEventListener("submit", function (event){
    event.preventDefault();
    let searchTerm = document.getElementById("discoveryText").value;
    getTagList(searchTerm).then(updateList).then(updateMap).catch(error => alert("Search Term doen't exist"));
)}

function updateList(geoliste) {
    let actualTaglist = JSON.parse(geoliste);
    return parseInt(document.getElementById("discoveryResults").innerHTML);
}

document.addEventListener("DOMContentLoaded", updateLocation);