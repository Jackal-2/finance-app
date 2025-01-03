import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { DatePickerModal } from "react-native-paper-dates"; // Ensure this library is correctly installed
import { format } from "date-fns";

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(null); // initial dob is null
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleSignUp = () => {
    if (!firstName || !lastName || !dob || !email || !phone) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Here you can handle the actual sign-up logic (API call, validation, etc.)
    Alert.alert("Success", "Sign-up successful");
  };

  const handleDateConfirm = (date) => {
    // Ensure the date passed is a valid Date object
    const validDate = date instanceof Date && !isNaN(date) ? date : new Date(); // fallback to current date if invalid
    setDob(validDate);
    setDatePickerVisible(false);
  };

  const handleDateDismiss = () => {
    setDatePickerVisible(false);
  };

  // Function to safely format the date or return a default string if dob is null or invalid
  const formatDob = (date) => {
    // Ensure the date is valid before formatting
    if (date && date instanceof Date && !isNaN(date)) {
      return format(date, "dd/MM/yyyy");
    } else {
      return "Select Date"; // default string if invalid
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#ccc"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#ccc"
        value={lastName}
        onChangeText={setLastName}
      />
      <Text style={styles.label}>Date of Birth</Text>
      <Button
        title={formatDob(dob)} // Safely format the date
        onPress={() => setDatePickerVisible(true)}
        color="#266A61"
      />
      {isDatePickerVisible && (
        <DatePickerModal
          mode="single"
          visible={isDatePickerVisible}
          date={dob || new Date()} // Ensure dob is a valid Date when opening the picker
          onDismiss={handleDateDismiss}
          onConfirm={handleDateConfirm}
          datePickerComponentStyle={styles.datePicker} // Optional style
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
        onChangeText={setPhone}
      />

      <Button title="Sign Up" onPress={handleSignUp} color="#266A61" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    width: "100%",
    height: 50,
    borderColor: "#266A61",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 15,
    color: "#fff",
    backgroundColor: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "600",
    color: "#266A61",
  },
  datePicker: {
    flex: 1, // This can be adjusted as per your design preferences
    marginVertical: 20,
  },
});

export default SignUpScreen;