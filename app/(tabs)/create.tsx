import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';

const CreatePage: React.FC = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [time, setTime] = useState<string>('');

    // Function to pick an image
    const pickImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 1,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User canceled image picker');
                } else if (response.errorCode) {
                    Alert.alert('Error', response.errorMessage || 'Something went wrong');
                } else if (response.assets && response.assets.length > 0) {
                    const selectedImage = response.assets[0];
                    setImageUri(selectedImage.uri || null);
                }
            }
        );
    };

    const handleSubmit = () => {
        if (!title || !location || !time) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }

        const newPopUp = {
            image: imageUri,
            title,
            link,
            location,
            time,
        };

        console.log('New Pop-Up:', newPopUp);
        Alert.alert('Success', 'Pop-up created successfully!');
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>Popspot</Text>
                <Text style={styles.location}>Austin</Text>
            </View>

            {/* User Info */}
            <View style={styles.userInfo}>
                <Text style={styles.userName}>@user123</Text>
                <TouchableOpacity>
                    <Text style={styles.link}>edit profile</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.link}>see friends</Text>
                </TouchableOpacity>
            </View>

            {/* Input Form */}
            <View style={styles.form}>
                {/* Image Upload */}
                <TouchableOpacity style={styles.card} onPress={pickImage}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.cardImage} />
                    ) : (
                        <>
                            <Icon name="image" size={50} color="#fff" style={styles.cardIcon} />
                            <Text style={styles.cardText}>Tap to upload photo</Text>
                        </>
                    )}
                </TouchableOpacity>

                {/* Title Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    placeholderTextColor="#aaa"
                    value={title}
                    onChangeText={setTitle}
                />

                {/* Link Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Link (optional)"
                    placeholderTextColor="#aaa"
                    value={link}
                    onChangeText={setLink}
                />

                {/* Location Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Location"
                    placeholderTextColor="#aaa"
                    value={location}
                    onChangeText={setLocation}
                />

                {/* Time Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Time (e.g., 2024-11-16 18:00)"
                    placeholderTextColor="#aaa"
                    value={time}
                    onChangeText={setTime}
                />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                <Text style={styles.addButtonText}>Create</Text>
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
        marginBottom: 10,
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff9f1c',
    },
    link: {
        fontSize: 14,
        color: '#007bff',
        marginLeft: 10,
    },
    form: {
        flex: 1,
        alignItems: 'center',
    },
    card: {
        width: 200,
        height: 200,
        backgroundColor: '#d32f2f',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    cardIcon: {
        marginBottom: 10,
    },
    cardText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    input: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: 15,
    },
    addButton: {
        width: 100,
        height: 50,
        backgroundColor: '#ff5252',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        fontSize: 18,
        color: '#fff',
    },
});

export default CreatePage;
