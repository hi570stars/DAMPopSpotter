export const mapTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>React Native Leaflet Map</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Leaflet CSS -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/leaflet.css"
  />

  <style>
    html, body, #map {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    .popup-content {
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div id="map"></div>

  <!-- Leaflet JS -->
  <script src="https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/leaflet.js"></script>

  <script>
    // Global error handler
    window.onerror = function(message, source, lineno, colno, error) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ error: message }));
    };

    // Initialize the map
    try {
      const bounds = [
        [29.5, -98.2], // Southwest corner (latitude, longitude)
        [30.9, -97.2]  // Northeast corner (latitude, longitude)
      ];

      const map = L.map('map', {
        zoomControl: false,
        maxBounds: bounds, // Restrict map panning to bounds
        maxBoundsViscosity: 1.0 // Prevent dragging out of bounds
      }).setView([30.28, -97.7345], 14); // Set initial center and zoom

      // Add OpenStreetMap Standard tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 10,
        maxZoom: 19,
      }).addTo(map);

      // Notify React Native that the map has initialized
      window.ReactNativeWebView.postMessage(JSON.stringify({ status: 'Map Initialized' }));

      // Function to add markers with custom icons
      function addMarkers(locations) {
        if (!locations || !Array.isArray(locations)) {
          console.error('Invalid locations data');
          window.ReactNativeWebView.postMessage(JSON.stringify({ error: 'Invalid locations data' }));
          return;
        }

        const iconMapping = {
          music: L.icon({
            iconUrl: 'https://imgur.com/BUnBLOc.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          }),
          market: L.icon({
            iconUrl: 'https://imgur.com/lWmKiJu.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          }),
          thrift: L.icon({
            iconUrl: 'https://imgur.com/8tIyeTC.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          }),
          food: L.icon({
            iconUrl: 'https://imgur.com/P7VdhcW.png',
            iconSize: [45, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          }),
          misc: L.icon({
            iconUrl: 'https://imgur.com/o2SzYqm.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          }),
          default: L.icon({
            iconUrl: 'https://i.imgur.com/2KREiK8.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          }),
        };

        // Add markers to the map
        locations.forEach(location => {
          const icon = iconMapping[location.icon] || iconMapping.default;

          const marker = L.marker([location.latitude, location.longitude], { icon }).addTo(map);

          // Removed bindPopup to suppress popup display
          // marker.bindPopup('<div class="popup-content"><strong>' + location.title + '</strong><br>' + location.description + '</div>');

          // Send marker click data to React Native
          marker.on('click', () => {
            const message = JSON.stringify({ id: location.id, title: location.title });
            window.ReactNativeWebView.postMessage(message);
          });
        });
      }

      // Listen for messages from React Native
      document.addEventListener('message', function(event) {
        try {
          const locations = JSON.parse(event.data);

          // Remove existing markers
          map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
              map.removeLayer(layer);
            }
          });

          // Add new markers
          addMarkers(locations);
        } catch (error) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ error: 'Invalid message data' }));
        }
      });

      // For iOS
      window.addEventListener('message', function(event) {
        try {
          const locations = JSON.parse(event.data);

          // Remove existing markers
          map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
              map.removeLayer(layer);
            }
          });

          // Add new markers
          addMarkers(locations);
        } catch (error) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ error: 'Invalid message data' }));
        }
      });
    } catch (e) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ error: e.message }));
    }
  </script>
</body>
</html>
`;
