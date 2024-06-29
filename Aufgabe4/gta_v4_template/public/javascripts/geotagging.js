document.addEventListener("DOMContentLoaded", () => {
    const mapElement = document.getElementById("map");
    const tagsJson = mapElement.dataset.tags;
    const geotags = JSON.parse(tagsJson);

    const updateLocation = () => {
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
    };

    updateLocation();
});