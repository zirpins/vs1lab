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
            let geoTag = new GeoTag(element[1], element[2],element[0], element[3]);
            this.#geoTags.push(geoTag);
        });
    }

    addGeoTag(geoTag) {
        this.#geoTags.push(geoTag);
    }

    removeGeoTag(geoTag) {
        this.#geoTags = this.#geoTags.filter(gt => gt.getName() !== geoTag.getName());
    }

    getNearbyGeoTags(latitude, longitude) {
        const radius = 10;
        let nearbyGeoTags = [];


        this.#geoTags.forEach(element => {
            if (this.haversineDistance(latitude, longitude, element.getLatitude(), element.getLongitude()) <= radius) nearbyGeoTags.push(element);
        });
        return nearbyGeoTags;
    }

    searchNearbyGeoTags(keyword, latitude, longitude) {
        let nearbyGeoTags = this.getNearbyGeoTags(latitude, longitude);
        if (!keyword) return nearbyGeoTags;
        keyword = keyword.toLowerCase();

        return nearbyGeoTags.filter(element => element.getName().toLowerCase().includes(keyword) || element.getHashtag().toLowerCase().includes(keyword));
    }

    getGeoTags() {
        return this.#geoTags;
    }

    haversineDistance(lat1, long1, lat2, long2) {
        lat1 = this.toRad(lat1);
        long1 = this.toRad(long1);
        lat2 = this.toRad(lat2);
        long2 = this.toRad(long2);

        const latitudeDifference = lat1 - lat2;
        const longitudeDifference = long1 - long2;

        const hav = (1 - Math.cos(latitudeDifference) + Math.cos(lat1) * Math.cos(lat2) * (1 - Math.cos(longitudeDifference))) / 2
        const distance = 2 * Math.asin(Math.sqrt(hav));

        return distance * 6371;
    }

    toRad(grad){
        return grad * Math.PI / 180;
    }
}

module.exports = InMemoryGeoTagStore
