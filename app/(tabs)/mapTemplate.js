// src/mapTemplate.js (Final Version with Enhanced Error Handling)

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
      const map = L.map('map').setView([30.2850, -97.7335], 15); // Austin, Texas coordinates

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Send status message to React Native
      window.ReactNativeWebView.postMessage(JSON.stringify({ status: 'Map Initialized' }));

      // Function to add markers
      function addMarkers(locations) {
        if (!locations || !Array.isArray(locations)) {
          console.error('Invalid locations data');
          window.ReactNativeWebView.postMessage(JSON.stringify({ error: 'Invalid locations data' }));
          return;
        }
        locations.forEach(location => {
          const marker = L.marker([location.latitude, location.longitude]).addTo(map);
          marker.bindPopup('<div class="popup-content"><strong>' + location.title + '</strong><br>' + location.description + '</div>');

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
          addMarkers(locations);
        } catch (error) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ error: 'Invalid message data' }));
        }
      });

      // For iOS
      window.addEventListener('message', function(event) {
        try {
          const locations = JSON.parse(event.data);
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
