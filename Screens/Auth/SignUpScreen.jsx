import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { DatePickerModal } from "react-native-paper-dates"; // Ensure this library is correctly installed
import { format } from "date-fns";
import { enGB } from "date-fns/locale"; // Import the desired locale from date-fns

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(null); // initial dob is null
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState(""); // New state for username
  const [password, setPassword] = useState(""); // New state for password
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  // Regular expressions for validation
  const nameRegex = /^[A-Za-z-]*$/;  // Only letters and hyphens for names
  const emailRegex = /\S+@\S+\.\S+/; // Email validation
  const phoneRegex = /^[0-9]{10}$/; // Phone number with exactly 10 digits

  const handleSignUp = () => {
    // Validate fields
    if (!firstName || !lastName || !dob || !email || !phone || !username || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // First and last name validation
    if (!nameRegex.test(firstName)) {
      Alert.alert("Error", "First name can only contain letters and hyphens.");
      return;
    }

    if (!nameRegex.test(lastName)) {
      Alert.alert("Error", "Last name can only contain letters and hyphens.");
      return;
    }

    // Email validation
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    // Phone number validation
    if (!phoneRegex.test(phone)) {
      Alert.alert("Error", "Phone number must be 10 digits.");
      return;
    }

    // Password and confirm password check
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // Here you can handle the actual sign-up logic (API call, validation, etc.)
    Alert.alert("Success", "Sign-up successful");
  };

  const handleDateConfirm = (date) => {
    // Ensure the date passed is a valid Date object
    const validDate = date instanceof Date && !isNaN(date) ? date : new Date(); // fallback to current date if invalid
    setDob(validDate); // Update dob with the selected date
    setDatePickerVisible(false); // Hide the date picker modal after selection
  };

  const handleDateDismiss = () => {
    setDatePickerVisible(false); // Dismiss the date picker modal
  };

  // Function to safely format the date or return a default string if dob is null or invalid
  const formatDob = (date) => {
    if (date && date instanceof Date && !isNaN(date)) {
      return format(date, "dd/MM/yyyy"); // Format the selected date as dd/MM/yyyy
    } else {
      return "Select Date"; // default string if dob is null or not a valid date
    }
  };

  // Prevent numbers and non-letter characters in First and Last Name fields
  const handleNameChange = (setter) => (text) => {
    if (nameRegex.test(text)) {
      setter(text);
    }
  };

  // Function to handle phone number input (only numeric and max 10 digits)
  const handlePhoneChange = (text) => {
    // Remove any non-numeric characters
    const numericText = text.replace(/[^0-9]/g, "");
    
    // Only allow up to 10 digits
    if (numericText.length <= 10) {
      setPhone(numericText);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#ccc"
        value={firstName}
        onChangeText={handleNameChange(setFirstName)} // Use custom handler to validate input
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#ccc"
        value={lastName}
        onChangeText={handleNameChange(setLastName)} // Use custom handler to validate input
      />

      {/* Date of Birth Section */}
      <Text style={styles.label}>Date of Birth</Text>
      <View style={{ alignItems: "flex-start", paddingVertical: 15 }}>
        <Button
          title={formatDob(dob)} // Safely format the date or show 'Select Date' as placeholder
          onPress={() => setDatePickerVisible(true)} // Show the date picker modal
          color="#266A61"
        />
      </View>
      {isDatePickerVisible && (
        <DatePickerModal
          mode="single"
          visible={isDatePickerVisible}
          date={dob || new Date()} // Ensure dob is a valid Date when opening the picker
          onDismiss={handleDateDismiss} // Dismiss the date picker when clicked outside
          onConfirm={handleDateConfirm} // Confirm the selected date
          locale="en" // Specify the locale (use 'en' for English)
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#ccc"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={handlePhoneChange} // Use the custom handler for phone number
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#ccc"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#0F0F0F",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#266A61",
  },
  input: {
    height: 50,
    borderColor: "#266A61",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    color: "#fff",
    backgroundColor: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "600",
    color: "#ccc",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#266A61",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignUpScreen;
