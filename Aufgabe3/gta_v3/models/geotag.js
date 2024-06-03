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

    constructor(latitude, longitude, name, hashtag){
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.hashtag = hashtag;
    }

    setLatitude(latitude){this.latitude=latitude;};
    setLongitude(longitude){this.longitude=longitude;};
    setName(name){this.name=name;};
    setHashtag(hashtag){this.hashtag=hashtag;};

    getLatitude(){return this.latitude;};
    getLongitude(){return this.longitude;};
    getName(){return this.name;};
    getHashtag(){return this.hashtag;};
    
}

module.exports = GeoTag;
