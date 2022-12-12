// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

    /**
     * The 'findLocation' method requests the current location details through the geolocation API.
     * It is a static method that should be used to obtain an instance of LocationHelper.
     * Throws an exception if the geolocation API is not available.
     * @param {*} callback a function that will be called with a LocationHelper instance as parameter, that has the current location details
     */
    static findLocation(callback) {
        const geoLocationApi = navigator.geolocation;

        if (!geoLocationApi) {
            throw new Error("The GeoLocation API is unavailable.");
        }

        // Call to the HTML5 geolocation API.
        // Takes a first callback function as argument that is called in case of success.
        // Second callback is optional for handling errors.
        // These callbacks are given as arrow function expressions.
        geoLocationApi.getCurrentPosition((location) => {
            // Create and initialize LocationHelper object.
            let helper = new LocationHelper();
            helper.#latitude = location.coords.latitude.toFixed(5);
            helper.#longitude = location.coords.longitude.toFixed(5);
            // Pass the locationHelper object to the callback.
            callback(helper);
        }, (error) => {
            alert(error.message)
        });
    }
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

        let map[] = JSON.parse(document.getElementById("mapView").src);

        document.getElementById("mapView").src= mapManager.getMapUrl(callbackValue.latitude, callbackValue.longitude, map);
    });
        }
}
/*
// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    updateLocation();

});*/
    document.addEventListener("DOMContentLoaded", updateLocation, true);