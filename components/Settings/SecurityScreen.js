import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
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

  // Enable Face ID login
  const handleFaceIDEnable = () => {
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
            Alert.alert(
              "Error",
              "Face ID authentication failed: " + error.message
            );
          });
      })
      .catch(() => {
        Alert.alert("Error", "Face ID is not supported on this device.");
      });
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
              <Text style={styles.title}>Security Settings</Text>
            </View>
          </BlurView>
        </LinearGradient>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.section}>
          <Text style={styles.label}>Current Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter current password"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />

          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <Text style={styles.label}>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
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
          <TouchableOpacity
            style={styles.button}
            onPress={handleFaceIDEnable}
            disabled={isFaceIDEnabled}
          >
            <Text style={styles.buttonText}>
              {isFaceIDEnabled ? "Face ID Enabled" : "Enable Face ID"}
            </Text>
          </TouchableOpacity>
        </View>
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
  gradientContainer: {
    height: "40%",
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
  topSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: width * 0.07, // Adjust font size based on screen width
    color: "#fff",
    fontWeight: "bold",
    paddingLeft: width * 0.03, // Adjust padding based on screen width
  },
  formContainer: {
    flex: 1,
    marginTop: -50,
    padding: width * 0.05, // Adjust padding based on screen width
    justifyContent: "flex-start",
  },
  section: {
    marginVertical: height * 0.02, // Adjust vertical spacing based on screen height
    paddingTop: height * 0.01, // Adjust padding based on screen height
  },
  label: {
    fontSize: width * 0.04, // Adjust font size based on screen width
    marginBottom: height * 0.01, // Adjust bottom margin based on screen height
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
  button: {
    backgroundColor: "#266A61",
    padding: width * 0.05, // Adjust padding based on screen width
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.04, // Adjust font size based on screen width
  },
});

export default SecurityScreen;
