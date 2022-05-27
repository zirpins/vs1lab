// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");



/**
 * A class to help using the HTML5 Geolocation API.
 */
// eslint-disable-next-line no-unused-vars
/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
function updateLocation() {
    if (document.getElementById("latitude").getAttribute("value") === "" || document.getElementById("longitude").getAttribute("value") === ""){
        LocationHelper.findLocation(function (loc) {
            document.getElementById("hiddenLatitude").setAttribute("value", loc.latitude);
            document.getElementById("hiddemLongitude").setAttribute("value", loc.longitude);
            document.getElementById("latitude").setAttribute("value", loc.latitude);
            document.getElementById("longitude").setAttribute("value", loc.longitude);
            mapUpdate(loc.latitude, loc.longitude);
        });
    } else {
        let latitude = document.getElementById("latitude").getAttribute("value");
        let longitude = document.getElementById("longitude").getAttribute("value");
        mapUpdate(latitude, longitude);
    }
}
function mapUpdate(latitude, longitude) {
    let tags = JSON.parse(document.getElementById("map").getAttribute("data-tags"));
    var mapManager = new MapManager("6AB9OiZEGTfSzxH1j99rJ5gdz2NyKlGw"); 
    let url = mapManager.getMapUrl(latitude, longitude, tags, 10);
    document.getElementById("mapView").setAttribute("src", url);
}

document.addEventListener("DOMContentLoaded", updateLocation(), true);
