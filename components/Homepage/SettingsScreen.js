import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Button, Alert } from 'react-native';

const SettingsScreen = () => {
  // Always call hooks at the top level of your component
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  // Toggle functions
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const toggleNotifications = () => setIsNotificationsEnabled((prev) => !prev);
  const handleLogOut = () => {
    // Show a confirmation alert before logging out
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel' },
      { text: 'Log Out', onPress: () => setIsLoggedIn(false) },
    ]);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkMode]}>
      {/* Settings title */}
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Settings</Text>

      {/* Profile Info */}
      <View style={styles.settingItem}>
        <Text style={[styles.settingLabel, isDarkMode && styles.darkText]}>Profile:</Text>
        <Text style={[styles.settingValue, isDarkMode && styles.darkText]}>Malone</Text>
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.settingItem}>
        <Text style={[styles.settingLabel, isDarkMode && styles.darkText]}>Enable Dark Mode</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#50db46' }}
          thumbColor={isDarkMode ? 'white' : '#f4f3f4'}
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>

      {/* Notifications Toggle */}
      <View style={styles.settingItem}>
        <Text style={[styles.settingLabel, isDarkMode && styles.darkText]}>Enable Notifications</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#50db46' }}
          thumbColor={isNotificationsEnabled ? 'white' : '#f4f3f4'}
          onValueChange={toggleNotifications}
          value={isNotificationsEnabled}
        />
      </View>

      {/* Log Out Button */}
      {isLoggedIn && (
        <View style={styles.settingItem}>
          <Button title="Log Out" onPress={handleLogOut} color="red" />
        </View>
      )}

      {/* If the user is logged out */}
      {!isLoggedIn && (
        <Text style={[styles.loggedOutText, isDarkMode && styles.darkText]}>You are logged out</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  darkMode: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  darkTitle: {
    color: 'white',
  },
  settingItem: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabel: {
    fontSize: 18,
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
  settingValue: {
    fontSize: 18,
    color: 'gray',
  },
  loggedOutText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SettingsScreen;
