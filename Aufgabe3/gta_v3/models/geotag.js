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
    latitude;
    longitude;
    name;
    hashtag;
    constructor(lat, long, nm, ht){
        this.latitude = lat;
        this.longitude = long;
        this.name = nm;
        this.hashtag = ht;
    }
}

module.exports = GeoTag;
