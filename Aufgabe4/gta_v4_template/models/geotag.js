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
    id=0;

    constructor(lat, long, name, hash, id) {
        this.latitude = lat;
        this.longitude = long;
        this.name = name;
        this.hashtag = hash;
        this.id = id;
    }
}

module.exports = GeoTag;
