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
class InMemoryGeoTagStore {
    #array = [];

    loadExamples()
    {
        let array = GeoTagExamples.tagList;
        for (let i = 0; i < array.length; i++) {
                this.addGeoTag(new GeoTag(array[i][0], array[i][1],array[i][2],array[i][3]));
        }
    }

    #radius = 1000;

    getArr()
    {
        return this.#array;
    }


    /**
     * 
     * 
     * @param {GeoTag} tag 
     */
    addGeoTag(tag) {
        this.#array.push(tag);
    }

    /**
     * 
     * @param {String} name 
     */
    removeGeoTag(name) {
        for (let i = 0; i < this.#array.length; i++) {
            if (name === this.#array[i].name) {
                this.array.splice(i);
                break;
            }
        }
    }

    
    getNearbyGeoTags(latitude, longitude) {
        var radius = this.#radius;
        var res = [];
        var x = latitude;
        var y = longitude;
        this.#array.forEach(function (current) {
            var curX = current.latitude-x;
            var curY=current.longitude-y;
            var sqrX = curX*curX ;
            var sqrY =  curY*curY;
            var sqrR = radius * radius;
            if((sqrX+sqrY) <= sqrR) 
            {
                res.push(current);
            }
        });
        return res;
    }

    /**
     *
     * @param {String} searchVal
     */
    searchNearbyGeoTags(searchVal) {
        var newArray = [];
        this.#array.forEach(function (current) {
            if (current.name.includes(searchVal) | current.hashtag.includes(searchVal)) newArray.push(current); 
        });
        return newArray;
    }

}

module.exports = InMemoryGeoTagStore
