// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console.
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

// The 'LocationHelper' and 'MapManager' classes have been moved to their own
// scripts ('location-helper.js' and 'map-manager.js'). They are loaded in the
// HTML page before this script, so they are available here.

/**
 * Read the geotags that the server attached to the map element.
 * The server serializes the current result list into the '#map' element's
 * 'data-tags' attribute as a JSON string. Here we read it back and turn it
 * into a JavaScript array of geotag objects again.
 * @returns {{name, latitude, longitude, hashtag}[]} the geotag objects (empty if none)
 */
const getTagsFromMap = () => {
    const mapElement = document.getElementById("map");
    const tagsJson = mapElement.dataset.tags;
    if (!tagsJson) {
        return [];
    }
    return JSON.parse(tagsJson);
};

/**
 * Render the map and write the coordinates into the form fields.
 * @param {string|number} latitude
 * @param {string|number} longitude
 */
const showPosition = (latitude, longitude) => {
    document.getElementById("latitude").value = latitude;
    document.getElementById("longitude").value = longitude;
    document.getElementById("search_latitude").value = latitude;
    document.getElementById("search_longitude").value = longitude;

    // Geotags from the current search result, delivered by the server.
    const tags = getTagsFromMap();

    const mapManager = new MapManager();
    mapManager.initMap(latitude, longitude);
    // Show a marker for the current location plus one for each result geotag.
    mapManager.updateMarkers(latitude, longitude, tags);
};

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 *
 * The coordinates are reused if they are already present in the form fields
 * (the server writes them back from the previous request). The GeoLocation API
 * is only queried when no coordinates are available yet.
 */
// ... your code here ...
const updateLocation = () => {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;

    if (latitude && longitude) {
        // Coordinates are already known, reuse them and skip the GeoLocation API.
        showPosition(latitude, longitude);
    } else {
        // No coordinates yet, query the GeoLocation API.
        LocationHelper.findLocation((locationHelper) => {
            showPosition(locationHelper.latitude, locationHelper.longitude);
        });
    }
};

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded, now updating location...");
    updateLocation();
});
