function updateLocation(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  // Stelle sicher, dass eine MapManager-Instanz existiert
  if (!window.mapManager) {
    window.mapManager = new MapManager();
  }

  // Karte initialisieren und Marker aktualisieren (aktuelle Position)
  window.mapManager.initMap([lat, lng]);
  const currentGeoTag = { latitude: lat, longitude: lng, title: 'Current position' };
  window.mapManager.updateMarkers([currentGeoTag]);

  // Platzhalter-Bild und die zugehörige <p>-Beschriftung aus dem DOM entfernen
  const img = document.querySelector('.discovery__map img') || document.querySelector('img');
  if (img) {
    const caption = img.nextElementSibling;
    img.remove();
    if (caption && caption.tagName && caption.tagName.toLowerCase() === 'p') {
      caption.remove();
    }
  }
}