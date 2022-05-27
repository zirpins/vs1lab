console.log("The geoTagging script is going to start...");

function updateLocation() {
    
    console.log("UpdateLocation started....................");

    if ((document.getElementById("tagLatitude").getAttribute("value") === "" ||
        document.getElementById("tagLongitude").getAttribute("value") === "")) {
        LocationHelper.findLocation(function (loc) {
            console.log("Locationhelper erfolgreich aufgerufen");

            document.getElementById("hiddenLatitude").setAttribute("value", loc.latitude);
            document.getElementById("hiddenLongitude").setAttribute("value", loc.longitude);
            document.getElementById("tagLatitude").setAttribute("value", loc.latitude);
            document.getElementById("tagLongitude").setAttribute("value", loc.longitude);
            mapUpdate(loc.latitude, loc.longitude);
        });
    } else {
        console.log("Ups etwas falsch gelaufen")
        let latitude = document.getElementById("tagLatitude").getAttribute("value");
        let longitude = document.getElementById("tagLongitude").getAttribute("value");
        mapUpdate(latitude, longitude);
    }

}
function mapUpdate(latitude, longitude) {
    let nearGeoTaglist = JSON.parse(document.getElementById("mapView").getAttribute("data-tags"));
    console.log(nearGeoTaglist);
    let mapManager = new MapManager("wHrycKHLTC49yJSmGzt7qkZRgdRfb1Gc");
    console.log(latitude);
    let mapUrl = mapManager.getMapUrl(latitude, longitude, nearGeoTaglist, 15);
    console.log(mapUrl);
    document.getElementById("mapView").setAttribute("src", mapUrl);
}
document.addEventListener("DOMContentLoaded", updateLocation(), true);