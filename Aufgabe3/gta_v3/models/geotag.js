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
    #latitude;
    #longitude;
    #name;
    #hashtag;
    
    constructor(latitude,longitude,name,hashtag) {
        this.latitude =latitude;
        this.longitude =longitude;
        this.name = name;
        this.hashtag = hashtag;
    }

    getName(){
        return this.name;
    }
    
    getLongitude(){
        return this.longitude;
    }

    getLatitude(){
        return this.latitude;
    }

    getHashtag(){
        return this.hashtag;
    }

    toJASON(){
        return {"name": getName(), "longitude": this.getLongitude(), "latitude": this.getLatitude(), "hashtag": getHashtag()};
    }
}

module.exports = GeoTag;
