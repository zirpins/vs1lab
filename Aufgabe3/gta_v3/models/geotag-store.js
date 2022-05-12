// File origin: VS1LAB A3

const GeoTag = require("./geotag");

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
    
    #array= new Array(GeoTag);
    
    /**
     * 
     * @param {GeoTag} tag 
     */
    addGeoTag(tag)
    {
        array.push(tag);
    }
    
    /**
     * 
     * @param {String} name 
     */
    removeGeoTag(name)
    {
        for(let i =0; i< array.length; i++)
        {
            if(name === array[i].name) 
            {
                array.splice(i);
                break;
            }
        }
    }

    /**
     * 
     * @param {LocationHelper} loc 
     * @param {Integer} radius 
     */
     getNearbyGeoTags(loc, radius)
     {
        var res = new Array(GeoTag);
        var x = loc.latitude;
        var y = loc.longitude;
        array.forEach(function(current)
        {
            var curX = current.latitude-x;
            var curY=current.longitude-y;
            var sqrX = curX*curX ;
            var sqrY =  curY*curY;
            var sqrR = radius*radius;
            if((sqrX+sqrY)<=sqrR) //im Bereich Zentrum +- radius
            {
                res.push(current);
            }
        });       
        return res;
     }
    
    /**
     * 
     * @param {LocationHelper} loc 
     * @param {Integer} radius 
     * @param {String} keyword
     */
     searchNearbyGeoTags(loc, radius, keyword)
     {
         var arrGeotags = getNearbyGeoTags(loc, radius);
         arrGeotags.forEach(function(current) 
         {
            if(current.name.includes(keyword) || current.hashtag.includes(keyword)) addGeoTag(current);
         });
     }
      
}

module.exports = InMemoryGeoTagStore
