import React from 'react';
import { Platform } from 'react-native';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import * as Calendar from 'expo-calendar';


const { width } = Dimensions.get('window');

type EventDetailsProps = {
    title: string;
    date: string;
    time: string;
    location: string;
    organizer: string;
    description: string;
    attendeesImage: any;
    headerImage: any;
};

const EventDetails: React.FC<EventDetailsProps> = ({
    title,
    date,
    time,
    location,
    organizer,
    description,
    attendeesImage,
    headerImage,
}) => {
    const addToCalendar = async () => {
        try {
            // Request calendar permissions
            const hasPermission = await Calendar.requestCalendarPermissions();
            if (!hasPermission) return;
    
            // Fetch calendars without requiring REMINDERS permissions
            const calendars = await Calendar.getCalendarsAsync();
            console.log('Available Calendars:', calendars);
    
            // Find or create a default calendar
            let calendarId;
            const defaultCalendar = calendars.find(
                (cal) => cal.source && cal.source.name === 'Default'
            );
    
            if (defaultCalendar) {
                calendarId = defaultCalendar.id; // Use the default calendar if available
            } else {
                // Create a new calendar if no default calendar exists
                const newCalendar = await Calendar.createCalendarAsync({
                    title: 'Popspot Events',
                    color: 'blue',
                    entityType: Calendar.EntityTypes.EVENT,
                    source: {
                        name: 'Expo Calendar',
                        isLocalAccount: true,
                    },
                    name: 'Popspot Calendar',
                    ownerAccount: 'personal',
                    accessLevel: Calendar.CalendarAccessLevel.OWNER,
                });
                calendarId = newCalendar;
            }
    
            // Define event times
            const startDateTime = new Date('2025-01-05T18:00:00'); // January 5th, 2025, 6:00 PM
            const endDateTime = new Date('2025-01-05T23:00:00'); // January 5th, 2025, 11:00 PM
    
            // Add the event to the calendar
            await Calendar.createEventAsync(calendarId, {
                title: 'Popspot Event',
                location: 'Location Address Here',
                startDate: startDateTime,
                endDate: endDateTime,
                timeZone: 'GMT', // Update for your timezone if needed
                notes: 'Event Description Here',
            });
    
            Alert.alert('Success', 'Event added to your calendar!');
        } catch (error) {
            console.error('Error adding event:', error);
            Alert.alert('Error', 'Failed to add event to calendar.');
        }
    };    
    
      

    return (
        <ScrollView style={styles.container}>
            {/* Header Image */}
            <Image source={headerImage} style={styles.headerImage} />

            {/* Attendees & Invite Section */}
            <View style={styles.inviteSection}>
                <Image source={attendeesImage} style={styles.attendeesImage} />
                <Text style={styles.inviteText}>+20 Going</Text>
                <TouchableOpacity style={styles.inviteButton}>
                    <Text style={styles.inviteButtonText}>Invite</Text>
                </TouchableOpacity>
            </View>

            {/* Event Title */}
            <Text style={styles.eventTitle}>{title}</Text>

            {/* Event Details Section */}
            <View style={styles.detailsSection}>
                <View style={styles.detailRow}>
                    <Image
                        source={require('../../assets/images/calendar-icon.png')} // Replace with your calendar icon path
                        style={styles.detailIcon}
                    />
                    <View>
                        <Text style={styles.detailTextBold}>{date}</Text>
                        <Text style={styles.detailText}>{time}</Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <Image
                        source={require('../../assets/images/location-icon.png')} // Replace with your location icon path
                        style={styles.detailIcon}
                    />
                    <View>
                        <Text style={styles.detailTextBold}>{location}</Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <Image
                        source={require('../../assets/images/profile-icon.png')} // Replace with your profile icon path
                        style={styles.detailIcon}
                    />
                    <View style={styles.organizerRow}>
                        <View>
                            <Text style={styles.detailTextBold}>{organizer}</Text>
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
            <Text style={styles.eventDescription}>{description}</Text>

            {/* Add to Calendar Button */}
            <TouchableOpacity style={styles.addToCalendarButton} onPress={addToCalendar}>
                <Text style={styles.addToCalendarButtonText}>ADD TO CALENDAR</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerImage: {
        width: '100%',
        height: 250,
    },
    inviteSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
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
        marginHorizontal: 20,
        marginTop: 10,
    },
    detailsSection: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
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
        marginHorizontal: 20,
        marginTop: 20,
    },
    eventDescription: {
        fontSize: 14,
        color: '#666',
        marginHorizontal: 20,
        marginTop: 10,
        lineHeight: 20,
    },
    addToCalendarButton: {
        backgroundColor: '#FDD7E4',
        paddingVertical: 15,
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 10,
    },
    addToCalendarButtonText: {
        color: '#FF5286',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default EventDetails;
