import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

const PersonalDetailsScreen = () => {
  const navigation = useNavigation();
  // Initial details
  const [name, setName] = useState("Phil Foden");
  const [email, setEmail] = useState("Philfoden@gmail.com");
  const [dob, setDob] = useState("20-11-1990");
  const [phone, setPhone] = useState("0247568990");

  // Edit modes
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingDob, setIsEditingDob] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  // Handle save changes
  const handleSave = () => {
    setIsEditingName(false);
    setIsEditingEmail(false);
    setIsEditingDob(false);
    setIsEditingPhone(false); // Save phone number change
  };

  return (
    <View style={styles.container}>
      <View style={{ height: "21%" }}>
        <LinearGradient
          colors={["#266A61", "#0F0F0F"]}
          style={styles.background}
        >
          <BlurView intensity={50} style={styles.blurContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ChevronLeft size={40} color="#D3D3D3" />
              </TouchableOpacity>
              <Text style={styles.title}>Personal Details</Text>
            </View>
          </BlurView>
        </LinearGradient>
      </View>

      <View style={{ marginTop: -20 }}>
        {/* Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{name}</Text>
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.verified}>verified</Text>
            <Ionicons name="checkmark-circle" size={15} color="green" />
          </View>
          {isEditingEmail ? (
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Enter your email"
              placeholderTextColor="#B0B0B0"
              autoFocus={true}
            />
          ) : (
            <Text style={styles.value}>{email}</Text>
          )}
          <TouchableOpacity onPress={() => setIsEditingEmail(!isEditingEmail)}>
            <Text style={styles.editButton}>
              {isEditingEmail ? "Cancel" : "Edit"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Phone Number */}
        <View style={styles.inputGroup}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.verified}>verified</Text>
            <Ionicons name="checkmark-circle" size={15} color="green" />
          </View>

          {isEditingPhone ? (
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="Enter your phone number"
              placeholderTextColor="#B0B0B0"
              autoFocus={true}
            />
          ) : (
            <Text style={styles.value}>{phone}</Text>
          )}
          <TouchableOpacity onPress={() => setIsEditingPhone(!isEditingPhone)}>
            <Text style={styles.editButton}>
              {isEditingPhone ? "Cancel" : "Edit"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Date of Birth */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of Birth</Text>
          <Text style={styles.value}>{dob}</Text>
        </View>
      </View>

      {/* Save Button */}
      <View>
        {(isEditingName ||
          isEditingEmail ||
          isEditingDob ||
          isEditingPhone) && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "black",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.05, // Adjust bottom margin based on screen size
  },
  blurContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: height * 0.07, // Adjust padding based on screen size
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.03, // Adjust margin based on screen size
    paddingTop: height * 0.02, // Adjust padding based on screen size
  },
  title: {
    fontSize: width * 0.07, // Adjust font size based on screen width
    color: "#fff",
    fontWeight: "bold",
    paddingLeft: width * 0.03, // Adjust padding based on screen width
  },
  inputGroup: {
    backgroundColor: "#272727",
    padding: width * 0.05, // Adjust padding based on screen width
    marginBottom: 30, // Adjust bottom margin based on screen size
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // for Android
  },
  label: {
    fontSize: width * 0.04, // Adjust font size based on screen width
    fontWeight: "600",
    color: "white",
    marginBottom: height * 0.01, // Adjust margin based on screen height
  },
  verified: {
    fontSize: width * 0.03, // Adjust font size based on screen width
    color: "gray",
    marginBottom: height * 0.01, // Adjust margin based on screen height
    paddingLeft: width * 0.02, // Adjust padding based on screen width
  },
  value: {
    fontSize: width * 0.04, // Adjust font size based on screen width
    color: "#E5E4E2",
    marginBottom: height * 0.01, // Adjust margin based on screen height
  },
  input: {
    height: height * 0.06, // Adjust height based on screen height
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: width * 0.03, // Adjust padding based on screen width
    fontSize: width * 0.04, // Adjust font size based on screen width
    marginBottom: height * 0.02, // Adjust bottom margin based on screen height
  },
  editButton: {
    color: "#007BFF",
    fontSize: width * 0.04, // Adjust font size based on screen width
    fontWeight: "600",
    textAlign: "right",
  },
  saveButton: {
    width: "90%",
    justifyContent: "center",
    backgroundColor: "#007BFF",
    paddingVertical: height * 0.02, // Adjust padding based on screen height
    borderRadius: 8,
    marginTop: height * 0.03, // Adjust top margin based on screen height
    alignItems: "center",
    alignSelf: "center",
    bottom: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: width * 0.05, // Adjust font size based on screen width
    fontWeight: "bold",
  },
});

export default PersonalDetailsScreen;
