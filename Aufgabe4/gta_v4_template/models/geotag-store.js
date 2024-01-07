// File origin: VS1LAB A3

const GeoTag = require("./geotag");
const GeoTagExamples = require("./geotag-examples")

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

    #GeoTagStore = []; 

    constructor() {
        // Use an array to store a multiset of geotags.
        this.#GeoTagStore = []; // Celso tenia razon, gracias Celso! 
        // Use the populate function to add Examples to taglist
        this.populate(); 
        //console.log('Populated GeoTagStore:', this.#GeoTagStore);
        
    }

    getAllGeoTags(){
        return this.#GeoTagStore; 
    }


    /**
     * Add a geotag to the store.
     */
    addGeoTag(geotag) {
        this.#GeoTagStore.push(geotag);
    }

    /**
     * Delete geo-tags from the store by name.
     */
    removeGeoTag(name) {
        this.#GeoTagStore = this.#GeoTagStore.filter(tag => tag.Name !== name);
    }


    /**
     * Returns all geotags in the proximity of a location.
     */
    getNearbyGeoTags(latitude, longitude, radius) {
        const nearbyTags = this.#GeoTagStore.filter(geotag => {
            // Log the coordinates of each geotag for debugging
            //console.log(`Tag: ${geotag.Name}, Latitude: ${geotag.Latitude}, Longitude: ${geotag.Longitude}`);
    
            // Calculate the distance between the given location and the geotag's location.
            const distance = this.calculateDistance(latitude, longitude, geotag.Latitude, geotag.Longitude);
    
            // Log the distance for debugging
            //console.log(`Tag: ${geotag.Name}, Distance: ${distance}`);
    
            // Return true if the geotag is within the specified proximity radius.
            return distance <= radius;
        });
    
        //console.log('Nearby Tags:', nearbyTags); // Log the nearby tags
    
        return nearbyTags;
    }
    

    /**
     * Returns all geotags in the proximity of a location that match a keyword.
     */
    searchNearbyGeoTags(latitude, longitude, radius, keyword) {
        return this.#GeoTagStore.filter(geotag => {
            // Calculate the distance between the given location and the geotag's location.
            const distance = this.calculateDistance(latitude, longitude, geotag.Latitude, geotag.Longitude);

            // Check if the geotag is within the specified proximity radius and matches the keyword.
            const nameMatch = geotag.Name.toLowerCase().includes(keyword.toLowerCase());
            const hashtagMatch = geotag.Hashtag.toLowerCase().includes(keyword.toLowerCase());

            // Return true if the geotag matches both proximity and keyword.
            return distance <= radius && (nameMatch || hashtagMatch);
        });
    }

    /**
     * Helper method to calculate the distance between two sets of coordinates with the Haversine formula.
     */
    calculateDistance(lat1, lon1, lat2, lon2) {
        const earthRadius = 6371; // in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = earthRadius * c;

        return distance;
    }

    populate() {
        GeoTagExamples.exampleTagList.forEach(tag =>{
            const newTag = new GeoTag(tag[1], tag[2], tag[0], tag[3]);
            this.addGeoTag(newTag);
            //console.log('Added GeoTag:', newTag); 
        }); 
    }



    static getInstance(){
        if(!this.instance){
            this.instance = new InMemoryGeoTagStore(); 
        }
        return this.instance; 
    }

    updateGeoTag(latitude, longitude, name, hashtag) {
        // Find the index of the tag with the provided ID
        const index = this.#GeoTagStore.findIndex(tag => tag.Name === name);
    
        if (index !== -1) {
          // If the tag is found, update its properties
          this.#GeoTagStore[index].Latitude = latitude;
          this.#GeoTagStore[index].Longitude = longitude;
          this.#GeoTagStore[index].Name = name;
          this.#GeoTagStore[index].Hashtag = hashtag;
    
          // Return the updated GeoTag
          return this.#GeoTagStore[index];
        }
    
        // If the tag with the provided ID is not found, return null
        return null;
      }

    /*     addGeoTag (GeoTagName) {
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
        } */

}

// const GeoTagSpeicherArray = [];


module.exports = InMemoryGeoTagStore
