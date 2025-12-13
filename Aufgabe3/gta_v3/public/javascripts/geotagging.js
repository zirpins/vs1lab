// File origin: VS1LAB A2

/* Imports */



/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */

function updateLocation() {
        let newLatitude = LocationHelper.latitude();
        let newLongtitude = LocationHelper.longitude();

        let longitude = document.getElementById("taggingLatitude").value;
        let latitude= document.getElementById("taggingLongitude").value;

        if (newLatitude != latitude && newLongtitude != longitude) {

            LocationHelper.findLocation((locationHelper) => {

                let longitude = locationHelper.longitude;
                let latitude = locationHelper.latitude;

                document.getElementById("taggingLatitude").value = latitude;
                document.getElementById("taggingLongitude").value = longitude;
                document.getElementById("discoveryLatitude").value = latitude;
                document.getElementById("discoveryLongitude").value = longitude;

                const mapManager = new MapManager();

                mapManager.initMap(latitude, longitude);
                mapManager.updateMarkers(latitude, longitude);
            });
        }
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("mapView").remove();
    document.getElementById("mapSpan").remove();
    updateLocation();
});