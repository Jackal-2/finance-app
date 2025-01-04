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
    <View style={styles.container}>
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
        onPress={() => navigation.navigate("Transfer")}
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
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: "red", fontSize: 20, }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  backButton: {
    paddingTop: height * 0.03,
    paddingBottom: height * 0.02,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: height * 0.05,
    marginTop: 40,
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    marginBottom: height * 0.02,
  },
  profileName: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "white",
  },
  profileUsername: {
    fontSize: width * 0.04,
    color: "#e6e7e8",
  },
  optionItem: {
    marginBottom: height * 0.03,
    paddingVertical: 18,
    paddingHorizontal: width * 0.05,
    backgroundColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  optionText: {
    fontSize: width * 0.045,
    color: "white",
    marginLeft: width * 0.03,
  },
  logOutContainer: {
    position: "absolute",
    bottom: 70,
    alignSelf: "center",
  },
});

export default SettingsScreen;
