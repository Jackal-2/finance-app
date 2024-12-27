// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = ({ navigation }) => {
        // Logic for handling login can be added here
        console.log('Logging in with:', email, password);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#ccc"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#ccc"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 20,
    },
    title: {
        fontSize: 32,
        color: '#fff',
        marginBottom: 40,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#266A61', // Green border color
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 15,
        color: '#fff',
        backgroundColor: '#333',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#266A61', // Green background
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#000', // Black text for contrast
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotPasswordText: {
        color: '#266A61', // Green text
        marginTop: 10,
        textDecorationLine: 'underline',
    },
    signupText: {
        color: '#266A61', // Green text
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
