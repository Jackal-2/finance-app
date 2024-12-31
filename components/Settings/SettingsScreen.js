import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {

  // Dummy data for user profile
  const user = {
    name: 'Phil foden',
    username: '@philfoden82',
  };

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


      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={require('../../assets/profile.jpg')} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileUsername}>{user.username}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Account')}>
        <MaterialIcons name="account-circle" size={24} color="white" />
        <Text style={styles.optionText}>Account Management</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Bank')}>
        <MaterialIcons name="payment" size={24} color="white" />
        <Text style={styles.optionText}>Payment Methods</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Transfer')}>
        <MaterialIcons name="compare-arrows" size={24} color="white" />
        <Text style={styles.optionText}>Transfer</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Security')}>
        <MaterialIcons name="security" size={24} color="white" />
        <Text style={styles.optionText}>Security</Text>
      </TouchableOpacity>


      <View style={styles.logOutContainer}>
        <Button title="Log Out" onPress={() => navigation.navigate('Login')} color="red" />
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

  profileSection: {
    alignItems: 'center',
    marginBottom: 30, // Space between profile and options


  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 40,
    marginRight: 20,
  },

  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },

  profileUsername: {
    fontSize: 14,
    color: '#e6e7e8',

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
