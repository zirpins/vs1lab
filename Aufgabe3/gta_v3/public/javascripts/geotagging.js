


function updateLocation() {
    LocationHelper.findLocation((locationHelper) => {
        const lat = locationHelper.latitude;
        const lon = locationHelper.longitude;
        
        document.getElementById("tagging-lat").value = lat;
        document.getElementById("tagging-lon").value = lon;

        document.getElementById("tagging-lath").value = lat; // versteckte eingaben
        document.getElementById("tagging-lonh").value = lon; 
        //mapManager.initMap(lat, lon);
        //mapManager.updateMarkers(lat, lon, []); 

        //var mm = L.map('mapView', {center: [lat, lon],zoom: 13});
        //L.marker([lat, lon]).addTo(mm);

        const mapp = new MapManager;

        mapp.initMap(lat,lon);
        mapp.updateMarkers(lat,lon);
        //finder methode und remove
        const mapViewImg = document.getElementById("mapView");
        const resultSpan = document.getElementById('.discovery__map span');
        if (mapViewImg) {
            mapViewImg.remove();
        }
        if (resultSpan) {
            resultSpan.remove();
        }
    });
}



// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    updateLocation();
});