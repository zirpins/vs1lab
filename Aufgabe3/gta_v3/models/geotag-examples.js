// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class representing example geoTags at HKA
 * 
 * TODO: populate your InMemoryGeoTagStore with these tags
 * 
 */

import InMemoryGeoTagStore from './geotag-store';
import GeoTag from './geotag';

let myInMemoryGeoTagStore = new InMemoryGeoTagStore();
let examples = GeoTagExamples.tagList();

for (let i=0; i < examples.length; i++){
    let myGeoTag =  new GeoTag();
    myGeoTag.setLatitude(examples[i][1]);
    myGeoTag.setLongitude(examples[i][2]);
    myGeoTag.setName(examples[i][0]);
    myGeoTag.setHashtag(examples[i][3]);

    myInMemoryGeoTagStore.addGeoTag(myGeoTag);

}

class GeoTagExamples {
    /**
     * Provides some geoTag data
     */

    
    static get tagList() {
        return [
            ['Castle', 49.013790, 8.404435, '#sight'],
            ['IWI', 49.013790, 8.390071, '#edu'],
            ['Building E', 49.014993, 8.390049, '#campus'],
            ['Building F', 49.015608, 8.390112, '#campus'],
            ['Building M', 49.016171, 8.390155, '#campus'],
            ['Building LI', 49.015636, 8.389318, '#campus'],
            ['Auditorium He', 49.014915, 8.389264, '#campus'],
            ['Building R', 49.014992, 8.392365, '#campus'],
            ['Building A', 49.015738, 8.391619, '#campus'],
            ['Building B', 49.016843, 8.391372, '#campus'],
            ['Building K', 49.013190, 8.392090, '#campus'],
        ];
    }
}

module.exports = GeoTagExamples;
