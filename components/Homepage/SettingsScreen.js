import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {

  const handleAccountManagement = () => {
    console.log('Navigating to Account Management');
  };

  const handlePaymentMethods = () => {
    console.log('Navigating to Payment Methods');
  };

  const handleSecurity = () => {
    console.log('Navigating to Security');
  };

  const handleLogOut = () => {
    console.log('Logging out...');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <ArrowLeft color="#D3D3D3" size={24} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionItem} onPress={handleAccountManagement}>
        <MaterialIcons name="account-circle" size={24} color="white" />
        <Text style={styles.optionText}>Account Management</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionItem} onPress={handlePaymentMethods}>
        <MaterialIcons name="payment" size={24} color="white" />
        <Text style={styles.optionText}>Payment Methods</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.optionItem} onPress={handleSecurity}>
        <MaterialIcons name="security" size={24} color="white" />
        <Text style={styles.optionText}>Security</Text>
      </TouchableOpacity>


      <View style={styles.logOutContainer}>
        <Button title="Log Out" onPress={handleLogOut} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  optionItem: {
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',

  },
  optionText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
  },
  logOutContainer: {
    marginTop: 40,
  },
});

export default SettingsScreen;
