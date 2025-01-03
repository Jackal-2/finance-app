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


            <TouchableOpacity style={styles.saveButton} onPress={handleSaveContact}>
                <Text style={styles.saveButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F0F0F',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#266A61',
        textAlign: 'center',
        marginBottom: 40,
    },
    inputContainer: {
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        color: '#ccc',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    atSymbol: {
        color: '#266A61',
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#fff',
        paddingHorizontal: 8,
    },
    saveButton: {
        backgroundColor: '#266A61',
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0F0F0F',
    },
});

export default NewContactScreen;
