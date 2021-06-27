/* Dieses Skript wird ausgeführt, wenn der Browser index.html lädt. */

// Befehle werden sequenziell abgearbeitet ...

/**
 * "console.log" schreibt auf die Konsole des Browsers
 * Das Konsolenfenster muss im Browser explizit geöffnet werden.
 */
console.log("The script is going to start...");

// Es folgen einige Deklarationen, die aber noch nicht ausgeführt werden ...

// Hier wird die verwendete API für Geolocations gewählt
// Die folgende Deklaration ist ein 'Mockup', das immer funktioniert und eine fixe Position liefert.
GEOLOCATIONAPI = {
    getCurrentPosition: function(onsuccess) {
        onsuccess({
            "coords": {
                "latitude": 49.013790,
                "longitude": 8.390071,
                "altitude": null,
                "accuracy": 39,
                "altitudeAccuracy": null,
                "heading": null,
                "speed": null
            },
            "timestamp": 1540282332239
        });
    }
};

// Die echte API ist diese.
// Falls es damit Probleme gibt, kommentieren Sie die Zeile aus.
GEOLOCATIONAPI = navigator.geolocation;

/**
 * GeoTagApp Locator Modul
 */
var gtaLocator = (function GtaLocator(geoLocationApi) {

    // Private Member

    /**
     * Funktion spricht Geolocation API an.
     * Bei Erfolg Callback 'onsuccess' mit Position.
     * Bei Fehler Callback 'onerror' mit Meldung.
     * Callback Funktionen als Parameter übergeben.
     */
    var tryLocate = function(onsuccess, onerror) {
        if (geoLocationApi) {
            geoLocationApi.getCurrentPosition(onsuccess, function(error) {
                var msg;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        msg = "User denied the request for Geolocation.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        msg = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        msg = "The request to get user location timed out.";
                        break;
                    case error.UNKNOWN_ERROR:
                        msg = "An unknown error occurred.";
                        break;
                }
                onerror(msg);
            });
        } else {
            onerror("Geolocation is not supported by this browser.");
        }
    };

    // Auslesen Breitengrad aus der Position
    var getLatitude = function(position) {
        return position.coords.latitude;
    };

    // Auslesen Längengrad aus Position
    var getLongitude = function(position) {
        return position.coords.longitude;
    };
    var getTagList = function() {
        var resultImg = document.getElementById("result-img")
        if (resultImg.hasAttribute("data-tags")){
            return JSON.parse(document.getElementById("result-img").dataset.tags);
        } else{
            return undefined;
        }
    };

    var errorfunction = function(msg){
        alert(msg);
    };

    var successfunction = function(position){
        console.log("test")

        var latitude = getLatitude(position);
        var longitude = getLongitude(position);

        document.getElementById("latitude").value = latitude;
        document.getElementById("longitude").value = longitude;

        document.getElementById("hidden_latitude").value = latitude;
        document.getElementById("hidden_longitude").value = longitude;

        var returnurl = getLocationMapSrc(latitude, longitude);

        document.getElementById("result-img").src = returnurl;
    };

    // Hier API Key eintragen
    var apiKey = "WyTOAGC8RouyGOGbw2xVhAu0LROqFucO";

    /**
     * Funktion erzeugt eine URL, die auf die Karte verweist.
     * Falls die Karte geladen werden soll, muss oben ein API Key angegeben
     * sein.
     *
     * lat, lon : aktuelle Koordinaten (hier zentriert die Karte)
     * tags : Array mit Geotag Objekten, das auch leer bleiben kann
     * zoom: Zoomfaktor der Karte
     */
    var getLocationMapSrc = function(lat, lon, tags, zoom) {
        zoom = typeof zoom !== 'undefined' ? zoom : 10;

        if (apiKey === "YOUR_API_KEY_HERE") {
            console.log("No API key provided.");
            return "images/mapview.jpg";
        }

        var tagList = "&pois=You," + lat + "," + lon;
        if (tags !== undefined) tags.forEach(function(tag) {
            tagList += "|" + tag.name + "," + tag.latitude + "," + tag.longitude;
        });

        var urlString = "https://www.mapquestapi.com/staticmap/v4/getmap?key=" +
            apiKey + "&size=600,400&zoom=" + zoom + "&center=" + lat + "," + lon + "&" + tagList;

        console.log("Generated Maps Url: " + urlString);
        return urlString;
    };

    return { // Start öffentlicher Teil des Moduls ...

        // Public Member

        readme: "Dieses Objekt enthält 'öffentliche' Teile des Moduls.",

        updateLocation: function(tagList) {
            const latitudeElement = document.getElementById('latitude')
            const longitudeElement = document.getElementById('longitude')
            const hiddenLatitude = document.getElementById('hidden_latitude')
            const hiddenLongitude = document.getElementById('hidden_longitude')
            if ((latitudeElement.value === "") ||
                (longitudeElement.value === "") ||
                (hiddenLatitude.value === "") ||
                (hiddenLongitude.value === "")){
                tryLocate(successfunction, errorfunction);
            }
            else {
                var latitude = document.getElementById("latitude").value;
                var longitude = document.getElementById("longitude").value;
                var returnurl = getLocationMapSrc(latitude, longitude, tagList);
                document.getElementById("result-img").src = returnurl;
            }
        }
    }; // ... Ende öffentlicher Teil
})(GEOLOCATIONAPI);

