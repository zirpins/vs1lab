
// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */


function callback(location) {
    document.getElementById("tagging-lat").value = location.latitude;
    document.getElementById("tagging-lon").value = location.longitude;
    document.getElementById("discovery-lat").value = location.latitude;
    document.getElementById("discovery-lon").value = location.longitude;

    renderMap(location.latitude, location.longitude);
}

function updateLocation() {
    const mapElement = document.getElementById("map");
    const tagsJson = mapElement.dataset.tags;
    const geotags = JSON.parse(tagsJson);
    LocationHelper.findLocation((locationHelper) => {
        const lat = locationHelper.latitude;
        const lon = locationHelper.longitude;

        document.getElementById("tagging-lat").value = lat;
        document.getElementById("tagging-lon").value = lon;
        document.getElementById("tagging-lath").value = lat; // hidden inputs
        document.getElementById("tagging-lonh").value = lon;

        if (lat === undefined || lat === "" || lat === "0") {
            console.log("Geolocating device...")
            LocationHelper.findLocation(callback);6
        }
        const mapManager = new MapManager();
        mapManager.initMap(lat, lon);
        mapManager.updateMarkers(lat, lon, geotags);
        renderGeotags(taglist, mapManager);
    });
}






/**
 * Create a list element for each Geotag in `taglist` and add it to the markup.
 * Then, initiate a map update to display flags for all the Geotags in `taglist`.
 * @param {Array} taglist JSON list of Geotags to display
 */
function renderGeotags(taglist) {
    const geotagList = document.getElementById("discoveryResults");
    if (taglist.length == 0) {
        // Handle an empty taglist (= no search results)
        let elem = document.createElement("li");
        elem.innerHTML = "No results.";
    } else {
        // Populate result list
        geotagList.replaceChildren(...taglist.map(geotag => {
            let listElement = document.createElement("li");
            listElement.innerHTML = `${geotag.name} (${geotag.latitude}, ${geotag.longitude}) ${geotag.hashtag})`;
            return listElement;
        }));
    }
    // Populate image element data-* tag
    document.getElementById("mapView").dataset.tags = JSON.stringify(taglist);
    renderMap(...updateLocation())
    mapManager.updateMarkers(lat, lon, taglist);
    renderMap(lat, lon);
}



/**
 * POST the content of the tagging form to the server, then show a success/error message
 * depending on the response.
 */
async function handleTaggingForm(submitEvent) {
    submitEvent.preventDefault();
    const response = await fetch("/api/geotags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            latitude: document.getElementById("tagging-lat").value,
            longitude: document.getElementById("tagging-lon").value,
            name: document.getElementById("tagging-name").value,
            hashtag: document.getElementById("tagging-tags").value
        })
    });

    
    updateLocation();
}

/**
 * Handle the discovery form
 */
async function handleDiscoveryForm(submitEvent) {
    submitEvent.preventDefault();
    updateLocation();
}

/**
 * Fetch Geotags for and display a result page. Location and search term will be taken from the DOM.
 * Also update the pagination buttons, and disable them when necessary.
 * @param {Number} pageNumber Result page to load, starting at 0
 * @param {Boolean} isNewQuery Wether to recalculate the total number of result pages
 */
async function loadGeotags() {
    
    updateLocation();
}

document.addEventListener("DOMContentLoaded", async () => {
    updateLocation();
    document.getElementById("tag-form").addEventListener("submit", handleTaggingForm);
    document.getElementById("discoveryFilterForm").addEventListener("submit", handleDiscoveryForm);
    updateLocation();
});

// https://github.com/Loigzorn/vs1lab/blob/master/Aufgabe4/gta_v4_template/public/javascripts/geotagging.js#L145