import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const NewContactScreen = () => {
    const [username, setUsername] = useState('');

    const handleSaveContact = ({ navigation }) => {
        if (username.trim() === '') {
            Alert.alert('Error', 'Please enter a username.');
        } else {
            Alert.alert('Success', `Contact ${username} added successfully!`);
            setUsername(''); // Clear the input field after saving
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Contact</Text>

            {/* Username Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Username</Text>
                <View style={styles.inputWrapper}>
                    <Text style={styles.atSymbol}>@</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Enter username"
                        placeholderTextColor="#B0B0B0"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveContact}>
                <Text style={styles.saveButtonText}>Save Contact</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F0F0F', // Black background
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#266A61', // Green title
        textAlign: 'center',
        marginBottom: 40,
    },
    inputContainer: {
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        color: '#fff', // White label
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333', // Dark background for input
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    atSymbol: {
        color: '#266A61', // Green "@" symbol
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#fff', // White text input
        paddingHorizontal: 8,
    },
    saveButton: {
        backgroundColor: '#266A61', // Green button
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0F0F0F', // Black text on button
    },
});

export default NewContactScreen;
