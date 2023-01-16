// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...

console.log("The geoTagging script is going to start...");

function updateMap(lat, long) {
    let nearTaglist = JSON.parse(document.getElementById("mapView").getAttribute("data-tags"));
    let mapManager = new MapManager("Gw7bY1FFm0uj813p5gaSZroP4lGKROBs");
    let mapUrl = mapManager.getMapUrl(lat, long, nearTaglist);
    document.getElementById("mapView").setAttribute("src", mapUrl);
}

function getUpdateMap(geotags) {
    let mapManager = new MapManager("Gw7bY1FFm0uj813p5gaSZroP4lGKROBs");
    let lat = parseFloat(document.getElementById("latitude").getAttribute("value"));
    let long = parseFloat(document.getElementById("longitude").getAttribute("value"));
    let mapUrl = mapManager.getMapUrl(lat, long, JSON.parse(geotags));
    document.getElementById("mapView").setAttribute("src", mapUrl);
    return geotags;
}

/**
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
function updateLocation() {
    if (document.getElementById("latitude").getAttribute("value") === "" ||
        document.getElementById("longitude").getAttribute("value") === "") {

        LocationHelper.findLocation(function (locationHelper) {
            document.getElementById("latitudeZahl")
                .setAttribute("value", locationHelper.latitude);
            document.getElementById("latitude")
                .setAttribute("value", locationHelper.latitude);
            document.getElementById("longitudeZahl")
                .setAttribute("value", locationHelper.longitude);
            document.getElementById("longitude")
                .setAttribute("value", locationHelper.longitude);
            updateMap(locationHelper.latitude, locationHelper.longitude);
        })
    } else {
        let lat = document.getElementById("latitude").getAttribute("value");
        let long = document.getElementById("longitude").getAttribute("value");
        updateMap(lat, long);
    }
}

//Fetch fuer discovery
async function getTagList(searchTerm){
    let lat =document.getElementById("latitudeZahl").getAttribute("value");
    let long = document.getElementById("longitudeZahl").getAttribute("value");
    let geoTags = await fetch("http://localhost:3000/api/geotags?lat=" + lat +"&long=" + long + "&search=" + searchTerm);
//TODO: Discovery funk. nicht ganz
    //keine Ahnung was da nicht geht
    console.log(geoTags);
    return await geoTags.body;
}

async function postAdd(newGeotag){
    console.log(newGeotag);
    let response = await fetch("http://localhost:3000/api/geotags", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newGeotag),
    });
    return await response.json();
}



function updateList(geoliste) {
    let list = JSON.parse(geoliste); // parse input string to json

    let lat = parseFloat(document.getElementById("latitude").getAttribute("value"));
    let long = parseFloat(document.getElementById("longitude").getAttribute("value"));

    let ul = document.getElementById("discoveryResults");
    ul.innerHTML = "";
    // loop through the list of geotag elements and create a list entry for each
    list.forEach(function (gtag){
        console.log(gtag);
        let li = document.createElement("li");
        li.innerHTML = gtag.name + "</br> (" + lat + "," + long + ") </br>" + gtag.hashtag;
        li.classList.add("listElement");
        ul.appendChild(li);
    })
}

document.addEventListener("DOMContentLoaded", function () {
    updateLocation();

    /*Event Listener TaggingButton*/
    document.getElementById("tag-form").addEventListener("submit", async function (event) {
        let newgeoTag = {
            name: document.getElementById("name").value,
            latitude: parseFloat(this.getElementById("latitude").value),
            longitude: parseFloat(document.getElementById("longitude").value),
            hashtag: document.getElementById("Hashtag").value
        }
        console.log(newgeoTag.latitude + newgeoTag.longitude + newgeoTag.name + newgeoTag.hashtag);
        postAdd(newgeoTag).then(getUpdateMap).then(updateList).catch(error => console.error(error));
        event.preventDefault();
    });


    /*Event Listener DiscoveryButton*/
    document.getElementById("discoveryFilterForm").addEventListener("submit", function (event) {
        let searchTerm = document.getElementById("discoveryText").value;
        getTagList(searchTerm).then(getUpdateMap).then(updateList).catch(error => console.error(error));
        event.preventDefault();
    });

});