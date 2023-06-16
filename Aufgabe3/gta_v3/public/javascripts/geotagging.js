import { LocationHelper } from "./location-helper.js";
import { MapManager } from "./map-manager.js";


/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */

function updateLocation(){
    var latitude;
    var longitude;

    if(document.getElementById("latitude").value === undefined || document.getElementById("latitude").value === ""){
        LocationHelper.findLocation(function(helper) { //Callback funktion --> 
            document.getElementById("latitude").value = helper.latitude; // element Latitude wird gesucht und dannach wird value überschrieben mit helper latitude überschreieben
            document.getElementById("longitude").value = helper.longitude; // value von element Longitude

            document.getElementById("latitudeSearch").value = helper.latitude; //verstecktes Element im Search
            document.getElementById("longitudeSearch").value = helper.longitude; //verstecktes Element im Search

            latitude = helper.latitude;
            longitude = helper.longitude;

            console.log("if---> " + latitude + " " + longitude);
            var mapManager = new MapManager("jSDyDl8WcMaEG0bQrr55wCuOQmEbNjwy");
            var taglist_json = document.getElementById("mapView").dataset.tags; // tags werden aus der ejs datei ausgelesen
            document.getElementById("mapView").src = mapManager.getMapUrl(latitude, longitude, JSON.parse(taglist_json)); // String in Array umwandeln und auf map anzeigen
        });   
    } else {
        latitude = document.getElementById("latitude").value;
        longitude = document.getElementById("longitude").value;
        var taglist_json = document.getElementById("mapView").dataset.tags;
        var mapManager = new MapManager("jSDyDl8WcMaEG0bQrr55wCuOQmEbNjwy");

        console.log("else---> " + latitude + " " + longitude);
        document.getElementById("mapView").src = mapManager.getMapUrl(latitude, longitude, JSON.parse(taglist_json));
    }


}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    updateLocation();   
});