// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...


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

/*Fetch*/
async function postAdd(geotag){
    let res = await fetch("http://localhost:3000/geotags",{
        methode:"POST",
        headers: {"Conetent-Type": "application/json"},
        body: Json.stringify(geotag),

    });
    return await res.jscon();

}

async function getTagList(searchTerm){
    let geoTag = await fetch("http://localhost:3000/geotags" + searchTerm);
    console.log()
    geoTag = await geoTag.json();
    geoTag = JSON.parse(geoTag);

    let latitude = geoTag.location.latitude;
    let longitude = geoTag.location.longitude;
    let res = await fetch("http://localhost:3000/api/geotags?latitude=" + latitude + "&longitude=" + longitude + "&searchterm=" + searchTerm);
    return await res.json();
}



/*Event Listener*/

document.getElementById("tagging_button").addEventListener("submit", function (event){
    event.preventDefault();
)}

document.getElementById("discovery_button").addEventListener("submit", function (event){
    event.preventDefault();
)}

document.addEventListener("DOMContentLoaded", updateLocation, true);