// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

const GeoTag = require("./geotag");

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
     static #geotags = [];

     static get getGeoTag(){
         return this.#geotags;
     }


    addGeoTag(lat, long, name, hash){
        this.#geotags.push(new GeoTag(lat, long, name, hash));

    }

    removeGeoTag(name){
       for(var x = 0; x < this.#geotags.length; x++){
           if(name === this.#geotags[x].name){
               this.#geotags.splice(x,1);
           }
       }
    }

    getNearbyGeoTags(lat, long, radius){
        return this.#geotags.filter((tag) => {
            return this.#calculateDifference(tag.latitude, lat, tag.longitude,long) <= radius;
        });

    }
    #calculateDifference(lat1, lat2, long1, long2){
        const difflat = Math.pow(lat1 - lat2, 2);
        const difflong = Math.pow(long1- long2, 2);
       return  Math.sqrt((difflat + difflong));


    }
    searchNearbyGeoTags(lat, long, searchterm, radius){
        return this.getNearbyGeoTags(lat, long, radius).filter((tag) => {
            return tag.name.toLowerCase().includes(searchterm) || tag.hashtag.toLowerCase().includes(searchterm);
        });
    }

}

module.exports = InMemoryGeoTagStore
