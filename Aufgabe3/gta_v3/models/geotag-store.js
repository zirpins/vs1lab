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
class InMemoryGeoTagStore{
    static geoTags = [];

    get geoTags(){
        return this.geoTags;
    }

    static addGeoTag(tag){
        // If GeoTag is provided, check if it's actually GeoTag, then add to [geoTags] array
        if (typeof(tag) != GeoTag){
            throw error;
        } else {
            this.geoTags.push(tag);
        }
    }

    static addGeoTag(lat, long, nm, ht){
        // If GeoTag latitude, longitude, name, hashtag is provided, create new GeoTag, then add to [geoTags] array
        var tag = new GeoTag(lat, long, nm, ht);
        this.geoTags.push(tag);
    }

    static addGeoTagExamples(){
        if (this.geoTags.length == 0){
            var v = GeoTagExamples.tagList;
            for (let i = 0; i < v.length; i++){
                this.addGeoTag(v[i][1], v[i][2], v[i][0], v[i][3]);
            }
        }
    }

    static removeGeoTag(name){
        // remove Element by name from [geoTags] array 
        for (var v = 0; v < this.geoTags.length; v++){
            if (this.geoTags[v].name == name){
                this.geoTags = this.geoTags.splice(v, 1);
                break;
            }
        }
    }

    static getNearbyGeoTags(lat, long, radius){
        // return array of all geotags within radius of positon ([latitude], [longitude])
        radius*=100;
        var arr = [];
        for (var i = 0; i < this.geoTags.length; i++){
            if (this.dist(this.geoTags[i].latitude, this.geoTags[i].longitude, lat, long) <= radius){
                arr.push(this.geoTags[i]);
            }
        } 
        return arr;
    }

    static dist(lat1, lon1, lat2, lon2){
        //Haversine formula to find distance between two points on a sphere
        let dLat = (lat2 - lat1) * Math.PI / 180.0;
        let dLon = (lon2 - lon1) * Math.PI / 180.0;
           
        lat1 = (lat1) * Math.PI / 180.0;
        lat2 = (lat2) * Math.PI / 180.0;
         
        let a = Math.pow(Math.sin(dLat / 2), 2) +
                   Math.pow(Math.sin(dLon / 2), 2) *
                   Math.cos(lat1) *
                   Math.cos(lat2);
        let rad = 6371;
        let c = 2 * Math.asin(Math.sqrt(a));
        return rad * c;
    }

    static searchNearbyGeoTags(lat, long, radius, keyword){
        // get array of all geotags within radius of positon ([latitude], [longitude])
        // then add to [arr2] any geotags with partial string in keyword 
        var arr = this.getNearbyGeoTags(lat, long, radius);
        console.log(arr);
        var arr2 = [];
        for (var i = 0; i < arr.length; i++){
            if (arr[i].name.toLowerCase().indexOf(keyword.toLowerCase()) > -1 || arr[i].hashtag.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ){
                arr2.push(arr[i]);
            }
        }
        return arr2;
    }
}

module.exports = InMemoryGeoTagStore
