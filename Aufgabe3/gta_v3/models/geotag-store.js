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

    constructor(){
        GeoTagStore = new InMemoryGeoTagStore;
        GeoTagStore.push(tagList());  
    }

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
        

    

        for(var i = 0; i< geoTagsStore.length; i++){
            dx = 71.5 * (hidden_longitude - geoTagsStore[i].longitude)
            dy = 111.3 * (hidden_latitude - geoTagsStore[i].latitude)

            distance = Math.sqrt(dx * dx + dy * dy);
            if( distance <= 10){
                foundGeoTags.push(geoTagsStore[i]);
            }

        }
        return foundGeoTags;
    }

    searchNearbyGeoTags(key,hidden_longitude,hidden_latitude){
         NearbyGeotags = foundgetNearbyGeoTags(hidden_longitude,hidden_latitude);
         foundGeoTags = [];
        for(var i= 0;i< NearbyGeotags.length; i++){
         if (NearbyGeotags[i].name.substring(0,4) == key.substring(0,4) || NearbyGeotags[i].hashtag.substring(0,2) == key.substring(0,2)){
             foundGeoTags.push(NearbyGeotags[i]);
             }
        }
        return foundGeoTags;
    }
}
module.exports = InMemoryGeoTagStore
