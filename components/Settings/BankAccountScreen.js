import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, Title, Paragraph } from "react-native-paper"; // Import Paper components for UI

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

// Sample bank account data (this would usually come from an API)
let existingBankAccounts = [
  {
    id: 1,
    accountNumber: "1234-5678-9876",
    routingNumber: "111000025",
    type: "Checking",
  },
];

const BankAccountsPage = ({}) => {
  const navigation = useNavigation();

  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountType, setAccountType] = useState(""); // User will manually type "Checking" or "Savings"
  const [isLinking, setIsLinking] = useState(false);
  const [accountLinked, setAccountLinked] = useState(false); // Track if account is already linked

  // Simulated API call for linking the bank account
  const linkBankAccount = async () => {
    if (!accountNumber || !routingNumber || !accountType) {
      Alert.alert(
        "Error",
        "Please provide account number, routing number, and account type."
      );
      return;
    }

    if (accountLinked) {
      Alert.alert("Error", "Only one bank account can be linked at a time.");
      return;
    }

    setIsLinking(true);
    try {
      // Simulating an API call (this would be an actual call to your backend or third-party service)
      setTimeout(() => {
        existingBankAccounts.push({
          id: existingBankAccounts.length + 1,
          accountNumber,
          routingNumber,
          type: accountType,
        });

        Alert.alert("Success", "Bank account linked successfully!");
        setAccountNumber("");
        setRoutingNumber("");
        setAccountType("");
        setIsLinking(false);
        setAccountLinked(true); // Mark as linked once successful
      }, 2000); // Simulating a network request delay
    } catch (error) {
      setIsLinking(false);
      Alert.alert("Error", "Failed to link bank account. Please try again.");
    }
  };

  return (
    <>
      <View style={{ height: "19%", backgroundColor: "black" }}>
        <LinearGradient
          colors={["#266A61", "#0F0F0F"]}
          style={styles.background}
        >
          <BlurView intensity={50} style={styles.blurContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ChevronLeft size={40} color="#D3D3D3" />
              </TouchableOpacity>
              <Text style={styles.title}>Payment Methods</Text>
            </View>
          </BlurView>
        </LinearGradient>
      </View>
      <ScrollView style={styles.container}>
        {/* Display existing linked bank accounts */}
        <View style={styles.accountsList}>
          <Text style={styles.linkedTitle}>Linked Accounts</Text>
          {existingBankAccounts.length > 0 ? (
            existingBankAccounts.map((account) => (
              <Card key={account.id} style={styles.card}>
                <Card.Content>
                  <Title style={styles.cardTitle}>{account.type} Account</Title>
                  <Paragraph style={styles.cardText}>
                    Account Number: {account.accountNumber}
                  </Paragraph>
                  <Paragraph style={styles.cardText}>
                    Routing Number: {account.routingNumber}
                  </Paragraph>
                </Card.Content>
              </Card>
            ))
          ) : (
            <Text style={styles.noAccountsText}>
              No linked bank accounts found.
            </Text>
          )}
        </View>

        {/* Link an external bank account */}
        <View style={styles.sectionContainer}>
          <Text style={styles.subtitle}>Link External Bank Account</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter account number"
            keyboardType="numeric"
            value={accountNumber}
            onChangeText={setAccountNumber}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter routing number"
            keyboardType="numeric"
            value={routingNumber}
            onChangeText={setRoutingNumber}
          />
        </View>

        {/* Account Type Input */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Account Type (Checking/Savings)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter account type"
            value={accountType}
            onChangeText={setAccountType}
          />
        </View>

        {/* Link Bank Account Button */}
        <View style={styles.buttonContainer}>
          <Button
            title={isLinking ? "Linking..." : "Link Bank Account"}
            onPress={linkBankAccount}
            disabled={isLinking || accountLinked} // Disable if linking or account already linked
            color="white"
          ></Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: width * 0.05, // Adjust padding based on screen width
    backgroundColor: "black",
    marginTop: -25,
  },
  background: {
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
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
    justifyContent: "start",
    marginBottom: height * 0.03, // Adjust margin based on screen size
    paddingTop: height * 0.02, // Adjust padding based on screen size
  },
  title: {
    fontSize: width * 0.07, // Adjust font size based on screen width
    color: "#fff",
    fontWeight: "bold",
    paddingLeft: width * 0.03, // Adjust padding based on screen width
  },
  subtitle: {
    fontSize: width * 0.05, // Adjust font size based on screen width
    fontWeight: "bold",
    marginVertical: height * 0.02, // Adjust vertical margin based on screen height
    color: "#266A61",
  },
  label: {
    fontSize: width * 0.045, // Adjust font size based on screen width
    fontWeight: "bold",
    marginVertical: height * 0.015, // Adjust vertical margin based on screen height
    color: "#266A61",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: width * 0.04, // Adjust padding based on screen width
    marginBottom: height * 0.025, // Adjust margin bottom based on screen height
    borderRadius: 5,
    color: "white", // Changed text color to black for readability
  },
  accountsList: {},
  card: {
    marginBottom: height * 0.025, // Adjust margin bottom based on screen height
    backgroundColor: "#333",
  },
  cardTitle: {
    color: "#266A61",
    fontSize: width * 0.05, // Adjust font size based on screen width
  },
  cardText: {
    color: "#fff",
    fontSize: width * 0.04, // Adjust font size based on screen width
  },
  noAccountsText: {
    color: "#fff",
    fontSize: width * 0.045, // Adjust font size based on screen width
    fontStyle: "italic",
  },
  sectionContainer: {
    marginBottom: height * 0.03, // Adjust margin bottom based on screen height
  },
  buttonContainer: {
    fontSize: 50,

    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    textAlign: "center",
  },
  linkedTitle: {
    fontSize: width * 0.05, // Adjust font size based on screen width
    fontWeight: "bold",
    marginVertical: height * 0.02, // Adjust vertical margin based on screen height
    color: "#266A61",
  },
});

export default BankAccountsPage;
