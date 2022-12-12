// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...



console.log("The geoTagging script is going to start...");

function updateMap(lat, long) {
    let nearTaglist = JSON.parse(document.getElementById("mapView").getAttribute("data-tags"));
    let mapManager = new MapManager("1B01AJ2nIgqKzmdYXhvgQbCVZltB6csW");
    let mapUrl = mapManager.getMapUrl(lat, long, nearTaglist);
    document.getElementById("mapView").setAttribute("src", mapUrl);
}




/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
    function updateLocation() {
        if(document.getElementById("latitude").value === null || document.getElementById("longitude").value === null) {
    LocationHelper.findLocation(function (callbackValue) {
        //Tagging
        document.getElementById("latitude").value = callbackValue.latitude;
        document.getElementById("longitude").value = callbackValue.longitude;
        //Discovery
        document.getElementById("latitudeZahl").value = callbackValue.latitude;
        document.getElementById("longitudeZahl").value = callbackValue.longitude;
        var mapManager = new MapManager("Gw7bY1FFm0uj813p5gaSZroP4lGKROBs");



        document.getElementById("mapView").src= mapManager.getMapUrl(callbackValue.latitude, callbackValue.longitude, map);
    });
        }
}
document.addEventListener("DOMContentLoaded", updateLocation, true);