// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");


// Function to make an asynchronous POST request to add a new GeoTag
async function addGeoTagAsync(data) {
    try {
        const response = await fetch('/api/geotags', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to add GeoTag');
        }

        const newGeoTag = await response.json();
        console.log('New GeoTag:', newGeoTag);
        // Update location after adding a new GeoTag
        updateLocation();
        // Fetch latest GeoTags after updating the location
        await searchGeoTagsAsync(data.SearchTerm || data.SearchTerm === '' ? data.SearchTerm : '');



        return newGeoTag;
    } catch (error) {
        console.error('Error adding GeoTag:', error.message);
        throw error;
    }
}

// Function to make an asynchronous GET request to search for GeoTags
async function searchGeoTagsAsync(searchTerm) {
    try {
        const response = await fetch(`/api/geotags?SearchTerm=${encodeURIComponent(searchTerm)}`);

        if (!response.ok) {
            throw new Error('Failed to search for GeoTags');
        }

        const searchResults = await response.json();
        console.log('Search results:', searchResults);
        return searchResults;
    } catch (error) {
        console.error('Error searching for GeoTags:', error.message);
        throw error;
    }
}

// Add an event listener for the Tagging Form
document.getElementById('tag-form').addEventListener('submit', handleTagFormSubmit);

// Function to handle the submission of the Tagging form
async function handleTagFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;

    // Extract form data using FormData
    const formData = new FormData(form);

    // Convert FormData to a plain object
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        // Make an asynchronous POST request to add a new GeoTag
        const newGeoTag = await addGeoTagAsync(data);

        // Update the UI with the search results based on the search term
        await handleSearchResults(data.SearchTerm || '');

        // Handle the new GeoTag as needed (update UI, etc.)
        console.log('Handling new GeoTag:', newGeoTag);
    } catch (error) {
        // Handle errors if needed
        console.error('Error handling Tag form submission:', error.message);
    }
}


// Function to handle the submission of the Discovery form
async function handleDiscoveryFormSubmit() {
                const form = document.getElementById('discoveryFilterForm');

        // Extract form data using FormData
        const formData = new FormData(form);

        // Convert FormData to a plain object
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            // Make an asynchronous GET request to search for GeoTags
            const searchResults = await searchGeoTagsAsync(data.SearchTerm || '');

            // Update the UI with the search results
            updateUI(searchResults);

            // Update the map with the new GeoTags
            updateLocation();

        } catch (error) { 
            // Handle errors if needed
            console.error('Error handling Discovery form submission:', error.message);
        }
    }

// Function to update the UI with the search results
function updateUI(searchResults) {
    // Assuming there's an element with the id 'discoveryResults' to display the results
    const resultsContainer = document.getElementById('discoveryResults');

    // Clear existing results
    resultsContainer.innerHTML = '';

    // Display the new search results
    searchResults.forEach(geotag => {
        const listItem = document.createElement('li');
        listItem.textContent = `${geotag.Name} (${geotag.Latitude}, ${geotag.Longitude}) ${geotag.Hashtag}`;
        resultsContainer.appendChild(listItem);
    });
}


// Attach the form submission handler to the Discovery form
const discoveryForm = document.getElementById('discoveryFilterForm');
discoveryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('Discovery form submitted. Calling handleDiscoveryFormSubmit...');
    await handleDiscoveryFormSubmit();
});



/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
async function updateLocation() {
    // Fetch existing coordinates from hidden fields
    const latField = document.getElementById('lat');
    const lonField = document.getElementById('lon');
    const latitude = latField.value;
    const longitude = lonField.value;

    try {
        // Fetch the latest GeoTags
        const latestGeoTags = await searchGeoTagsAsync('');

        // Check if valid coordinates are already available
        if (latitude && longitude) {
            // Use existing coordinates for map and update hidden fields
            const mapManager = new MapManager('urzLls1AwR1SUp0lsMiK6OwpoBB0Dy3b');

            // Update the map with the GeoTag array
            const mapUpdate = mapManager.getMapUrl(latitude, longitude, latestGeoTags);
            document.getElementById("mapView").src = mapUpdate;
        } else {
            // No valid coordinates, use Geolocation API
            LocationHelper.findLocation((location) => {
                // Update hidden fields with new coordinates
                latField.value = location.latitude;
                lonField.value = location.longitude;

                // Update the map with the updated GeoTag array
                const mapManager = new MapManager('urzLls1AwR1SUp0lsMiK6OwpoBB0Dy3b');
                const newGeoTag = { Latitude: location.latitude, Longitude: location.longitude, Name: "YourLocation" };
                latestGeoTags.push(newGeoTag);

                const mapUpdate = mapManager.getMapUrl(location.latitude, location.longitude, latestGeoTags);
                document.getElementById("mapView").src = mapUpdate;

                // Now that the map is updated, update the UI
                updateUI(latestGeoTags);
            });
        }
    } catch (error) {
        console.error('Error updating location:', error.message);
    }
}


// Add an event listener to handle the 'load' event
window.addEventListener('load', async () => {
    console.log('Page loaded. Calling updateLocation...');
    // Fetch and update location on page load
    await updateLocation();
});

window.addEventListener('load', () => {
    console.log('Page loaded. Calling updateLocation...');
    updateLocation();
});

