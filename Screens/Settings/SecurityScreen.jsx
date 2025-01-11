import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import TouchID from "react-native-touch-id";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { ChevronLeft } from "lucide-react-native";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const SecurityScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isFaceIDEnabled, setIsFaceIDEnabled] = useState(false);

  // Handle Change Password
  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "All password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password do not match.");
      return;
    }

    // Here, add logic to change the password (API call to backend or Firebase, etc.)
    Alert.alert("Success", "Your password has been successfully changed.");
  };

  // Enable 2FA (simulated for now)
  const handle2FAEnable = () => {
    setIs2FAEnabled(!is2FAEnabled);
    Alert.alert(
      is2FAEnabled ? "2FA Disabled" : "2FA Enabled",
      "2FA has been " + (is2FAEnabled ? "disabled." : "enabled.")
    );
    // Actual implementation would require connecting to 2FA service (e.g., Firebase or Twilio)
  };

  // Handle Face ID toggle
  const handleFaceIDToggle = (value) => {
    if (value) {
      // Try to enable Face ID
      TouchID.isSupported()
        .then(() => {
          TouchID.authenticate("Authenticate to enable Face ID login")
            .then(() => {
              setIsFaceIDEnabled(true);
              Alert.alert(
                "Face ID Enabled",
                "Face ID authentication has been successfully enabled."
              );
            })
            .catch((error) => {
              setIsFaceIDEnabled(false); // Disable the switch if authentication fails
              Alert.alert(
                "Error",
                "Face ID authentication failed: " + error.message
              );
            });
        })
        .catch(() => {
          setIsFaceIDEnabled(false); // Disable the switch if Face ID is not supported
          Alert.alert("Error", "Face ID is not supported on this device.");
        });
    } else {
      // Disable Face ID login (you would typically revoke this in your backend or local storage)
      setIsFaceIDEnabled(false);
      Alert.alert("Face ID Disabled", "Face ID authentication has been disabled.");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#266A61", "#0F0F0F"]}
        style={styles.gradientContainer}
      >
        <BlurView intensity={50} style={styles.blurContainer}>
          <View style={styles.topSection}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeft color="white" size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>Security</Text>
          </View>
        </BlurView>
      </LinearGradient>

      <View style={styles.formContainer}>
        <View style={styles.section}>
          <Text style={styles.label}>Current Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter current password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />

          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <Text style={styles.label}>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <Button title="Change Password" onPress={handleChangePassword} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Enable 2-Factor Authentication</Text>
          <Switch value={is2FAEnabled} onValueChange={handle2FAEnable} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Enable Face ID Login</Text>
          <Switch
            value={isFaceIDEnabled}
            onValueChange={handleFaceIDToggle} // Using the toggle handler
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: "30",
    backgroundColor: "#0F0F0F",
  },
  gradientContainer: {
    height: "14%",
    justifyContent: "center",
    alignItems: "center",
  },
  blurContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: height * 0.07,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  title: {
    fontSize: width * 0.08,
    color: "#fff",
    fontWeight: "bold",
    paddingLeft: width * 0.03,
  },
  formContainer: {
    flex: 1,
    padding: width * 0.05,
    justifyContent: "flex-start",
  },
  section: {
    marginVertical: height * 0.02,
    paddingTop: height * 0.01,
  },
  label: {
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
    color: "white",
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
});

export default SecurityScreen;