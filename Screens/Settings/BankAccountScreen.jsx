import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper"; // Import Paper components for UI
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

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

const BankAccountsPage = () => {
  const navigation = useNavigation(); // Always call hooks at the top level
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
    <View style={styles.container}>
      <LinearGradient colors={["#266A61", "#0F0F0F"]} style={styles.background}>
        <BlurView intensity={50} style={styles.blurContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeft color="white" size={30} />
            </TouchableOpacity>
            <Text style={styles.topTitle}>Payment Methods</Text>
          </View>
        </BlurView>
      </LinearGradient>
      <View style={{ paddingHorizontal: width * 0.05 }}>
        <View style={styles.accountsList}>
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
          <TouchableOpacity
            onPress={linkBankAccount}
            disabled={isLinking || accountLinked}
          >
            <Text style={{ color: "#266A61", fontSize: 24 }}>
              {isLinking ? "Linking..." : "Link Bank Account"}
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
    backgroundColor: "#0F0F0F",
  },
  background: {
    height: "14%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.03,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  topTitle: {
    fontSize: width * 0.07,
    color: "#fff",
    fontWeight: "bold",
    paddingLeft: width * 0.03,
  },
  blurContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: height * 0.07,
  },
  subtitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginVertical: height * 0.02,
    color: "#266A61",
  },
  label: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    marginVertical: height * 0.015,
    color: "#266A61",
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
  accountsList: {
    marginBottom: height * 0.01,
  },
  card: {
    marginBottom: height * 0.025,
    backgroundColor: "#28282B",
  },
  cardTitle: {
    color: "#266A61",
    fontSize: width * 0.05,
  },
  cardText: {
    color: "#fff",
    fontSize: width * 0.04,
  },
  noAccountsText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontStyle: "italic",
  },
  sectionContainer: {
    marginBottom: height * 0.03,
  },
  buttonContainer: {
    position: "relative",
    top: 40,
    alignSelf: "center",
  },
});

export default BankAccountsPage;
