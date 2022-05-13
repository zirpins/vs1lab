// File origin: VS1LAB A3

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
class InMemoryGeoTagStore {
    #geoTags = [];

    addGeoTag(geotag) {
        this.#geoTags.push(geotag);
    }

    removeGeoTag(name) {
        for (let i = 0; i < this.#geoTags.length - 1; i++) {
            if (this.#geoTags[i].name === name) {
                this.#geoTags.splice(i, 1);
            }
        }
    }

    getNearbyGeoTags(location) {
        let nearbyGeoTags = [];
        let distance;

        for (let i in this.#geoTags) {
            distance = this.calculateDistance(location, i);
            if (distance < 10) {
                nearbyGeoTags.push(i);
            }
        }
        return nearbyGeoTags;
    }

    searchNearbyGeoTags(keyword) {
        let distance;
        let geoTagMatching;
        let nearbyGeoTags = [];
        let stringMatch;
        let geoTagName;

        let regExp = new RegExp(keyword, 'gi') //Ignores Case + returns Array for each time finding keyword string in geoTagName

        for (let i in this.#geoTags) {
            geoTagName = i.name;
            stringMatch = geoTagName.match(regExp);
            if (stringMatch.length >= 1) {
                geoTagMatching = i;
            }
        }

        for (let i in this.#geoTags) {
            distance = this.calculateDistance(geoTagMatching, i);
            if (distance < 10) {
                nearbyGeoTags.push(i);
            }
        }
        nearbyGeoTags.push(geoTagMatching);
        return nearbyGeoTags;
    }

    calculateDistance(from, to) {
        let fromX = from.latitude();
        let fromY = from.longitude();
        let toX = to.latitude();
        let toY = to.longitude();
        return Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
    }
}


module.exports = InMemoryGeoTagStore
