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
class InMemoryGeoTagStore{

    // TODO: ... your code here ...

    addGeoTag (GeoTagName) {
        GeoTagSpeicherArray.push(GeoTagName); // GeoTagName from geoTags array in ./model/geotag.js
    }

    removeGeoTag (GeoTagName) {
        let toRemove = GeoTagSpeicherArray.indexOf(GeoTagName); 
        // find index of selected Array element
        delete GeoTagSpeicherArray[toRemove];
        // use index to delete element  
    }


    getNearbyGeoTags (locationParam, radius) {
        radius = 5; // fixed parameter for now , can be changed later if wanted 
        // somethig something, idk how to create this shit 
        // ik now, make an algorithim that shows the locations x degrees from the selected starting point 
    }

    searchNearbyGeoTags (keyword, locationParam, radius) {
        radius = 5; // fixed parameter for now , can be changed later if wanted 
        // somethig something, idk how to create this shit 
        //           ----//----
    }

}

const GeoTagSpeicherArray = []; 


module.exports = InMemoryGeoTagStore
