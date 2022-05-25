// File origin: VS1LAB A2

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
// ... your code here ...
function updateLocation(){
    hid_long = document.getElementById("hidden_longitude").value;
    hid_lati = document.getElementById("hidden_latitude").value;
    
    if (hid_long === "null" && hid_lati === "null"){
        LocationHelper.findLocation(function(cback) {
            var latitude = cback.latitude;
            var longitude = cback.longitude;

            document.getElementById("latitude").value = latitude;
            document.getElementById("longitude").value = longitude;

            document.getElementById("hidden_latitude").value = latitude;
            document.getElementById("hidden_longitude").value= longitude;

            mapManager = new MapManager("NvYQsp2AmpFGtd0kG32v8GWb7edQ0Ygv");
            url = mapManager.getMapUrl(latitude, longitude);

            document.getElementById("mapView").src = url;
        });
    }
}
//INgE2DOxQWVpdxcCG5uywcOrMsY5J2Al Alex Key
// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {updateLocation();});