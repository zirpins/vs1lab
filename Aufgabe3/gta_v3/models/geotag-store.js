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
    #geoTagsStore=[];

    addGeoTag(geotag){
        geoTagsStore.push(geotag);
    }

    removeGeoTag(name){
    for(var i = 0; i < geoTagsStore.length; i++){
        if(geoTagsStore[i].name == name){
            geoTagsStore.splice(i, 1);
        }
    }
    }


    getNearbyGeoTags(hidden_latitude,hidden_longitude)
    {
        foundGeoTags =[];

        min_latitude = hidden_latitude - 0.5;
        max_latitude = hidden_latitude + 0.5;

        min_longitude = hidden_longitude - 0.5;
        max_longitude = hidden_longitude + 0.5;
        for(var i = 0; i< geoTagsStore.length; i++){

            if(min_latitude <= geoTagsStore[i].latitude <= max_latitude){
                if(min_longitude <= geoTagsStore[i].longitude <= max_longitude){
                    foundGeoTags.push(geoTagsStore[i]);
                }
            }

        }
        return foundGeoTags;
    }

    searchNearbyGeoTags(key,hidden_longitude,hidden_latitude){
        foundGeoTags =[];

        min_latitude = hidden_latitude - 0.5;
        max_latitude = hidden_latitude + 0.5;

        min_longitude = hidden_longitude - 0.5;
        max_longitude = hidden_longitude + 0.5;
        for(var i = 0; i< geoTagsStore.length; i++){

            if(min_latitude <= geoTagsStore[i].latitude <= max_latitude){
                if(min_longitude <= geoTagsStore[i].longitude <= max_longitude){
                    if (geoTagsStore[i].name.substring(0,4) == key.substring(0,4) || geoTagsStore[i].hashtag.substring(0,2) == key.substring(0,2)){
                        foundGeoTags.push(geoTagsStore[i]);
                    }

                }
            }
        }
        return foundGeoTags;
    }
}
module.exports = InMemoryGeoTagStore