/**
 * $(function(){...}) wartet, bis die Seite komplett geladen wurde. Dann wird die
 * angegebene Funktion aufgerufen. An dieser Stelle beginnt die eigentliche Arbeit
 * des Skripts.
 */

function Geotag(latitude, longitude, name, hashtag){
    this.latitude = latitude;
    this.longitude = longitude;
    this.name = name;
    this.hashtag = hashtag;
}

function updatetagList(tagList) {
    var ul = document.getElementById("results");
    ul.innerHTML="";
    gtaLocator.updateLocation(tagList);
    console.log("Test:" + tagList);
    tagList.forEach(function (tag) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(tag.name+ " (" + tag.latitude + ", " + tag.longitude + ") " + tag.hashtag));
        ul.appendChild(li);
        gtaLocator.updateLocation(tagList);
    });
}

$(function() {
    gtaLocator.updateLocation();



    let tagformButton = document.getElementById("submit");
    tagformButton.addEventListener("click", function (event) {
        event.preventDefault();

        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState===4) {
                var tagList = JSON.parse(ajax.responseText);
                console.log("UpdateTaglist: " + tagList);

                updatetagList(tagList);
            }
        }

        let latitude = document.getElementById("latitude").value;
        let longitude = document.getElementById("longitude").value;
        let name = document.getElementById("name").value;
        let hashtag = document.getElementById("hashtag").value;
        document.getElementById("name").value = "";
        document.getElementById("hashtag").value = "";


        let post = new Geotag(latitude, longitude, name, hashtag);


        ajax.open("POST", "/geotags", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        console.log("geotags" + JSON.stringify(post));
        ajax.send(JSON.stringify(post));

    }, true);

    let filterformButton = document.getElementById("apply");
    filterformButton.addEventListener("click", function (event) {
        event.preventDefault();

        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState===4) {
                let tagList = JSON.parse(ajax.responseText);
                console.log("UpdateTaglist: " + tagList);

                updatetagList(tagList);
            }
        }
        var searchterm = document.getElementById("search").value;
        document.getElementById("search").value="";
        if(searchterm.charAt(0)==="#"){
            searchterm = searchterm.substring(1);
            searchterm = "%" + searchterm;
        }
        var params = "search=" + searchterm +
            "&latitude=" + document.getElementById("hidden_latitude").value +
            "&longitude=" + document.getElementById("hidden_longitude").value;
        ajax.open("GET", "/geotags?" + params, true);
        ajax.send();
    }, true);
});


