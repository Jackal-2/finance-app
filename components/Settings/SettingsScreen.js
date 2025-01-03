import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  Dimensions,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

const SettingsScreen = ({ navigation }) => {
  // Dummy data for user profile
  const user = {
    name: "Phil foden",
    username: "@philfoden82",
  };

  const handleAccountManagement = () => {
    console.log("Navigating to Account Management");
  };

  const handlePaymentMethods = () => {
    console.log("Navigating to Payment Methods");
  };

  const handleSecurity = () => {
    console.log("Navigating to Security");
  };

  const handleLogOut = () => {
    console.log("Logging out...");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require("../../assets/profile.jpg")}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileUsername}>{user.username}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.optionItem}
        onPress={() => navigation.navigate("Account")}
      >
        <MaterialIcons name="account-circle" size={24} color="white" />
        <Text style={styles.optionText}>Account Management</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionItem}
        onPress={() => navigation.navigate("Bank")}
      >
        <MaterialIcons name="payment" size={24} color="white" />
        <Text style={styles.optionText}>Payment Methods</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionItem}
        onPress={() => navigation.navigate("")}
      >
        <MaterialIcons name="compare-arrows" size={24} color="white" />
        <Text style={styles.optionText}>Transfer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionItem}
        onPress={() => navigation.navigate("Security")}
      >
        <MaterialIcons name="security" size={24} color="white" />
        <Text style={styles.optionText}>Security</Text>
      </TouchableOpacity>

      <View style={styles.logOutContainer}>
        <Button
          title="Log Out"
          onPress={() => navigation.navigate("Login")}
          color="red"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",

    paddingHorizontal: width * 0.05, // Adjust padding horizontally based on screen width
  },
  backButton: {
    paddingTop: height * 0.03, // Adjust top padding based on screen height
    paddingBottom: height * 0.02, // Adjust bottom padding based on screen height
  },
  profileSection: {
    alignItems: "center",
    marginBottom: height * 0.05, // Adjust margin bottom based on screen height
  },
  profileImage: {
    width: width * 0.25, // Adjust image size based on screen width
    height: width * 0.25, // Adjust image size based on screen width
    borderRadius: width * 0.125, // Adjust border radius for circular image
    marginBottom: height * 0.02, // Adjust margin bottom based on screen height
  },
  profileName: {
    fontSize: width * 0.05, // Adjust font size based on screen width
    fontWeight: "bold",
    color: "white",
  },
  profileUsername: {
    fontSize: width * 0.04, // Adjust font size based on screen width
    color: "#e6e7e8",
  },
  optionItem: {
    marginBottom: height * 0.03, // Adjust margin bottom based on screen height
    paddingVertical: height * 0.02, // Adjust padding vertically based on screen height
    paddingHorizontal: width * 0.05, // Adjust padding horizontally based on screen width
    backgroundColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8, // Added border-radius for a more polished look
  },
  optionText: {
    fontSize: width * 0.045, // Adjust font size based on screen width
    color: "white",
    marginLeft: width * 0.03, // Adjust margin left based on screen width
  },
  logOutContainer: {
    fontSize: 50,
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    margin: "auto",
    textAlign: "center",
  },
});

export default SettingsScreen;
