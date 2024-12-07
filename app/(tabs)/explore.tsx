import React from 'react';
import { View, Image, StyleSheet, FlatList, Dimensions, Text } from 'react-native';

const { height, width } = Dimensions.get('window');

const exploreItems = [
    {
        id: '1',
        source: require('../../assets/images/explore1.png'),
        caption: 'Discover the beauty of nature',
    },
    {
        id: '2',
        source: require('../../assets/images/explore2.png'),
        caption: 'Explore the vibrant cityscapes',
    },
    // {
    //     id: '3',
    //     source: require('./path-to-your-image3.jpg'),
    //     caption: 'Dive into the serene beaches',
    // },
];

const ExplorePage: React.FC = () => {
    const renderItem = ({ item }: { item: { id: string; source: any; caption: string } }) => (
        <View style={styles.itemContainer}>
            <Image source={item.source} style={styles.image} resizeMode="cover" />
            <View style={styles.overlay}>
                <Text style={styles.caption}>{item.caption}</Text>
            </View>
        </View>
    );

    return (
        <FlatList
            data={exploreItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            style={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Dark background for an immersive experience
    },
    itemContainer: {
        height, // Full-screen height for each item
        width,  // Full-screen width for each item
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 8,
    },
    caption: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ExplorePage;
