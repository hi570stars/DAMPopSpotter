import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const LocationDropdown = () => {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Function to handle text input changes
  const handleChange = (text) => {
    setQuery(text);
    fetchLocations(text);
  };

  // Fetch locations from the OpenCage API
  const fetchLocations = async (query) => {
    if (query.length < 3) {
      setLocations([]);
      return;
    }

    const API_KEY = 'e1fe5137d6544405a547ef4df4a27277';
    const endpoint = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${API_KEY}`;

    try {
      const response = await axios.get(endpoint);
      setLocations(response.data.results);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  // Handle selecting a location from the list
  const handleSelectLocation = (location) => {
    setQuery(location.formatted);
    setSelectedLocation(location);
    setLocations([]); // Clear suggestions after selection
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={handleChange}
        placeholder="Search for a location"
        autoCorrect={false}
      />

      {locations.length > 0 && (
        <FlatList
          data={locations}
          keyExtractor={(item) => item.geometry.lat + ',' + item.geometry.lng}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectLocation(item)}>
              <Text style={styles.itemText}>{item.formatted}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      )}

      {selectedLocation && (
        <Text style={styles.selectedText}>
          Selected Location: {selectedLocation.formatted}
        </Text>
      )}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 200,
  },
  itemText: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  selectedText: {
    marginTop: 10,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default LocationDropdown;
