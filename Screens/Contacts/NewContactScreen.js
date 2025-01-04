import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { ChevronLeft } from "lucide-react-native";

const { width, height } = Dimensions.get("window");

const NewContactScreen = () => {
  const [username, setUsername] = useState("");

  const handleSaveContact = ({ navigation }) => {
    if (username.trim() === "") {
      Alert.alert("Error", "Please enter a username.");
    } else {
      Alert.alert("Success", `Contact ${username} added successfully!`);
      setUsername(""); // Clear the input field after saving
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#266A61", "#0F0F0F"]} style={styles.background}>
        <BlurView intensity={50} style={styles.blurContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeft color="white" size={30} />
            </TouchableOpacity>
            <Text style={styles.topBarTitle}>Add New Contact</Text>
          </View>
        </BlurView>
      </LinearGradient>
      {/* <Text style={styles.title}>Add New Contact</Text> */}
      <View style={{ paddingHorizontal: 15 }}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  background: {
    height: "14%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.05,
  },
  blurContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: height * 0.07,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingTop: 9,
    // marginBottom: height * 0.03,
  },
  topBarTitle: {
    fontSize: width * 0.07,
    color: "#fff",
    fontWeight: "bold",
    paddingLeft: width * 0.03,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#266A61",
    textAlign: "center",
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  atSymbol: {
    color: "#266A61",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#fff",
    paddingHorizontal: 8,
  },
  saveButton: {
    backgroundColor: "#266A61",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 15,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F0F0F",
  },
});

export default NewContactScreen;
