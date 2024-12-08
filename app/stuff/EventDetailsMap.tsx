import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface EventDetailsProps {
  event: {
    title: string;
    description: string;
  };
  onClose: () => void;
}

const EventDetailsMap: React.FC<EventDetailsProps> = ({ event, onClose }) => {
  return (
    <View style={styles.container}>
      {/* Transparent Overlay to Close */}
      {/* <TouchableOpacity style={styles.overlay} onPress={onClose} /> */}

      <ScrollView style={styles.scrollContent}>
        {/* Attendees & Invite Section */}
        <View style={styles.inviteSection}>
          <Image
            source={require('../../assets/images/people.png')} // Replace with your attendees image path
            style={styles.attendeesImage}
          />
          <Text style={styles.inviteText}>+20 Going</Text>
          <TouchableOpacity style={styles.inviteButton}>
            <Text style={styles.inviteButtonText}>Invite</Text>
          </TouchableOpacity>
        </View>

        {/* Event Title */}
        <Text style={styles.eventTitle}>{event?.title}</Text>

        {/* Event Details Section */}
        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Image
              source={require('../../assets/images/calendar-icon.png')} // Replace with your calendar icon
              style={styles.detailIcon}
            />
            <View>
              <Text style={styles.detailTextBold}>24 December 2024</Text>
              <Text style={styles.detailText}>Sunday, 4:00 PM - 9:00 PM</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Image
              source={require('../../assets/images/location-icon.png')} // Replace with your location icon
              style={styles.detailIcon}
            />
            <View>
              <Text style={styles.detailTextBold}>Moody Center</Text>
              <Text style={styles.detailText}>2001 Robert Dedman Dr, Austin, TX 78712</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Image
              source={require('../../assets/images/profile-icon.png')} // Replace with your profile icon
              style={styles.detailIcon}
            />
            <View style={styles.organizerRow}>
              <View>
                <Text style={styles.detailTextBold}>Ashwin Pahl</Text>
                <Text style={styles.detailText}>Organizer</Text>
              </View>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* About Event Section */}
        <Text style={styles.sectionTitle}>About Event</Text>
        <Text style={styles.eventDescription}>
          Discover the latest in streetwear and sustainable fashion at this exclusive event, where emerging designers
          and local brands showcase their unique collections.
        </Text>

        {/* Add to Calendar Button */}
        <TouchableOpacity style={styles.addToCalendarButton}>
          <Text style={styles.addToCalendarButtonText}>ADD TO CALENDAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.6,
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50, // Adjust height to suit
    zIndex: 10,
    backgroundColor: 'transparent', // Transparent touchable area
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inviteSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  attendeesImage: {
    width: 90,
    height: 90,
    borderRadius: 200,
  },
  inviteText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  inviteButton: {
    marginLeft: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#FDD7E4',
    borderRadius: 20,
  },
  inviteButtonText: {
    color: '#FF5286',
    fontWeight: 'bold',
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailsSection: {
    marginTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  detailTextBold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  organizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width - 80,
  },
  followButton: {
    backgroundColor: '#F2F2FF',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
  },
  followButtonText: {
    color: '#7A5FFF',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    lineHeight: 20,
  },
  addToCalendarButton: {
    backgroundColor: '#FDD7E4',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  addToCalendarButtonText: {
    color: '#FF5286',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EventDetailsMap;
