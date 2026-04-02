// File origin: VS1LAB A3

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

const GeoTagExamples = require('./geotag-examples');
const GeoTag = require('./geotag');



class InMemoryGeoTagStore{

    // TODO: ... your code here ...

    

    #geoTagMultiSet = []

    constructor() {
        
        const exampleData = GeoTagExamples.tagList;
        exampleData.forEach(tagArray => {
            const name = tagArray[0];
            const latitude = tagArray[1];
            const longitude = tagArray[2];
            const hashtag = tagArray[3];

            const newGeoTag = new GeoTag(latitude, longitude, name, hashtag);
            
            this.#geoTagMultiSet.push(newGeoTag);
        });
    }

    get geoTagMultiSet() {
        return this.#geoTagMultiSet
    }

    addGeoTag(geotag) {
        this.#geoTagMultiSet.push(geotag);
    }

    removeGeoTag(name) {
        this.#geoTagMultiSet = this.#geoTagMultiSet.filter(
            tag => tag.name !== name
        );
        
    }

    getNearbyGeoTags(locationGeoTag, radius) {
        return this.#geoTagMultiSet.filter(
            tag => (

                    tag.latitude <= locationGeoTag.latitude + radius &&
                    tag.latitude >= locationGeoTag.latitude - radius &&
                    tag.longitude <= locationGeoTag.longitude + radius &&
                    tag.longitude >= locationGeoTag.longitude - radius
                   ) 

        );
    }

    searchNearbyGeoTags(name, locationGeoTag, radius) {
        const lowerCaseName = name.toLowerCase();
        return this.getNearbyGeoTags(locationGeoTag, radius).filter(
            tag => 
                (
                    tag.name.toLowerCase().includes(lowerCaseName) || 
                    tag.hashtag.toLowerCase().includes(lowerCaseName)
                   )
        )

    }

}

module.exports = InMemoryGeoTagStore;
