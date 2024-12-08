import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Alert,
    FlatList,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker from 'react-datepicker'; // For web
import 'react-datepicker/dist/react-datepicker.css'; // For web styling
import RNPickerSelect from 'react-native-picker-select';


const OPENCAGE_API_KEY = '65fee95c25e447cc9f1badc7b478c37d'; // Replace with your OpenCage API key
const API_URL = `https://api.opencagedata.com/geocode/v1/json`;

const CreatePage: React.FC = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [time, setTime] = useState<Date | null>(null);
    const [category, setCategory] = useState<string>('Categories'); // Default category
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false); // Dropdown visibility

    

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

    // Function to fetch location suggestions using OpenCage API
    const fetchLocationSuggestions = async (query: string) => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}?q=${encodeURIComponent(query)}&key=${OPENCAGE_API_KEY}&limit=5`
            );
            const data = await response.json();

            if (data && data.results) {
                setSuggestions(data.results);
            }
        } catch (error) {
            console.error('Error fetching location suggestions:', error);
        }
    };

    // Function to handle selecting a location from suggestions
    const handleLocationSelect = (suggestion: any) => {
        setLocation(suggestion.formatted); // Set the formatted address
        setCoordinates({
            lat: suggestion.geometry.lat,
            lon: suggestion.geometry.lng,
        }); // Set coordinates
        setSuggestions([]); // Clear suggestions after selection
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
            coordinates,
            time: time.toISOString(), // Convert to ISO string for consistency
            category, // Include the selected category
        };

        console.log('New Pop-Up:', newPopUp);
        Alert.alert('Success', 'Pop-up created successfully!');
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>Popspotter</Text>
            </View>

            <View>
                <Text style={styles.title}>Create a new Pop Up event</Text>
            </View>

            {/* Input Form */}
            <View style={styles.form}>
                {/* Image Upload */}
                <TouchableOpacity style={styles.card} onPress={pickImage}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.cardImage} />
                    ) : (
                        <>
                            <Image
                                source={require('../../assets/images/camera-icon.png')} // Replace with your location icon path
                                style={styles.detailIcon}
                            />
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

                <View style={styles.formItem}>
                    {/* <Text style={styles.formLabel}>Category:</Text> */}
                    <TouchableOpacity
                        style={styles.input1}
                        onPress={() => setIsDropdownVisible(!isDropdownVisible)}
                    >
                        <Text style={{ color: category === 'Categories' ? '#aaa' : '#000', fontSize: 16 }}>
                            {category || 'Select Category'}
                        </Text>
                    </TouchableOpacity>

                    {isDropdownVisible && (
                        <View style={styles.dropdown}>
                            {['Thrift', 'Music', 'Food', 'Market', 'Misc'].map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setCategory(item);
                                        setIsDropdownVisible(false);
                                    }}
                                >
                                    <Text style={styles.dropdownItemText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Location Input with Autocomplete */}
                <View style={styles.autocompleteContainer}>
                    <TextInput
                        style={styles.input1}
                        placeholder="Location"
                        placeholderTextColor="#aaa"
                        value={location}
                        onChangeText={(text) => {
                            setLocation(text);
                            fetchLocationSuggestions(text); // Fetch suggestions on text input
                        }}
                    />
                    {suggestions.length > 0 && (
                        <FlatList
                            data={suggestions}
                            keyExtractor={(item, index) => `${item.geometry.lat}-${index}`}
                            renderItem={({ item }) => (
                                <TouchableWithoutFeedback
                                    onPress={() => handleLocationSelect(item)}
                                >
                                    <View style={styles.suggestionItem}>
                                        <Text>{item.formatted}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                            style={styles.suggestionsList}
                        />
                    )}
                </View>

                {/* Date/Time Picker */}
                {Platform.OS === 'web' ? (
                    <DatePicker
                        selected={time}
                        onChange={(date) => {
                            setTime(date as Date); // Use a type assertion to assume `date` is of type `Date`
                        }}
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
                            onConfirm={(date) => {
                                setTime(date);
                                setShowDatePicker(false);
                            }}
                            onCancel={() => setShowDatePicker(false)}
                        />
                    </>
                )}
            </View>
            {/* Category Dropdown */}
            




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
        backgroundColor: '#FADFDF',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 45
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff9f1c',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: "center",
        marginBottom: 30
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
        marginBottom: 30,
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
        color: '#000',
        fontSize: 14,
        textAlign: 'center',
    },
    input: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: 5,
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
        marginBottom: 100,
    },
    addButtonText: {
        fontSize: 18,
        color: '#fff',
        
    },
    input1: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: 5,
        justifyContent: 'center',
    },
    autocompleteContainer: {
        position: 'relative',
        width: '90%',
        
    },
    suggestionsList: {
        maxHeight: 150,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginTop: -10,
        zIndex: 1, // Ensure the suggestions list is above other components
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    detailIcon: {
        width: 50,
        height: 40,
        margin: 10,
    },
    formItem: {
        width: '90%',
        // marginBottom: 15,
        // marginLeft: 16
    },
    dropdown: {
        width: '90%',
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 8,
        marginTop: 5,
        zIndex: 1000,
        position: 'absolute',
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dropdownItemText: {
        fontSize: 16,
        color: '#000',
    },
  
    
      
});


export default CreatePage;