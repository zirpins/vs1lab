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

const mapManager = new MapManager();

function updateLocation() {
    const mapElement = document.getElementById("map");
    const taglist_json = mapElement.getAttribute("data-tags");
    const geoTags = JSON.parse(taglist_json);

    const inputLat = document.getElementById("tagLat");
    const inputLong = document.getElementById("tagLong");

    if (inputLat.value !== "" && inputLong.value !== "") {
        
        const lat = parseFloat(inputLat.value);
        const long = parseFloat(inputLong.value);
            
        mapManager.initMap(geoTags[0].latitude, geoTags[0].longitude);
        mapManager.updateMarkers(lat, long, geoTags);

         const placeholderImg = document.getElementById("bild");
        if (placeholderImg) placeholderImg.remove();

        const mapSpan = document.querySelector("#map p");
        if (mapSpan) mapSpan.remove();

        document.getElementById("map").style.height = "500px";      
        return;
    }
        
    
        LocationHelper.findLocation((locationHelper) => {

        document.getElementById("tagLat").value = locationHelper.latitude
        document.getElementById("tagLong").value = locationHelper.longitude
        document.getElementById("tagLatHidden").value = locationHelper.latitude
        document.getElementById("tagLongHidden").value = locationHelper.longitude

        // Initialize the map
        mapManager.initMap(locationHelper.latitude, locationHelper.longitude);
        mapManager.updateMarkers(locationHelper.latitude, locationHelper.longitude, geoTags);
        
        const placeholderImg = document.getElementById("bild");
        if (placeholderImg) placeholderImg.remove();

        const mapSpan = document.querySelector("#map p");
        if (mapSpan) mapSpan.remove();

        document.getElementById("map").style.height = "500px";
        });
    
}
           
    


// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    updateLocation();
});
