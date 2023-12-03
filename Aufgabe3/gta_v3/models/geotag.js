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
    constructor (Latitude, Longitude, Name, Hastag) {

        this.Latitude = Latitude; 
        this.Longitude = Longitude; 
        this.Name = Name; 
        this.Hastag = Hastag;  
    }
}

const geoTags = {}; // newly created geoTags are stored here 

function createGeoTag(Latitude, Longitude, Name, Hastag) {
    const geoTag = new GeoTag(Latitude, Longitude, Name, Hastag); 
    geoTags[Name] = geoTag; // create a new GeoTag with Name == parameter "Name"
}

module.exports = GeoTag;
