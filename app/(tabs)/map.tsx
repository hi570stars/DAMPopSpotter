// src/MapPage.js (Final Version)

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { mapTemplate } from './mapTemplate'; // Import the HTML template
import axios from 'axios';

const MapPage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const webviewRef = useRef(null);

  useEffect(() => {
    // Fetch data
    // Uncomment and configure the Axios request after setting up your API
    /*
    axios.get('https://your-api-endpoint.com/api/locations')
      .then(response => {
        setLocations(response.data);
        setLoading(false);
        // Markers will be sent after receiving 'Map Initialized'
      })
      .catch(error => {
        console.error('Error fetching location data:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
        setError(errorMessage);
        setLoading(false);
      });
    */

    // Temporary mock data for testing
    const mockLocations = [
      {
        id: 1,
        title: 'Mock Location One',
        description: "Turtle Pond",
        latitude: 30.2869,
        longitude: -97.7395,
      },
      {
        id: 2,
        title: 'Mock Location Two',
        description: "Mock description",
        latitude: 30.2675,
        longitude: -97.7435,
      },
    ];
    setLocations(mockLocations);
    setLoading(false);
  }, []);

  const sendMarkers = (locations) => {
    if (webviewRef.current) {
      const message = JSON.stringify(locations);
      webviewRef.current.postMessage(message);
    }
  };

  const handleWebViewMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.error) {
        console.error('Error from WebView:', data.error);
        Alert.alert('WebView Error', data.error);
        return;
      }
      if (data.status === 'Map Initialized') {
        console.log('Map initialized');
        sendMarkers(locations);
        return;
      }
      if (data.log) {
        console.log('Log from WebView:', data.log);
        return;
      }
      if (data.id && data.title) {
        Alert.alert('Marker Clicked', `ID: ${data.id}\nTitle: ${data.title}`);
      }
    } catch (error) {
      console.error('Error parsing message from WebView:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#A1CEDC" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error loading map data: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        source={{ html: mapTemplate }}
        style={styles.webview}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

export default MapPage;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container fills the screen
  },
  webview: {
    flex: 1, // Allows WebView to expand and fill the container
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});
