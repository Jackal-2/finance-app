import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { ChevronLeft, Plus } from "lucide-react-native";

const { width, height } = Dimensions.get("window");

const AllContactsScreen = ({ route, navigation }) => {
  const { imagesData } = route.params;

  const handleAddContact = () => {
    console.log("Add new contact");
  };

  const handleContactPress = (contact) => {
    console.log(`Contact pressed: ${contact.name}`);
    // Navigate to the SendMoneyScreen with selected contact info
    navigation.navigate("Send", {
      contactName: contact.name,
      contactPhoto: contact.source,
      contactCard: contact.cardNumber,
    });
  };

  const renderContacts = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.contactContainer}
        onPress={() => handleContactPress(item)}
      >
        <Image source={item.source} style={styles.contactImage} />
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#266A61", "#0F0F0F"]} style={styles.background}>
        <BlurView intensity={50} style={styles.blurContainer}>
          <View style={styles.header}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ChevronLeft color="white" size={30} />
              </TouchableOpacity>
              <Text style={styles.headerText}>All Contacts</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Newcontact")}
              style={styles.addButton}
            >
              <Plus color="white" />
            </TouchableOpacity>
          </View>
        </BlurView>
      </LinearGradient>

      <View style={{ height: "100%" }}>
        <FlatList
          data={imagesData}
          renderItem={renderContacts}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  background: {
    height: "14%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  blurContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 10,
  },
  headerText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    paddingLeft: "15",
  },
  addButton: {
    backgroundColor: "black",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: "black",
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    paddingLeft: "10",
  },
  contactImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  contactInfo: {
    justifyContent: "center",
  },
  contactName: {
    color: "#CCC",
    fontSize: 20,
    fontWeight: "600",
  },
  contactCardNumber: {
    color: "#ccc",
    fontSize: 14,
  },
});

export default AllContactsScreen;
