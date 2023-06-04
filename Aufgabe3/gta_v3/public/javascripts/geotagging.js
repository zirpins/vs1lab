import { LocationHelper } from "./location-helper.js";
import { MapManager } from "./map-manager.js";


/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */

function updateLocation(){
    var value = document.getElementById("latitude").value;
    if(value === ""){
        LocationHelper.findLocation(function(helper) { //Callback funktion --> 
            document.getElementById("latitude").value = helper.latitude; // element Latitude wird gesucht und dannach wird value überschrieben mit helper latitude überschreieben
            document.getElementById("longitude").value = helper.longitude; // value von element Longitude

            document.getElementById("longitudeSearch").value = helper.latitude; //verstecktes Element im Search 
            document.getElementById("latitudeSearch").value = helper.longitude; //verstecktes Element im Search 
            var mapManager = new MapManager("jSDyDl8WcMaEG0bQrr55wCuOQmEbNjwy");

            var taglist_json = document.getElementById("mapView").dataset.tags;
            document.getElementById("mapView").src = mapManager.getMapUrl(helper.latitude, helper.longitude, JSON.parse(taglist_json));
        });   
    }
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    updateLocation();   
});