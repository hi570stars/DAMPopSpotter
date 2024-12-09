import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { mapTemplate } from './mapTemplate';
import EventDetailsMap from '../stuff/EventDetailsMap';

const screenHeight = Dimensions.get('screen').height;

const MapPage = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const webviewRef = useRef(null);

  useEffect(() => {
    const mockLocations = [
      { id: 1, title: 'Turtle Pond', description: 'Turtle Pond', latitude: 30.2869, longitude: -97.7395, icon: 'misc' },
      { id: 2, title: 'Thrift Shop', description: 'Thrift description', latitude: 30.2675, longitude: -97.7435, icon: 'thrift' },
      { id: 3, title: 'Food Festival', description: 'Food description', latitude: 30.27, longitude: -97.7435, icon: 'food' },
      { id: 4, title: 'Market', description: 'Market description', latitude: 30.2673, longitude: -97.74, icon: 'market' },
      { id: 5, title: "Tweedy's Bar", description: 'Band performance.', latitude: 30.295521, longitude: -97.741753, icon: 'music' },
      { id: 6, title: "Moody Center Art Show", description: 'Art Show.', latitude: 30.281099, longitude: -97.730591, icon: 'misc' },
      { id: 7, title: "Downtown Music Festival", description: 'Live Music Night', latitude: 30.267421, longitude: -97.743505, icon: 'music' },
      { id: 8, title: "8", description: 'Band performance.', latitude: 30.295521, longitude: -97.73, icon: 'market' },
      { id: 9, title: "9", description: 'Band performance.', latitude: 30.295521, longitude: -97.741753, icon: 'music' },
      { id: 10, title: "10", description: 'Band performance.', latitude: 30.295521, longitude: -97.741753, icon: 'music' },
      { id: 11, title: "11", description: 'Band performance.', latitude: 30.28, longitude: -97.72, icon: 'music' },
      { id: 12, title: "12", description: 'Band performance.', latitude: 30.28, longitude: -97.741753, icon: 'music' },
      { id: 13, title: "13", description: 'Band performance.', latitude: 30.295521, longitude: -97.741753, icon: 'music' },
      { id: 14, title: "14", description: 'Band performance.', latitude: 30.296519, longitude: -97.742273, icon: 'thrift' },
      { id: 15, title: "15", description: 'Band performance.', latitude: 30.304197, longitude: -97.726689, icon: 'food' },
      { id: 16, title: "16", description: 'Band performance.', latitude: 30.295521, longitude: -97.741753, icon: 'music' },
      { id: 17, title: "17", description: 'Band performance.', latitude: 30.3, longitude: -97.741753, icon: 'music' },
      { id: 18, title: "18", description: 'Band performance.', latitude: 30.2961, longitude: -97.744, icon: 'music' },
      { id: 19, title: "19", description: 'Band performance.', latitude: 30.285, longitude: -97.745, icon: 'music' },
      { id: 20, title: "20", description: 'Band performance.', latitude: 30.270090, longitude: -97.731270, icon: 'food' },
    ];
    setLocations(mockLocations);
    setFilteredLocations(mockLocations);
  }, []);

  useEffect(() => {
    const updatedLocations = filter === 'all' ? locations : locations.filter(loc => loc.icon === filter);
    setFilteredLocations(updatedLocations);
    sendMarkers(updatedLocations);
  }, [filter, locations]);

  const sendMarkers = (locationsToSend) => {
    if (webviewRef.current) {
      const message = JSON.stringify(locationsToSend);
      webviewRef.current.postMessage(message);
    }
  };

  const handleWebViewMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.id && data.title) {
        setSelectedEvent(data);
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error parsing message from WebView:', error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        source={{ html: mapTemplate }}
        style={styles.webview}
        onMessage={handleWebViewMessage}
        javaScriptEnabled
        domStorageEnabled
        onLoad={() => sendMarkers(filteredLocations)}
      />
      <View style={styles.filterContainer}>
        {['music', 'thrift', 'market', 'food', 'misc', 'all'].map(type => (
          <TouchableOpacity
            key={type}
            style={[styles.filterButton, filter === type ? styles.activeButton : null]}
            onPress={() => setFilter(type)}
          >
            <Text style={styles.filterText}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        {/* <View
          style={styles.modalContainer}
          onStartShouldSetResponder={() => {
            closeModal();
            return true;
          }}
        > */}
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={closeModal}>
        </TouchableOpacity>
          {selectedEvent && (
            <EventDetailsMap
              event={selectedEvent}
              onClose={closeModal}
            />
          )}
        {/* </View> */}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  filterContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  filterButton: {
    width: '30%',
    margin: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FFC4C4',
  },
  activeButton: {
    backgroundColor: '#FFB55B',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  modalContainer: {
    flex: .1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
});

export default MapPage;
