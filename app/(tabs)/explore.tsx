import React from 'react';
import { FlatList, StyleSheet, View, Dimensions } from 'react-native';
import EventDetails from '../stuff/EventDetails'; // Import the EventDetails component

const { height } = Dimensions.get('window');

const eventData = [
    {
        id: '1',
        title: 'Moody Center Art Show',
        date: '24 December 2024',
        time: 'Sunday, 4:00 PM - 9:00 PM',
        location: '2001 Robert Dedman Dr, Austin, TX 78712',
        organizer: 'Ashwin Pahl',
        description:
            'Discover the latest in streetwear and sustainable fashion at this exclusive event, where emerging designers and local brands showcase their unique collections.',
        attendeesImage: require('../../assets/images/people.png'), // Correct attendees image
        headerImage: require('../../assets/images/popup1.png'), // Correct header image
    },
    {
        id: '2',
        title: 'Downtown Music Festival',
        date: '5 January 2025',
        time: 'Friday, 6:00 PM - 11:00 PM',
        location: '500 Congress Ave, Austin, TX 78701',
        organizer: 'Riley Thompson',
        description:
            'Join us for an unforgettable night of live music featuring local and international artists in the heart of downtown Austin.',
        attendeesImage: require('../../assets/images/people.png'), // Correct attendees image
        headerImage: require('../../assets/images/header2.jpg'), // Correct header image
    },
    {
        id: '3',
        title: 'Foodies Paradise Fest',
        date: '14 February 2025',
        time: 'Saturday, 12:00 PM - 8:00 PM',
        location: 'Zilker Park, Austin, TX 78704',
        organizer: 'Jessica Wong',
        description:
            'Indulge in a culinary adventure at Foodies Paradise Fest, where top chefs and food vendors come together to showcase mouthwatering dishes.',
        attendeesImage: require('../../assets/images/people.png'), // Correct attendees image
        headerImage: require('../../assets/images/header3.jpg'), // Correct header image
    },
];

const ExplorePage: React.FC = () => {
    const renderItem = ({ item }: { item: typeof eventData[0] }) => (
        <View style={styles.pageContainer}>
            <EventDetails
                title={item.title}
                date={item.date}
                time={item.time}
                location={item.location}
                organizer={item.organizer}
                description={item.description}
                attendeesImage={item.attendeesImage}
                headerImage={item.headerImage}
            />
        </View>
    );

    return (
        <FlatList
            data={eventData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            pagingEnabled // Enable paging for vertical snapping
            showsVerticalScrollIndicator={false} // Hide the vertical scroll indicator for a clean look
            snapToInterval={height} // Ensure items snap to the full height of the screen
            decelerationRate="fast" // Faster deceleration for a snappy feel
            bounces={false} // Prevents bouncing at the start/end of the list
        />
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        height, // Full screen height for each page
        flex: 1, // Ensure the page takes up the full available space
    },
});

export default ExplorePage;
