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
//########## findLocation wird nur noch aufgerufen, wenn lat und long felder '' sind
function updateLocation() {
    //Todo: call LocationHelper.findLocation only when coord doesn't exist yet
    const lat = document.getElementById("lat").value
    const long = document.getElementById("long").value
    if (lat !== '' && long !== '') {
        console.log(lat)
        mapUpdate(lat, long)
    } else {
        LocationHelper.findLocation((helper) => {
            document.getElementById("lat").value = helper.latitude
            document.getElementById("long").value = helper.longitude
            document.getElementById("latHidden").value = helper.latitude
            document.getElementById("longHidden").value = helper.longitude
            mapUpdate(helper.latitude, helper.longitude)
        })
    }
}

function mapUpdate(lat, long) {
    const mapManager = new MapManager('Ikx9sjyYJtIj09QQ4NPE7j8NVIjyFY0F')

    const tags = JSON.parse(document.getElementById('mapView').dataset.tags)
    const mapUrl = mapManager.getMapUrl(lat, long, tags, 13)
    const mapView = document.getElementById("mapView")
    mapView.src = mapUrl

}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    // alert("Please change the script 'geotagging.js'");
    updateLocation()
});