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
class LocationHelper {
    // Location values for latitude and longitude are private properties to protect them from changes.
    #latitude = '';

    /**
     * Getter method allows read access to privat location property.
     */
    get latitude() {
        return this.#latitude;
    }

    #longitude = '';

    get longitude() {
        return this.#longitude;
    }

    /**
     * The 'findLocation' method requests the current location details through the geolocation API.
     * It is a static method that should be used to obtain an instance of LocationHelper.
     * Throws an exception if the geolocation API is not available.
     * @param {*} callback a function that will be called with a LocationHelper instance as parameter, that has the current location details
     */
    static findLocation(callback) {
        const geoLocationApi = navigator.geolocation;

        if (!geoLocationApi) {
            throw new Error("The GeoLocation API is unavailable.");
        }

        // Call to the HTML5 geolocation API.
        // Takes a first callback function as argument that is called in case of success.
        // Second callback is optional for handling errors.
        // These callbacks are given as arrow function expressions.
        geoLocationApi.getCurrentPosition((location) => {
            // Create and initialize LocationHelper object.
            let helper = new LocationHelper();
            helper.#latitude = location.coords.latitude.toFixed(5);
            helper.#longitude = location.coords.longitude.toFixed(5);
            // Pass the locationHelper object to the callback.
            callback(helper);
        }, (error) => {
            alert(error.message)
        });
    }
}

/**
 * A class to help using the MapQuest map service.
 */
class MapManager {
    #apiKey = '';

    /**
     * Create a new MapManager instance.
     * @param {string} apiKey Your MapQuest API Key
     */
    constructor(apiKey) {
        this.#apiKey = apiKey;
    }

    /**
     * Generate a MapQuest image URL for the specified parameters.
     * @param {number} latitude The map center latitude
     * @param {number} longitude The map center longitude
     * @param {{latitude, longitude, name}[]} tags The map tags, defaults to just the current location
     * @param {number} zoom The map zoom, defaults to 10
     * @returns {string} URL of generated map
     */
    getMapUrl(latitude, longitude, tags = [], zoom = 10) {
        if (this.#apiKey === '') {
            console.log("No API key provided.");
            return "images/mapview.jpg";
        }

        let tagList = `${latitude},${longitude}|marker-start`;
        tagList += tags.reduce((acc, tag) => `${acc}||${tag.latitude},${tag.longitude}|flag-${tag.name}`, "");

        const mapQuestUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${this.#apiKey}&size=600,400&zoom=${zoom}&center=${latitude},${longitude}&locations=${tagList}`;
        console.log("Generated MapQuest URL:", mapQuestUrl);

        return mapQuestUrl;
    }
}

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
// ... your code here ...

function updateLocation() {
    LocationHelper.findLocation((location) => {
        // Zugriff auf die Eingabefelder des Tagging-Formulars
        let taggingLatitudeInput = document.getElementById('latitude');
        let taggingLongitudeInput = document.getElementById('longitude');

        // Überprüfung, ob die Eingabefelder vorhanden sind
        if (taggingLatitudeInput && taggingLongitudeInput) {
            // Aktualisieren der Eingabefeldwerte mit den Koordinaten
            taggingLatitudeInput.value = location.latitude;
            taggingLongitudeInput.value = location.longitude;
        }

        // Zugriff auf die versteckten Eingabefelder des Discovery-Formulars
        let discoveryLatitudeInput = document.getElementById('latitude-hidden');
        let discoveryLongitudeInput = document.getElementById('longitude-hidden');

        // Überprüfung, ob die versteckten Eingabefelder vorhanden sind
        if (discoveryLatitudeInput && discoveryLongitudeInput) {
            // Aktualisieren der Eingabefeldwerte mit den Koordinaten
            discoveryLatitudeInput.value = location.latitude;
            discoveryLongitudeInput.value = location.longitude;
        }
        const mapManager = new MapManager('7kGi1FF3n2jNRPac0JDJVAk84steZjnn');

        // Koordinaten abrufen und Karten-URL generieren
        const latitude = location.latitude;
        const longitude = location.longitude;
        const mapUrl = mapManager.getMapUrl(latitude, longitude);

        // Image-Element suchen und das src-Attribut aktualisieren
        const mapImage = document.getElementById('mapView');
        if (mapImage) {
            mapImage.src = mapUrl;
        }
    });
}
// Rufen Sie die 'updateLocation'-Funktion nach dem Laden des Dokuments automatisch auf
window.addEventListener("load", updateLocation);