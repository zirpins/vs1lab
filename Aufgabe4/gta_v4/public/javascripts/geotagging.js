// File origin: VS1LAB A2

/* Imports */

import {MapManager} from "./map-manager.js";
import {LocationHelper} from "./location-helper.js";

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");
const mapManager = new MapManager();
const serverURL = "http://localhost:3000";
var taglist = [];
/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */

function updateLocation() {
        let newLatitude = LocationHelper.latitude;
        let newLongtitude = LocationHelper.longitude;

        let latitude = document.getElementById("taggingLatitude").value;
        let longitude = document.getElementById("taggingLongitude").value;

        if (newLatitude !== latitude || newLongtitude !== longitude) {

            LocationHelper.findLocation((locationHelper) => {
                longitude = locationHelper.longitude;
                latitude = locationHelper.latitude;

                document.getElementById("taggingLatitude").value = latitude;
                document.getElementById("taggingLongitude").value = longitude;
                document.getElementById("discoveryLatitude").value = latitude;
                document.getElementById("discoveryLongitude").value = longitude;
                mapManager.initMap(latitude, longitude);
                mapManager.updateMarkers(latitude, longitude);
            });

        }
}

async function submitNewTag() {
    const taggingLatitude = document.getElementById("taggingLatitude").value;
    const taggingLongitude = document.getElementById("taggingLongitude").value;
    const taggingName = document.getElementById("taggingName").value;
    const taggingHashtag = document.getElementById("taggingHashtag").value;
    let response = await fetch(serverURL + `/api/geotags`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            latitude: taggingLatitude,
            longitude: taggingLongitude,
            name: taggingName,
            hashtag: taggingHashtag
        })
    });
    response = await fetch(serverURL + response.headers.get("Location"));
    let newGeoTag = await response.json();
    taglist.push(newGeoTag);
    updateTags(taggingLatitude, taggingLongitude);
}


async function discovery() {
    const latitude = document.getElementById("discoveryLatitude").value;
    const longitude = document.getElementById("discoveryLongitude").value;
    const searchterm = document.getElementById("discoverySearch").value;
    const response = await fetch(serverURL + `/api/geotags?latitude=${latitude}&longitude=${longitude}&searchterm=${searchterm}`);
    taglist = await response.json();
    updateTags(latitude, longitude);
    }

function updateTags(latitude, longitude) {
    const uL =  document.getElementById("discoveryResults");
    const newUl = uL.cloneNode(false);
    taglist.forEach(element => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(`${element.name} (${element.latitude},${element.longitude}) ${element.hashtag}`));
        newUl.appendChild(li);
    });
    uL.parentNode.replaceChild(newUl,uL);
    mapManager.updateMarkers(latitude, longitude, taglist);
}
// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("mapView").remove();
    document.getElementById("mapSpan").remove();
    document.getElementById("discoveryFilterForm").addEventListener("submit", event => {
        event.preventDefault();
        discovery();
    });
    document.getElementById("tag-form").addEventListener("submit", event => {
        event.preventDefault();
        submitNewTag();
    });
    updateLocation();
});