// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

/**
 * A class to help using the HTML5 Geolocation API.
 */
// eslint-disable-next-line no-unused-vars
/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
var updateLocation = function(){
    try{
    var latitudeInput = document.getElementById("latitude");
    var longitudeInput = document.getElementById("longitude");
    var hiddenLatitude = document.getElementById("hiddenLatitude");
    var hiddenLongitude = document.getElementById("hiddenLongitude");
    
    var latitudeValue;
    var longitudeValue;

    if((latitudeInput.getAttribute("value").startsWith("//") && longitudeInput.getAttribute("value").startsWith("//")))
    {   
        LocationHelper.findLocation(function(loc) {
            latitudeValue = loc.latitude;
            longitudeValue = loc.longitude;
            latitudeInput.setAttribute("value", latitudeValue);
            longitudeInput.setAttribute("value", longitudeValue);
            hiddenLatitude.setAttribute("value", latitudeValue);
            hiddenLongitude.setAttribute("value", longitudeValue);
            
            var image = document.getElementById("mapView");
            var mapManager = new MapManager("6AB9OiZEGTfSzxH1j99rJ5gdz2NyKlGw");   
            var map = document.getElementById("mapView");
            var tags = JSON.parse(map.getAttribute("data-tags"));
            console.log(tags);           
            var url = mapManager.getMapUrl(latitudeValue,longitudeValue, tags,10);
            
            image.setAttribute("src",url);            
        });
    }else
    {
        latitudeValue = latitudeInput.value;
        longitudeValue = longitudeInput.value;
        
        var mapManager = new MapManager("6AB9OiZEGTfSzxH1j99rJ5gdz2NyKlGw");     
        var map = document.getElementById("mapView");
        var tags = JSON.parse(map.getAttribute("data-tags"));
        url = mapManager.getMapUrl(latitudeValue,longitudeValue, tags,10);
        var image = document.getElementById("mapView");
        image.setAttribute("src",url);            

    }

    } catch(error){
    alert(error);     
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateLocation();
});
