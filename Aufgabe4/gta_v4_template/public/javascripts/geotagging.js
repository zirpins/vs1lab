

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
            LocationHelper.findLocation(callback);
        }

        const mapManager = new MapManager();
        mapManager.initMap(lat, lon);
        mapManager.updateMarkers(lat, lon, geotags);
    });
}


/**
 * Display a success message at the top of the page.
 * @param {String} msg Message text to display
 * @param {Number} duration Duration in ms the message will be displayed for
 */
function showSuccessMessage(msg, duration = 5000) {
    let successMessageBox = document.getElementById("successMessage");
    successMessageBox.textContent = msg;
    successMessageBox.style.display = "block";
    setTimeout(() => successMessageBox.style.display = "none", duration);
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
        geotagList.replaceChildren(elem);
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
}

/**
 * Generate a MapQuest API URL and update the markup of the image element accordingly.
 * Flags to be shown on the map will be taken from the `data-tags` attribute on the image element.
 * @param {Number} latitude Latitude to center the map on
 * @param {Number} longitude Longitude to center the map on
 */
function renderMap(latitude, longitude) {
    let mm = new MapManager("sc6jpukJS5sAEagIHrhiRZpJuWexIsEQ");
    let imageElement = document.getElementById("mapView");
    imageElement.src = mm.getMapUrl(latitude, longitude, JSON.parse(imageElement.dataset.tags), 14);
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

    if (!response.ok)
        showErrorMessage("An error occurred while trying to add the GeoTag.");
    else
        showSuccessMessage("New GeoTag has been added.");

}

/**
 * Handle the discovery form
 */
async function handleDiscoveryForm(submitEvent) {
    submitEvent.preventDefault();
}



document.addEventListener("DOMContentLoaded", async () => {
    updateLocation();
    document.getElementById("tag-form").addEventListener("submit", handleTaggingForm);
    document.getElementById("discoveryFilterForm").addEventListener("submit", handleDiscoveryForm);
});

// https://github.com/Loigzorn/vs1lab/blob/master/Aufgabe4/gta_v4_template/public/javascripts/geotagging.js#L145