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
      const map = L.map('map', { zoomControl: false }).setView([30.2850, -97.7335], 15); // Disable zoom controls

      // Add a slightly minimalistic tile layer (CartoDB Positron Hybrid)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      // Add underlying terrain from OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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

        // Custom icons for markers
        const iconMapping = {
          music: L.icon({
            iconUrl: 'https://i.imgur.com/2KREiK8.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          }),
          market: L.icon({
            iconUrl: 'https://i.imgur.com/2KREiK8.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          }),
          thrift: L.icon({
            iconUrl: 'https://i.imgur.com/2KREiK8.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          }),
          food: L.icon({
            iconUrl: 'https://i.imgur.com/2KREiK8.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          }),
          misc: L.icon({
            iconUrl: 'https://i.imgur.com/2KREiK8.png',
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
