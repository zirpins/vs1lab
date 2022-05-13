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
    #name = "";
    #latitude = 0;
    #longitude = 0;
    #hashtag = "";

    constructor(name, latitude, longitude, hashtag) {
        this.#name = name;
        this.#latitude = latitude;
        this.#longitude = longitude;
        this.#hashtag = hashtag;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get latitude() {
        return this.#latitude;
    }

    set latitude(latitude) {
        this.#latitude = latitude;
    }

    get longitude() {
        return this.#longitude;
    }

    set longitude(longitude) {
        this.#longitude = longitude;
    }

    get hashtag() {
        return this.#hashtag;
    }

    set hashtag(hashtag) {
        this.#hashtag = hashtag;
    }
}

module.exports = GeoTag;
