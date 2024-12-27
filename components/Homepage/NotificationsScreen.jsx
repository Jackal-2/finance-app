import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from 'react-native-vector-icons'; // For icons
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur'; 

const notifications = [
  { id: '1', type: 'success', title: 'Payment Successful', message: 'You have successfully sent $1,850 to Wendy.', time: '3 days ago' },
  { id: '2', type: 'error', title: 'Payment Failed', message: 'Your payment to John was unsuccessful.', time: '3 hours ago' },
  { id: '3', type: 'info', title: 'New Offer', message: 'Check out our new special offer for your next purchase.', time: '5 hours ago' },
  { id: '4', type: 'success', title: 'Profile Updated', message: 'Your profile has been successfully updated.', time: '1 day ago' },
  { id: '5', type: 'info', title: 'System Update', message: 'A new version of the app is available for download.', time: '2 days ago' },
];

const NotificationsScreen = () => {
  const navigation = useNavigation();

  const renderNotification = ({ item }) => {
    return (
      <TouchableOpacity style={[styles.notificationCard, getNotificationStyle(item.type)]}>
        <Ionicons name={getIcon(item.type)} size={30} color={getIconColor(item.type)} style={styles.icon} />
        <View style={styles.notificationDetails}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
              <LinearGradient
        colors={['#266A61', '#0F0F0F']} 
        style={styles.background}
      >
        <BlurView intensity={50} style={styles.blurContainer}>
          <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
          </View>
        </BlurView>
      </LinearGradient> 
      

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationList}
      />
    </View>
  );
};

const getNotificationStyle = (type) => {
  switch (type) {
    case 'success':
      return styles.successCard;
    case 'error':
      return styles.errorCard;
    case 'info':
      return styles.infoCard;
    default:
      return styles.defaultCard;
  }
};

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return 'checkmark-circle';
    case 'error':
      return 'close-circle';
    case 'info':
      return 'information-circle';
    default:
      return 'notifications';
  }
};

const getIconColor = (type) => {
  switch (type) {
    case 'success':
      return 'green';
    case 'error':
      return 'red';
    case 'info':
      return 'blue';
    default:
      return 'gray';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#f8f8f8"
  },
  header: {
    backgroundColor: '#266A61',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
    scrollView: {
    flexGrow: 1,
    backgroundColor:"#f8f8f8",
    marginBottom:40
  },
  headerTitle: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    paddingLeft:"10"
  },
  notificationList: {
    padding: 10,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 15,
  },
  notificationDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  time: {
    fontSize: 12,
    color: '#aaa',
  },
  successCard: {
    borderLeftWidth: 5,
    borderLeftColor: 'green',
  },
  errorCard: {
    borderLeftWidth: 5,
    borderLeftColor: 'red',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20, 
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    paddingTop: 60, 
  },
  infoCard: {
    borderLeftWidth: 5,
    borderLeftColor: 'blue',
  },
  defaultCard: {
    borderLeftWidth: 5,
    borderLeftColor: 'gray',
  },
});

export default NotificationsScreen;