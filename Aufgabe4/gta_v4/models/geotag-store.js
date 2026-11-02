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
    #counter = 0;

    constructor() {
        //adding examples
        GeoTagExamples.tagList.forEach(element => {
            let geoTag = new GeoTag(element[1], element[2],element[0], element[3]);
            this.addGeoTag(geoTag);
        });
    }

    addGeoTag(geoTag) {
        geoTag.setId(this.#counter);
        this.#geoTags.push(geoTag);
        this.#counter++;
        return geoTag;
    }

    removeGeoTagById(id) {
        this.#geoTags = this.#geoTags.filter(gt => gt.getId() !== Number(id));
    }

    /*
        returns all geotags in the vicinity of a given coordinate pair
    */
    getNearbyGeoTags(latitude, longitude, tags = this.#geoTags) {
        const radius = 1000;
        return tags.filter(element => {
            return this.haversineDistance(latitude, longitude, element.getLatitude(), element.getLongitude()) <= radius;
        });
    }

    /*
        return all geotags with the given keyword. If coordinates are given, only getoags in the specified radius will be returned
    */
    searchNearbyGeoTags(keyword, latitude, longitude) {
        var searchedGeoTags = this.#geoTags;
        if (keyword) {
        keyword = keyword.toLowerCase();
        searchedGeoTags = this.#geoTags.filter(element => {
            return element.getName().toLowerCase().includes(keyword) ||
            element.getHashtag().toLowerCase().includes(keyword);
        });
        }

        if (latitude && longitude && searchedGeoTags.length !== 0) return this.getNearbyGeoTags(latitude, longitude, searchedGeoTags);
        return searchedGeoTags;
    }

    getGeoTags() {
        return this.#geoTags;
    }

    getGeoTagById(id) {
        var geotags = this.#geoTags.filter(element => element.getId() === Number(id));
        if (geotags.length !== 1) {
            console.log('getGeoTagById wrong length');
        }
        return geotags[0];
    }

    changeGeotagById(oldId, newLatitude, newLongitude, newName, newHashtag) {
        var geotags = this.#geoTags.filter(element => element.getId() === Number(oldId));
        if (geotags.length !== 1) {
            console.log('id not found');
        }
        let oldGeoTag = geotags[0];
        if (newLatitude && newLongitude && newName) {
            oldGeoTag.setLatitude(newLatitude);
            oldGeoTag.setLongitude(newLongitude);
            oldGeoTag.setName(newName);
            oldGeoTag.setHashtag(newHashtag);
        }
        return oldGeoTag;
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
