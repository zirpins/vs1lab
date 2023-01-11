// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

const GeoTag = require("./geotag");
const GeoTagExamples = require("./geotag-examples");
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
     #geotags = [];
     #count = 0;

     fillExamples(){
         GeoTagExamples.tagList.forEach(tag => {
             this.addGeoTag(tag[1], tag[2], tag[0], tag[3]);
             this.#count++;
         })
     }

     get geotags(){
         return this.#geotags;
     }


    addGeoTag(lat, long, name, hash){
        this.#geotags.push(new GeoTag(lat, long, name, hash, this.#count));
        console.log("Neues GeoTAg: ", this.#geotags);
        this.#count++;
    }

    removeGeoTag(name){
       for(let x = 0; x < this.#geotags.length - 1; x++){
           if(name === this.#geotags[x].name){
               this.#geotags.splice(x,1);
           }
       }
    }

    getNearbyGeoTags(lat, long, radius){
         let temp = [];
         for(let i = 0; i < this.#geotags.length; i++) {
             let difference =  this.#calculateDifference(this.#geotags[i].latitude, lat, this.#geotags[i].longitude, long);
             console.log("Radius:", radius);
             console.log("Difference:", difference);

             if(difference <= radius){
                 temp.push(this.#geotags[i]);
             }
         }
         return temp;
    }
    #calculateDifference(lat1, lat2, long1, long2){
        lat1 = parseFloat(lat1);
        lat2 = parseFloat(lat2);
        long1 = parseFloat(long1);
        long2 = parseFloat(long2);

        console.log("lat1", lat1);
        console.log("lat2", lat2);
        const difflat = Math.pow(lat1 - lat2, 2);
        const difflong = Math.pow(long1- long2, 2);
        console.log("difflat", difflat);
        console.log("difflong", difflong);
       return  Math.sqrt((difflat + difflong));


    }
    searchNearbyGeoTags(lat, long, searchterm, radius){
        let temp = [];
        for(let i = 0; i < this.#geotags.length; i++) {
            let difference = this.#calculateDifference(this.#geotags[i].latitude, lat, this.#geotags[i].longitude, long);
            console.log("difference: ", difference);
            if(difference <= radius && (this.#geotags[i].name == searchterm || this.#geotags[i].hashtag == searchterm)) {
                temp.push(this.#geotags[i]);
            }
        }
        return temp;
    }

    /*Ein Element wird nur gesucht und kann direkt ausgegeben werden */
    searchGeotagByID(id) {
         let temp = [];
         for(let i = 0; i < this.geotags.length;i++) {
             console.log(this.#geotags[i].id);
             if(this.#geotags[i].id == id){
                 console.log("Gefunden", id);
                 console.log(this.#geotags[id]);
                 temp.push(this.#geotags[i]);
             }
         }
         return temp;
    }

    putGeotag(geotag, id) {
        for(let i = 0; i< this.geotags.length;i++) {
            if(this.#geotags[i].id === id)
                this.#geotags[i] = geotag;
        }
    }
}

module.exports = InMemoryGeoTagStore
