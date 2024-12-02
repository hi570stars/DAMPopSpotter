import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

interface Event {
    id: string;
    name: string;
    image: string;
}

interface User {
    username: string;
    savedEvents: Event[];
    sharedToCalendar: Event[];
}

const mockUser: User = {
    username: 'user123',
    savedEvents: [
        { id: '1', name: 'Food Truck Fest', image: 'https://via.placeholder.com/100' },
        { id: '2', name: 'Art Show', image: 'https://via.placeholder.com/100' },
        { id: '3', name: 'Live Music', image: 'https://via.placeholder.com/100' },
        { id: '4', name: 'Craft Market', image: 'https://via.placeholder.com/100' },
    ],
    sharedToCalendar: [
        { id: '5', name: 'Yoga Class', image: 'https://via.placeholder.com/100' },
        { id: '6', name: 'Cooking Demo', image: 'https://via.placeholder.com/100' },
    ],
};

const user: React.FC = () => {
    const [userName] = useState<string>(mockUser.username);
    const [savedEvents] = useState<Event[]>(mockUser.savedEvents);
    const [sharedToCalendar] = useState<Event[]>(mockUser.sharedToCalendar);

    const renderEventItem = ({ item }: { item: Event }) => (
        <View style={styles.eventBox}>
            <Image style={styles.eventImage} source={{ uri: item.image }} />
            <Text style={styles.eventName}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>Popspot</Text>
                <Text style={styles.location}>Austin</Text>
            </View>

            {/* User Info */}
            <View style={styles.userInfo}>
                <Text style={styles.userName}>@{userName}</Text>
                <TouchableOpacity>
                    <Text style={styles.link}>edit profile</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.link}>see friends</Text>
                </TouchableOpacity>
            </View>

            {/* Saved Events Section */}
            <Text style={styles.sectionTitle}>Saved</Text>
            <FlatList
                data={savedEvents}
                keyExtractor={(item) => item.id}
                renderItem={renderEventItem}
                numColumns={4}
                contentContainerStyle={styles.grid}
            />

            {/* Shared to Calendar Section */}
            <Text style={styles.sectionTitle}>Shared to Calendar</Text>
            <FlatList
                data={sharedToCalendar}
                keyExtractor={(item) => item.id}
                renderItem={renderEventItem}
                numColumns={4}
                contentContainerStyle={styles.grid}
            />

            {/* Add Event Button */}
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff9f1c',
    },
    location: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff9f1c',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        fontSize: 14,
        color: '#007bff',
        marginLeft: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    eventBox: {
        width: 70,
        height: 70,
        margin: 5,
        backgroundColor: '#ffc6c7',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    eventImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    eventName: {
        fontSize: 12,
        marginTop: 5,
        textAlign: 'center',
    },
    addButton: {
        width: 60,
        height: 60,
        backgroundColor: '#ff5252',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    addButtonText: {
        fontSize: 30,
        color: '#fff',
    },
});

export default user;
