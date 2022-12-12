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
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
function updateLocation() {
    if (document.getElementById("latitude").getAttribute("value" ) === "" ||
        document.getElementById("longitude").getAttribute("value")=== "" ) {
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

        })}
    else
        {
            let lat = document.getElementById("tagging_latitude").getAttribute("value");
            let long = document.getElementById("tagging_longitude").getAttribute("value");
            updateMap(lat, long);



        }
    }
    document.addEventListener("DOMContentLoaded", updateLocation, true);