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
    //['Castle', 49.013790, 8.404435, '#sight'],
    constructor(geotag) {
        this.name = geotag[0]
        this.lat = geotag[1]
        this.long = geotag[2]
        this.hashtag = geotag[3]
    }
    
}

module.exports = GeoTag;
