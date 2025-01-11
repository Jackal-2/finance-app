import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { ChevronLeft } from "lucide-react-native";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

const PersonalDetailsScreen = ({ navigation }) => {
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
      <LinearGradient colors={["#266A61", "#0F0F0F"]} style={styles.background}>
        <BlurView intensity={50} style={styles.blurContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeft color="white" size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>Personal Details</Text>
          </View>
        </BlurView>
      </LinearGradient>
      <View style={{ paddingHorizontal: width * 0.025 }}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{name}</Text>
        </View>

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

        {/* Save Button */}
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
    flex: 1,
    backgroundColor: "#0F0F0F",
    // marginBottom: height * 0.1,
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
    // marginBottom: height * 0.03,
  },
  title: {
    fontSize: width * 0.07,
    color: "#fff",
    fontWeight: "bold",
    paddingLeft: width * 0.03,
  },
  inputGroup: {
    backgroundColor: "#28282B",
    padding: width * 0.05,
    marginBottom: height * 0.025,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: width * 0.045,
    fontWeight: "600",
    color: "white",
    marginBottom: height * 0.01,
  },
  verified: {
    fontSize: width * 0.03,
    color: "#D3D3D3",
    marginBottom: height * 0.01,
    paddingLeft: width * 0.02,
  },
  value: {
    fontSize: width * 0.04,
    color: "#D3D3D3",
    fontWeight: "500",
    marginBottom: height * 0.01,
  },
  input: {
    height: height * 0.06,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: width * 0.03,
    fontSize: width * 0.04,
    marginBottom: height * 0.02,
  },
  editButton: {
    color: "#007BFF",
    fontSize: width * 0.04,
    fontWeight: "600",
    textAlign: "right",
  },
  saveButton: {
    backgroundColor: "#007BFF",
    paddingVertical: height * 0.02,
    borderRadius: 8,
    marginTop: height * 0.03,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
});

export default PersonalDetailsScreen;
