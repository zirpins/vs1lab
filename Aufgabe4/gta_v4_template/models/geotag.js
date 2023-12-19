// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/** * 
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
class GeoTag {

    // TODO: ... your code here ...
    constructor (Latitude, Longitude, Name, Hashtag) {

        this.Latitude = Latitude; 
        this.Longitude = Longitude; 
        this.Name = Name; 
        this.Hashtag = Hashtag;  
    }
}

const geoTags = {}; // newly created geoTags are stored here 

function createGeoTag(Latitude, Longitude, Name, Hashtag) {
    const geoTag = new GeoTag(Latitude, Longitude, Name, Hashtag); 
    geoTags[Name] = geoTag; // create a new GeoTag with Name == parameter "Name"
}

module.exports = GeoTag;
