import { LocationHelper } from "./location-helper.js";
import { MapManager } from "./map-manager.js";


/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */

function updateLocation(tags = ""){
    /*
        Beim ersten Aufruf sollen Koordinaten ausgelesen werden und die Karte mit den entsprechenden tags
        gerendert werden.
     */
    if(tags === ""){ // Erster aufruf
        LocationHelper.findLocation(function(helper) { //Callback funktion --> 
            document.getElementById("latitude").value = helper.latitude; // element Latitude wird gesucht und dannach wird value überschrieben mit helper latitude überschreieben
            document.getElementById("longitude").value = helper.longitude; // value von element Longitude

            let latitude = helper.latitude;
            let longitude = helper.longitude;

            var mapManager = new MapManager("jSDyDl8WcMaEG0bQrr55wCuOQmEbNjwy");

            let data = GET_fetch_data(latitude, longitude) // Daten in JSON Datei schreiben
            fetch("http://localhost:3000/api/geotags?q="+JSON.stringify(data), {
                method: "GET"
            })
                .then(response => response.json())
                .then(data => {
                        document.getElementById("mapView").src = mapManager.getMapUrl(latitude, longitude, data.taglist); // String in Array umwandeln und auf map anzeigen
                    }
                )       .catch(error => console.error('Fehler:', error));
        });   
    } else { // falls latitude und longitude einmal berechnet wurden
        let latitude = document.getElementById("latitude").value;
        let longitude = document.getElementById("longitude").value;

        var mapManager = new MapManager("jSDyDl8WcMaEG0bQrr55wCuOQmEbNjwy");
        document.getElementById("mapView").src = mapManager.getMapUrl(latitude, longitude, tags); // String in Array umwandeln und auf map anzeigen
    }
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    updateLocation();
});

document.getElementById("addTag").addEventListener("click", () => {
    // Wenn "addTag" input angeklickt wird
    let latitude = document.getElementById("latitude").value;
    let longitude = document.getElementById("longitude").value;
    let name = document.getElementById("name").value;
    let hashtag = document.getElementById("hashtag").value;

    // validieren, ob alle Werte definiert sind und Hashtag entweder
    // leer ist oder mit einem Hashtag beginnt und maximal 10 Zeichen enthält.
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
        fetch("http://localhost:3000/api/geotags", { // Daten werden im Body übergeben
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        })
            .then(response => response.json())
            .then(data => {
                pasteFetchResults(data); // Fetch daten werden in HTML Elemente eingefügt
                document.getElementById("name").value = ""; // HTML input "name" wird geleert
                document.getElementById("hashtag").value = ""; // HTML input "hashtag" wird geleert
                updateLocation(data.taglist); // Map mit neuen Tags wird generiert
            })
            .catch(error => console.error('Fehler:', error))
    }});

document.getElementById("searchSubmit").addEventListener("click", () => {
    // Wenn "searchSubmit" input angeklickt wird
    let data = GET_fetch_data ()
    fetch("http://localhost:3000/api/geotags?q="+JSON.stringify(data), { // Daten werden als Queryparameter übergeben
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            // generate new taglist
            pasteFetchResults(data); // Fetch daten werden in HTML Elemente eingefügt
            document.getElementById("searchField").value = ""; // HTML input "searchField" wird geleert
            updateLocation(data.taglist); // Map mit neuen Tags wird generiert
        }
)       .catch(error => console.error('Fehler:', error));
});

function GET_fetch_data(latitude = "", longitude = ""){
    if (latitude === "" || latitude === ""){ // Falls latitude/longitude nicht gegeben sind, werden sie ausgelesen
        latitude = document.getElementById("latitude").value;
        longitude = document.getElementById("longitude").value;
    }
    let search = document.getElementById("searchField").value;


    /* Hashtags funktionieren bei der übergabe als Queryparameter nicht. Deshalb speichern wir in
    * der boolean Variable "hashtag", ob ein nach einem hashtag gesucht wird oder nicht. Dafür wird das
    * Hashtag aus dem "searchterm" gelöscht und nachher, nach der übermittlung wieder eingefügt.*/

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

    return data;
}

function pasteFetchResults(data){
    // Daten werden in "discoveryResults" gelistet
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
}