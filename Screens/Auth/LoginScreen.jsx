import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); // To track email validation error

  // Ensure that useNavigation is always called at the top level
  const navigation = useNavigation();

  // Regular expression for basic email validation (contains "@" and domain)
  const validateEmail = (email) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address (e.g., user@domain.com).");
      return; // Prevent login if email is invalid
    }

    setEmailError(""); // Reset error if email is valid
    console.log("Logging in with:", email, password);
    // Navigate to home or desired screen after login
    navigation.navigate("Home");  // Example navigation to 'Home'
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Text style={styles.title}>Login</Text>

      {/* Email input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
      />
      {/* Display error message for invalid email */}
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* Password input */}
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

      <View
        style={{
          width: "100%",
          marginBottom: 10,
        }}
      >
        <TouchableOpacity>
          <Text
            style={styles.forgotPasswordText}
            onPress={() => navigation.navigate("Forgot Password")}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          position: "absolute",
          bottom: 70,
          alignSelf: "center",
        }}
      >
        <Text style={{ color: "#266A61" }}>Not a member yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F0F0F",
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: "#266A61",
    marginBottom: 40,
    fontWeight: "bold",
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
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#266A61",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "#266A61",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  signupText: {
    color: "white",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "white",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default LoginScreen;
