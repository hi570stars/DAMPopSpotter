import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TextInput, TouchableOpacity } from "react-native";

const App = () => {
  const popUpEvents = [
    { id: "1", image: require("../../assets/images/first.jpeg") },
    { id: "2", image: require("../../assets/images/second.jpeg") },
    { id: "3", image: require("../../assets/images/third.jpeg") },
  ];

  const thriftEvents = [
    { id: "4", image: require("../../assets/images/fourth.jpeg") },
    { id: "5", image: require("../../assets/images/fifth.jpeg") },
    { id: "6", image: require("../../assets/images/first.jpeg") },
  ];

  const friendActivities = [
    { id: "7", image: require("../../assets/images/seventh.jpeg") },
    { id: "8", image: require("../../assets/images/eighth.jpeg") },
    { id: "9", image: require("../../assets/images/ninth.jpeg") },
  ];

  // State to track bookmarked items
  const [bookmarked, setBookmarked] = useState<{ id: string; image: any }[]>([]);

  // Toggle bookmark state for a specific image
  const toggleBookmark = (item: { id: string; image: any }) => {
    setBookmarked((prev) => {
      const isBookmarked = prev.some((bookmark) => bookmark.id === item.id);
      if (isBookmarked) {
        // Remove if already bookmarked
        return prev.filter((bookmark) => bookmark.id !== item.id);
      } else {
        // Add if not bookmarked
        return [...prev, item];
      }
    });
  };
  
  const renderImages = (data: { id: string; image: any }[], textOverlay: string[]) => (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>{textOverlay[index]}</Text>
          </View>
          <TouchableOpacity
            style={styles.bookmark}
            onPress={() => toggleBookmark(item)}
          >
            {/* Check if the image is bookmarked */}
            {bookmarked.some((bookmark) => bookmark.id === item.id) ? (
              <Text style={styles.filledBookmark}>♥</Text> // Filled bookmark
            ) : (
              <Text style={styles.emptyBookmark}>♡</Text> // Empty bookmark
            )}
          </TouchableOpacity>
        </View>
      )}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Pop Spotter</Text>
        <TextInput style={styles.searchBar} placeholder="Search for events..." />
        <Text style={styles.location}>Austin, USA</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pop-up shows near you today</Text>
        {renderImages(popUpEvents, ["Outdoor @ Rio","Nespresso","Spin the Wheel"])}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Closest thrift events</Text>
        {renderImages(thriftEvents, ["Joyful Finds","Thrift Shift","Outdoor @ Rio"])}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What your friends are up to</Text>
        {renderImages(friendActivities, ["Open Air Bazaar","Vintage Corner","Urban Oasis"])}
      </View>

      {/* Bookmarked Images Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bookmarked Events</Text>
        {bookmarked.length > 0 ? (
          <FlatList
            data={bookmarked}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style = {styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
              </View>
            )}
          />
        ) : (
          <Text style={styles.noBookmarks}>No bookmarks yet</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FADFDF",
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFA07A",
    marginBottom: 8,
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: "#555",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  noBookmarks: {
    fontSize: 16,
    color: "#555",
    fontStyle: "italic",
  },
  imageContainer: {
    position: "relative",
    marginRight: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  overlayText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  bookmark: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 12,
    padding: 4,
  },
  filledBookmark: {
    fontSize: 16,
    color: "#FFA07A",
  },
  emptyBookmark: {
    fontSize: 16,
    color: "#555",
  },
});

export default App;
