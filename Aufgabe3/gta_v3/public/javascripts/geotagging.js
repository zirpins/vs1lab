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
function updateLocation() {
    // Fetch existing coordinates from hidden fields
    const latField = document.getElementById('lat');
    const lonField = document.getElementById('lon');
    const latitude = latField.value;
    const longitude = lonField.value;

    // Check if valid coordinates are already available
    if (latitude && longitude) {
        // Use existing coordinates for map and update hidden fields
        const hiddenLatField = document.getElementById('lat_hidden');
        const hiddenLonField = document.getElementById('lon_hidden');
        hiddenLatField.value = latitude;
        hiddenLonField.value = longitude;

        const mapManager = new MapManager('urzLls1AwR1SUp0lsMiK6OwpoBB0Dy3b');
        const mapUpdate = mapManager.getMapUrl(latitude, longitude);
        document.getElementById("mapView").src = mapUpdate;
    } else {
        // No valid coordinates, use Geolocation API
        LocationHelper.findLocation((location) => {
            latField.value = location.latitude;
            lonField.value = location.longitude;

            const hiddenLatField = document.getElementById('lat_hidden');
            const hiddenLonField = document.getElementById('lon_hidden');
            hiddenLatField.value = location.latitude;
            hiddenLonField.value = location.longitude;

            const mapManager = new MapManager('urzLls1AwR1SUp0lsMiK6OwpoBB0Dy3b');
            const mapUpdate = mapManager.getMapUrl(location.latitude, location.longitude);
            document.getElementById("mapView").src = mapUpdate;
        });
    }
}
// function updateLocation() {
//     LocationHelper.findLocation((location) => {
//
//         const latitude = location.latitude;
//         const longitude = location.longitude;
//
//         const latField = document.getElementById('lat');
//         const lonField = document.getElementById('lon');
//         latField.value = latitude;
//         lonField.value = longitude;
//
//         const hiddenLatField = document.getElementById('lat_hidden');
//         const hiddenLonField = document.getElementById('lon_hidden');
//         hiddenLatField.value = latitude;
//         hiddenLonField.value = longitude;
//
//         const mapManager = new MapManager('urzLls1AwR1SUp0lsMiK6OwpoBB0Dy3b');
//         var mapUpdate = mapManager.getMapUrl(latitude, longitude);
//         document.getElementById("mapView").src = mapUpdate;
//
//     });
// }
window.addEventListener('load', updateLocation);

document.addEventListener("DOMContentLoaded", () => {
    alert("You'll have to allow location access for this website to run smoothly!");
});

