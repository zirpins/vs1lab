import { LocationHelper } from "./location-helper.js";
import { MapManager } from "./map-manager.js";


/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */

function updateLocation(tags = {}){
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

            var mapManager = new MapManager("jSDyDl8WcMaEG0bQrr55wCuOQmEbNjwy");
            document.getElementById("mapView").src = mapManager.getMapUrl(latitude, longitude, tags); // String in Array umwandeln und auf map anzeigen
        });   
    } else {
        latitude = document.getElementById("latitude").value;
        longitude = document.getElementById("longitude").value;
        var taglist_json = document.getElementById("mapView").dataset.tags;
        var mapManager = new MapManager("jSDyDl8WcMaEG0bQrr55wCuOQmEbNjwy");

        console.log("else---> " + latitude + " " + longitude);
        document.getElementById("mapView").src = mapManager.getMapUrl(latitude, longitude, tags);
    }


}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/api/geotags", {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
                // generate new taglist
                updateLocation(data.taglist);
            }
        )       .catch(error => console.error('Fehler:', error));
});

document.getElementById("addTag").addEventListener("click", () => {
    let latitude = document.getElementById("latitude").value;
    let longitude = document.getElementById("longitude").value;
    let name = document.getElementById("name").value;
    let hashtag = document.getElementById("hashtag").value;

    // validate
    let bool = true;
    try {
        bool =
                (latitude  === "" ? false :
                (longitude === "" ? false :
                (name      !== "" )));
        if (bool && hashtag.length !== 0){
            bool =
                (hashtag[0]     !== "#" ? false :
                (hashtag.length <=  10 && hashtag.length > 1));
        }
    } catch (e){
        bool = false;
    }

    // if data is valid
    if (bool) {
        let data = {
            "latitude": latitude,
            "longitude": longitude,
            "name": name,
            "hashtag": hashtag
        };

        console.log(data);
        fetch("http://localhost:3000/api/geotags", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        })
            .then(response => response.json())
            .then(data => {
                let s = "";
                for (let i = 0; i < data.taglist.length; i++){
                    s += "<li>" +
                        data.taglist[i].name + " (" +
                        data.taglist[i].latitude + ", " +
                        data.taglist[i].longitude + ") " +
                        data.taglist[i].hashtag +
                        "</li>";
                }
                document.getElementById("discoveryResults").innerHTML = s;
                document.getElementById("name").value = "";
                document.getElementById("hashtag").value = "";
                updateLocation(data.taglist);
            })
            .catch(error => console.error('Fehler:', error))
    }});

document.getElementById("searchSubmit").addEventListener("click", () => {
    let latitude = document.getElementById("latitudeSearch").value;
    let longitude = document.getElementById("longitudeSearch").value;
    let search = document.getElementById("searchField").value;

    let hashtag = search.includes("#");
    if (hashtag){
        search = search.slice(1);
    }

    let data = {
        "latitude": latitude,
        "longitude": longitude,
        "searchterm": search,
        "hashtag": hashtag
    };

    console.log(data);

    fetch("http://localhost:3000/api/geotags?q="+JSON.stringify(data), {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            // generate new taglist
            let s = "";
            for (let i = 0; i < data.taglist.length; i++){
                s += "<li>" +
                    data.taglist[i].name + " (" +
                    data.taglist[i].latitude + ", " +
                    data.taglist[i].longitude + ") " +
                    data.taglist[i].hashtag +
                    "</li>";
            }
            document.getElementById("discoveryResults").innerHTML = s;
            document.getElementById("searchField").value = "";
            updateLocation(data.taglist);
        }
)       .catch(error => console.error('Fehler:', error));
});