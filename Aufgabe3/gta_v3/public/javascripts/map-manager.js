// File origin: VS1LAB A2 

/**
 * A class to help using the MapQuest map service.
 */
// eslint-disable-next-line no-unused-vars
class MapManager {
    #apiKey;

    /**
     * Create a new MapManager instance
     * @param {string} apiKey Your MapQuest API Key
     */
    constructor(apiKey) {
        this.#apiKey = apiKey;
    }

    /**
     * Generate a MapQuest image URL for the specified parameters
     * @param {number} latitude The map center latitude
     * @param {number} longitude The map center longitude
     * @param {{latitude, longitude, name}[]} tags The map tags, defaults to just the current location
     * @param {number} zoom The map zoom, defaults to 15
     * @returns {string} URL of generated map
     */
    getMapUrl(latitude, longitude, tags = [], zoom = 15) {
        if (!this.#apiKey) {
            console.error("No API key provided.");
            return "images/mapview.jpg";
        }

        // Construct the center of the map
        const center = `${latitude},${longitude}`;

        // Create a marker for the client's location with a blue color
        const clientMarker = `marker-${latitude},${longitude}|marker-blue`;

        // Create markers for other locations
        const tagList = tags.map(tag => `${tag.Latitude},${tag.Longitude}|marker-${tag.Name}`).join('||');

        // Construct the MapQuest URL
        const mapQuestUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${this.#apiKey}&size=600,400&zoom=${zoom}&center=${center}&locations=${tagList}|${clientMarker}`;
        console.log("Generated MapQuest URL:", mapQuestUrl);

        return mapQuestUrl;
    }
}
