import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');  // Keep message state outside any conditional render logic

  const handleResetPassword = () => {
    // Simple email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    // Simulate checking if the email is associated with an account
    const isEmailAssociated = true; // In a real app, you would check this via an API call

    if (isEmailAssociated) {
      // Simulate sending the password reset link
      setMessage('A password reset link has been sent to your email.');
    } else {
      setMessage('This email is not associated with any account.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>

      <Text style={styles.descriptionText}>
        Enter your email address, and we'll send you a link to reset your password. 
        If your email is associated with an account, you'll receive a link to reset your password.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.messageText}>{message}</Text>

      <Button
        title="Reset Password"
        onPress={handleResetPassword}
        color="#266A61" 
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0F0F', 
  },

  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#266A61', 
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    height: 50,
    borderColor: '#266A61', 
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    color: '#fff', 
    width: '100%',
  },

  descriptionText: {
    color: '#ccc',  
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },

  messageText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;
