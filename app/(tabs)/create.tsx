import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Alert,
    Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker from 'react-datepicker'; // For web
import 'react-datepicker/dist/react-datepicker.css'; // For web styling

const CreatePage: React.FC = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [time, setTime] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    // Function to pick an image
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission Required', 'You need to enable permissions to access the photo library.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            setImageUri(result.assets[0].uri);
        }
    };

    // Function to handle date selection
    const handleDateChange = (selectedDate: Date) => {
        setShowDatePicker(false);
        setTime(selectedDate); // Save the selected date
    };

    // Function to handle form submission
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
            time: time.toISOString(), // Convert to ISO string for consistency
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

            {/* Input Form */}
            <View style={styles.form}>
                {/* Image Upload */}
                <TouchableOpacity style={styles.card} onPress={pickImage}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.cardImage} />
                    ) : (
                        <>
                            <Text style={styles.cardIcon}>📷</Text>
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

                {/* Date/Time Picker */}
                {Platform.OS === 'web' ? (
                    <DatePicker
                        selected={time}
                        onChange={(date: Date) => setTime(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        className="react-datepicker-input"
                    />
                ) : (
                    <>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={{ color: time ? '#000' : '#aaa' }}>
                                {time
                                    ? time.toLocaleString('en-US', {
                                          dateStyle: 'medium',
                                          timeStyle: 'short',
                                      })
                                    : 'Select Date & Time'}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={showDatePicker}
                            mode="datetime"
                            onConfirm={handleDateChange}
                            onCancel={() => setShowDatePicker(false)}
                        />
                    </>
                )}
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
        fontSize: 50,
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
        justifyContent: 'center',
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
