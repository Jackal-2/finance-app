import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, ChevronLeft } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import GradientHeader from "../GradientHeader";

const notifications = [
  {
    id: "1",
    type: "success",
    title: "Payment Successful",
    message: "You have successfully sent $1,850 to Wendy.",
    time: "3 days ago",
  },
  {
    id: "2",
    type: "error",
    title: "Payment Failed",
    message: "Your payment to John was unsuccessful.",
    time: "3 hours ago",
  },
  {
    id: "3",
    type: "success",
    title: "Profile Updated",
    message: "Your profile has been successfully updated.",
    time: "1 day ago",
  },
  {
    id: "4",
    type: "info",
    title: "System Update",
    message: "A new version of the app is available for download.",
    time: "2 days ago",
  },
  {
    id: "5",
    type: "error",
    title: "Payment Failed",
    message: "Your payment to Pablo was unsuccessful.",
    time: "3 months ago",
  },
];

const NotificationsScreen = () => {
  const navigation = useNavigation();

  const renderNotification = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.notificationCard, getNotificationStyle(item.type)]}
      >
        <Ionicons
          name={getIcon(item.type)}
          size={30}
          color={getIconColor(item.type)}
          style={styles.icon}
        />
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
        colors={["#266A61", "#0F0F0F"]}
        style={styles.gradientBackground}
      >
        <BlurView intensity={50} style={styles.blurContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeft size={40} color="#D3D3D3" />
            </TouchableOpacity>

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
    case "success":
      return styles.successCard;
    case "error":
      return styles.errorCard;
    case "info":
      return styles.infoCard;
    default:
      return styles.defaultCard;
  }
};

const getIcon = (type) => {
  switch (type) {
    case "success":
      return "checkmark-circle";
    case "error":
      return "close-circle";
    case "info":
      return "information-circle";
    default:
      return "notifications";
  }
};

const getIconColor = (type) => {
  switch (type) {
    case "success":
      return "green";
    case "error":
      return "red";
    case "info":
      return "blue";
    default:
      return "gray";
  }
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "black",
  },
  header: {
    backgroundColor: "#266A61",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: "#f8f8f8",
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 27,
    color: "#fff",
    fontWeight: "bold",
    paddingLeft: "10",
  },
  notificationList: {
    padding: 10,
  },
  notificationCard: {
    flexDirection: "row",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#272727",
  },
  icon: {
    marginRight: 15,
  },
  notificationDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  gradientBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
    color: "white",
  },
  time: {
    fontSize: 12,
    color: "#aaa",
  },
  successCard: {
    borderLeftWidth: 5,
    borderLeftColor: "green",
  },
  errorCard: {
    borderLeftWidth: 5,
    borderLeftColor: "red",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 20,
  },
  blurContainer: {
    flex: 1,
    alignItems: "flex-start",
    width: "100%",
    paddingTop: 50,
  },
  infoCard: {
    borderLeftWidth: 5,
    borderLeftColor: "blue",
  },
  defaultCard: {
    borderLeftWidth: 5,
    borderLeftColor: "gray",
  },
});

export default NotificationsScreen;