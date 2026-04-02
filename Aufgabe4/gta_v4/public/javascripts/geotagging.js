// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");


/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
// ... your code here ...

const mapManager = new MapManager();

let currentPage = 1; //pagination
const pageSize = 5;

let lastQuery = {
  latitude: null,
  longitude: null,
  radius: 100,
  searchTerm: ""
};

async function updateLocation() {
    const inputLat = document.getElementById("tagLat");
    const inputLong = document.getElementById("tagLong");

    if (inputLat.value !== "" && inputLong.value !== "") {
        const lat = parseFloat(inputLat.value);
        const long = parseFloat(inputLong.value);

        mapManager.initMap(lat, long);
        mapManager.updateMarkers(lat, long, []);
        ensureMapVisible();

        lastQuery = {
          latitude: lat,
          longitude: long,
          radius: 100,
          searchTerm: ""
        };

        await loadDiscoveryPage(1, false);
        return;
    }
        
    
        LocationHelper.findLocation(async (locationHelper) => {

        document.getElementById("tagLat").value = locationHelper.latitude
        document.getElementById("tagLong").value = locationHelper.longitude
        document.getElementById("tagLatHidden").value = locationHelper.latitude
        document.getElementById("tagLongHidden").value = locationHelper.longitude

        // Initialize the map
        mapManager.initMap(locationHelper.latitude, locationHelper.longitude);
        mapManager.updateMarkers(locationHelper.latitude, locationHelper.longitude, []);
        ensureMapVisible();

        lastQuery = {
          latitude: locationHelper.latitude,
          longitude: locationHelper.longitude,
          radius: 100,
          searchTerm: ""
        };

        await loadDiscoveryPage(1, false);
        });
}
       // --- A4: AJAX + REST ---
    function renderDiscoveryList(tags) {
    const ul = document.getElementById("discoveryResults");
    ul.innerHTML = ""; // clear old items

    if (!tags || tags.length === 0) return;

tags.forEach(gtag => {
    const li = document.createElement("li");
    li.textContent = `${gtag.name} ( ${gtag.latitude},${gtag.longitude}) ${gtag.hashtag ?? ""}`;
    ul.appendChild(li);
});
}

function ensureMapVisible() {
    const placeholderImg = document.getElementById("bild");
    if (placeholderImg) placeholderImg.remove();

    const mapSpan = document.querySelector("#map p");
    if (mapSpan) mapSpan.remove();

    document.getElementById("map").style.height = "500px";
    mapManager.refreshMap();
}

function getDiscoveryCenter(fallbackLat, fallbackLng, tags) {
  if (tags && tags.length > 0) {
    return { latitude: tags[0].latitude, longitude: tags[0].longitude };
  }
  return { latitude: fallbackLat, longitude: fallbackLng };
}

function updateDiscoveryUI(centerLat, centerLng, tags, centerOnFirstTag = true) {
  renderDiscoveryList(tags);

  const mapElement = document.getElementById("map");
  mapElement.setAttribute("data-tags", JSON.stringify(tags || []));

  ensureMapVisible();
  const target = centerOnFirstTag ? getDiscoveryCenter(centerLat, centerLng, tags) : { latitude: centerLat, longitude: centerLng };
  mapManager.initMap(target.latitude, target.longitude);
  mapManager.updateMarkers(centerLat, centerLng, tags || []);
}


async function handleTaggingSubmit(event) {
    event.preventDefault();

    const tagForm = document.getElementById("tag-form");

    // keep HTML5 validation (A1)
    if (!tagForm.reportValidity()) return;

    const latitude = parseFloat(document.getElementById("tagLat").value);
    const longitude = parseFloat(document.getElementById("tagLong").value);
    const name = document.getElementById("tagName").value;
    const hashtag = document.getElementById("tagHash").value;

    const payload = { latitude, longitude, name, hashtag };

    const response = await fetch("/api/geotags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        console.error("POST /api/geotags failed", response.status);
        return;
    }


    lastQuery = {
  latitude: parseFloat(document.getElementById("tagLatHidden").value),
  longitude: parseFloat(document.getElementById("tagLongHidden").value),
  radius: 100,
  searchTerm: ""
};

const searchInput = document.getElementById("searchterm");
if (searchInput) searchInput.value = "";

await loadDiscoveryPage(1);
}
async function handleDiscoverySubmit(event) {
  event.preventDefault();

  const discoveryForm = document.getElementById("discoveryFilterForm");
  if (!discoveryForm.reportValidity()) return;

  const searchTerm = document.getElementById("searchterm").value || "";
  const centerLat = parseFloat(document.getElementById("tagLatHidden").value);
  const centerLng = parseFloat(document.getElementById("tagLongHidden").value);

  lastQuery = {
    latitude: centerLat,
    longitude: centerLng,
    radius: 100,
    searchTerm
    };

  await loadDiscoveryPage(1);
}

function renderPagination(page, totalPages) {
  const container = document.getElementById("pagination");
  if (!container) return;

  container.innerHTML = "";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "<";
  prevBtn.disabled = page <= 1;
  prevBtn.addEventListener("click", () => {
    if (page > 1) loadDiscoveryPage(page - 1);
  });

  const info = document.createElement("span");
  info.textContent = ` ${page}/${totalPages} (${pageSize}) `;

  const nextBtn = document.createElement("button");
  nextBtn.textContent = ">";
  nextBtn.disabled = page >= totalPages;
  nextBtn.addEventListener("click", () => {
    if (page < totalPages) loadDiscoveryPage(page + 1);
  });

  container.appendChild(prevBtn);
  container.appendChild(info);
  container.appendChild(nextBtn);
}

async function loadDiscoveryPage(page, centerOnFirstTag = true) {
  currentPage = page;

  const params = new URLSearchParams({
    latitude: lastQuery.latitude,
    longitude: lastQuery.longitude,
    radius: String(lastQuery.radius),
    searchTerm: lastQuery.searchTerm,
    page: String(currentPage),
    pageSize: String(pageSize)
  });

  const response = await fetch(`/api/geotags?${params.toString()}`);
  if (!response.ok) {
    console.error("GET /api/geotags failed", response.status);
    return;
  }

  const data = await response.json(); // { items, page, totalPages... }

  updateDiscoveryUI(lastQuery.latitude, lastQuery.longitude, data.items, centerOnFirstTag);
  renderPagination(data.page, data.totalPages);
}

           
    

document.addEventListener("DOMContentLoaded", () => {
    updateLocation();

   
    const tagForm = document.getElementById("tag-form");
    const discoveryForm = document.getElementById("discoveryFilterForm");

    if (tagForm) tagForm.addEventListener("submit", handleTaggingSubmit);
    if (discoveryForm) discoveryForm.addEventListener("submit", handleDiscoverySubmit);
});
