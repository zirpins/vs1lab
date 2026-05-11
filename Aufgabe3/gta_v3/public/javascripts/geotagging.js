// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    const tlongitude = document.getElementById("tagging_longitude_input");
    const tlatitude = document.getElementById("tagging_latitude_input");
    const dlongitude = document.getElementById("discovery_longitude_input");
    const dlatitude = document.getElementById("discovery_latitude_input");

    if(!tlongitude.value && !tlatitude.value) {
        LocationHelper.findLocation(updateLocation);
    } else {
        updateMap(tlongitude.value, tlatitude.value);
    }
});

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
// ... your code here ...
function updateLocation(location) {
    const long = location.longitude;
    const lat = location.latitude;
    
    document.getElementById("tagging_longitude_input").value = long;
    document.getElementById("tagging_latitude_input").value = lat;
    document.getElementById("discovery_longitude_input").value = long;
    document.getElementById("discovery_latitude_input").value = lat;

    updateMap(long, lat);
}

function updateMap(long, lat) {
    const mapManager = new MapManager();

    mapManager.initMap(lat, long);

    const taglist_json = document.getElementById("map").dataset.tags;
    
    const taglist = JSON.parse(taglist_json);

    mapManager.updateMarkers(lat, long, taglist);

    const image = document.getElementById("mapView");
    image.remove();

    const placeholder = document.getElementById("mapPlaceholder");
    placeholder.remove();
}