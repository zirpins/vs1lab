// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/** * 
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
class GeoTag {
    id;
    longitude;
    latitude;
    name;
    hashtag;

    constructor(latitude, longitude, name, hashtag) {
        // GeoTags in the GeoTagStore should never have the default ID of -1
        this.id = -1;
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.hashtag = hashtag;
    }
}

module.exports = GeoTag;