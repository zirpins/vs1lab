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
    latitude = 0;
    longitude = 0;
    name = "";
    hashtag = "";

    constructor(lat, long, name, hash) {
        this.latitude = lat;
        this.longitude = long;
        this.name = name;
        this.hashtag = hash;
    }
}

module.exports = GeoTag;
