import React, { useState } from 'react';
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
} from 'react-native';
import TouchID from 'react-native-touch-id';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const SecurityScreen = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [isFaceIDEnabled, setIsFaceIDEnabled] = useState(false);

    // Handle Change Password
    const handleChangePassword = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'All password fields are required.');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New password and confirm password do not match.');
            return;
        }

        // Here, add logic to change the password (API call to backend or Firebase, etc.)
        Alert.alert('Success', 'Your password has been successfully changed.');
    };

    // Enable 2FA (simulated for now)
    const handle2FAEnable = () => {
        setIs2FAEnabled(!is2FAEnabled);
        Alert.alert(is2FAEnabled ? '2FA Disabled' : '2FA Enabled', '2FA has been ' + (is2FAEnabled ? 'disabled.' : 'enabled.'));
        // Actual implementation would require connecting to 2FA service (e.g., Firebase or Twilio)
    };

    // Enable Face ID login
    const handleFaceIDEnable = () => {
        TouchID.isSupported()
            .then(() => {
                TouchID.authenticate('Authenticate to enable Face ID login')
                    .then(() => {
                        setIsFaceIDEnabled(true);
                        Alert.alert('Face ID Enabled', 'Face ID authentication has been successfully enabled.');
                    })
                    .catch((error) => {
                        Alert.alert('Error', 'Face ID authentication failed: ' + error.message);
                    });
            })
            .catch(() => {
                Alert.alert('Error', 'Face ID is not supported on this device.');
            });
    };

    return (
        <View style={styles.container}>

            <LinearGradient colors={['#266A61', '#0F0F0F']} style={styles.gradientContainer}>
                <BlurView intensity={50} style={styles.blurContainer}>
                    <View style={styles.topSection}>
                        <Text style={styles.title}>Security Settings</Text>
                    </View>
                </BlurView>
            </LinearGradient>

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
                            {isFaceIDEnabled ? 'Face ID Enabled' : 'Enable Face ID'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: "30"
    },
    gradientContainer: {
        height: height * 0.25,
    },
    blurContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: width * 0.05,

    },
    topSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: width * 0.08,
        color: '#fff',
        fontWeight: 'bold',
        paddingTop: "20",
    },
    formContainer: {
        flex: 1,
        padding: width * 0.05,
        justifyContent: 'flex-start',

    },
    section: {
        marginVertical: height * 0.02,
        paddingTop: height * 0.01,

    },
    label: {
        fontSize: width * 0.04,
        marginBottom: height * 0.01,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: width * 0.04,
        marginBottom: height * 0.02,
        borderRadius: 5,
        backgroundColor: '#f5f5f5',
        color: '#333',
    },
    button: {
        backgroundColor: '#266A61',
        padding: width * 0.05,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: width * 0.04,
    },
});

export default SecurityScreen;
