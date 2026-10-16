// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */


const GeoTag = require('./geotag');
const GeoTagExamples = require('./geotag-examples');

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

    constructor() {
        this.tags = this.readExampleGeoTags();
    }

    readExampleGeoTags  () {
        const geoTags = [];
        for (const tag of GeoTagExamples.tagList) {
            geoTags.push(new GeoTag(tag[0], tag[1], tag[2], tag[3]));
        }
        return geoTags;
    }

    addGeoTag(geoTag) {
        this.tags.push(geoTag);
    }

    removeGeoTag(name) {
        this.tags = this.tags.filter(geoTag => geoTag.getName() !== name);
    }

    getNearbyGeoTags(latitude, longitude, radius) {
        if (!radius) {
            radius = 1000;
        }
        return this.tags.filter(geoTag => {
            const distance = Math.sqrt(Math.pow(geoTag.getLatitude() - latitude, 2) + Math.pow(geoTag.getLongitude() - longitude, 2));
            return distance <= radius;
        });
    }

    searchNearbyGeoTags(latitude, longitude, radius, keyword) {
        return this.getNearbyGeoTags(latitude, longitude, radius).filter(geoTag => geoTag.getName().includes(keyword) || geoTag.getHashtag().includes(keyword));
    }


}

module.exports = new InMemoryGeoTagStore();
