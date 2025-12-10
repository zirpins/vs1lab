// File origin: VS1LAB A3

const GeoTag = require("./geotag");
const GeoTagExamples = require("./geotag-examples");

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */
class InMemoryGeoTagStore{
    #geoTags = [];

    constructor() {
        GeoTagExamples.tagList.forEach(element => {
            geoTag = new GeoTag(element[1], element[2],element[0], element[3]);
            this.#geoTags.push(this.#geoTags);
        });
    }

    addGeoTag(geoTag) {
        this.#geoTags.push(geoTag);
    }

    removeGeoTag(geoTag) {
        this.#geoTags = this.#geoTags.filter(gt => gt.getName() !== geoTag.getName());
    }

    getNearbyGeoTags(latitude, longitude) {
        const radius = 1;
        const nearbyGeoTags = [];


        this.#geoTags.forEach(element => {
            var latitudeDifference = element.getLatitude() - latitude;
            var longitudeDifference = element.getLongitude() - longitude;
            var distance = Math.sqrt(Math.pow(latitudeDifference, 2) + Math.pow(longitudeDifference, 2));

            if (distance <= radius) {
                nearbyGeoTags.push(element);
            }
        });
        return nearbyGeoTags;
    }

    searchNearbyGeoTags(keyword, latitude, longitude) {
        let nearbyGeoTags = this.getNearbyGeoTags(latitude, longitude);
        return nearbyGeoTags.filter(element => element.getName().includes(keyword) || element.getHashtag().includes(keyword));
    }
}

module.exports = InMemoryGeoTagStore
