import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { ChevronLeft } from "lucide-react-native";

const { width, height } = Dimensions.get("window");

const TransferScreen = () => {
  // States to handle transfer logic
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState(""); // State for selected bank
  const [isTransferSuccessful, setIsTransferSuccessful] = useState(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false); // State to toggle picker visibility

  // List of linked banks (static list for demonstration), each bank now has a full account number
  const linkedBanks = [
    { id: 1, name: "Bank of America", accountNumber: "1234567890123456" },
    { id: 2, name: "Chase Bank", accountNumber: "9876543210987654" },
    { id: 3, name: "Wells Fargo", accountNumber: "1928374655647382" },
    { id: 4, name: "Citibank", accountNumber: "5638291047582937" },
    { id: 5, name: "HSBC", accountNumber: "8473920192837482" },
  ];

  // Function to get the last four digits of the account number
  const getLastFourDigits = (accountNumber) => {
    return accountNumber.slice(-4); // Get last 4 digits
  };

  // Function to handle the transfer action
  const handleTransfer = () => {
    if (!selectedBank) {
      Alert.alert("Select a Bank", "Please select a bank to transfer from.");
      return;
    }
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount to transfer.");
      return;
    }

    // Here, you could connect to a real API or handle the transfer logic.
    // For now, we'll just simulate a successful transfer.
    setIsTransferSuccessful(true);
  };

  // Function to handle amount input with formatting
  const handleAmountChange = (text) => {
    // Remove all non-numeric characters except the dot
    let numericValue = text.replace(/[^0-9.]/g, "");

    // Check if the value is valid and then format it with commas
    if (numericValue === "") {
      setAmount(""); // Clear the input if the field is empty
    } else {
      // Format the value with commas for thousands, millions, etc.
      let formattedValue = parseFloat(numericValue).toLocaleString();

      // Ensure the value does not exceed 1 million
      if (parseFloat(numericValue) > 1000000) {
        formattedValue = "1,000,000";
      }

      setAmount(formattedValue); // Update the amount state with formatted value
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#266A61", "#0F0F0F"]}
        style={styles.gradientContainer}
      >
        <BlurView intensity={50} style={styles.blurContainer}>
          <View style={styles.topSection}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeft color="white" size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>Transfer to My Account</Text>
          </View>
        </BlurView>
      </LinearGradient>
      {/* <Text style={styles.header}>Transfer to My Account</Text> */}

      <View style={{ paddingHorizontal: 15, marginTop: 25 }}>
        {/* From Bank Selection */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>From</Text>

          {/* Tapping on this TextInput activates the Picker */}
          <TouchableOpacity
            onPress={() => setIsPickerVisible(true)} // Show the Picker on tap
            style={styles.pickerContainer}
          >
            <Text style={styles.selectedBankText}>
              {selectedBank ? selectedBank : "Select a Bank"}{" "}
              {/* Show selected bank or placeholder */}
            </Text>
          </TouchableOpacity>

          {/* Conditional Rendering of Picker Dropdown */}
          {isPickerVisible && (
            <View style={{ height: 150 }}>
              <Picker
                selectedValue={selectedBank}
                style={styles.picker}
                onValueChange={(itemValue) => {
                  setSelectedBank(itemValue); // Update the selected bank
                  setIsPickerVisible(false); // Hide the picker after selection
                }}
              >
                <Picker.Item label="Select a Bank" value="" />
                {linkedBanks.map((bank) => (
                  <Picker.Item
                    key={bank.id}
                    label={`${bank.name} - **** **** **** ${getLastFourDigits(
                      bank.accountNumber
                    )}`}
                    value={bank.name}
                    style={styles.pickerItem} // Ensuring white text for the dropdown items
                  />
                ))}
              </Picker>
            </View>
          )}
        </View>

        {/* Amount to Transfer */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount to Transfer</Text>
          <View style={styles.inputWithDollar}>
            <Text style={styles.dollarSign}>$</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={handleAmountChange} // Using custom function for amount input
              placeholder="Enter amount"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.transferButton}
          onPress={handleTransfer}
        >
          <Text style={styles.buttonText}>Transfer</Text>
        </TouchableOpacity>

        {isTransferSuccessful !== null && (
          <View style={styles.statusMessage}>
            <Text
              style={{
                color: isTransferSuccessful ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {isTransferSuccessful
                ? "Transfer Successful!"
                : "Transfer Failed"}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F", // Dark background color

    // paddingHorizontal: 20,
  },
  gradientContainer: {
    height: "14%",
    justifyContent: "center",
    alignItems: "center",
  },
  blurContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: height * 0.07,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  title: {
    fontSize: width * 0.07,
    color: "#fff",
    fontWeight: "bold",
    paddingLeft: width * 0.03,
  },
  header: {
    fontSize: 28,
    color: "#266A61",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  pickerContainer: {
    height: 50,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "black", // Darker background for the dropdown container
  },
  selectedBankText: {
    color: "#ccc",
    fontSize: 18,
  },
  picker: {
    height: 150,
    color: "#fff", // Ensuring white color for picker text
    backgroundColor: "white", // Dark background for the dropdown to contrast with white text
  },
  pickerItem: {
    color: "#fff", // Ensure that the picker items have white text
    fontSize: 16,
  },
  inputWithDollar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F1F1F",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  dollarSign: {
    color: "#fff",
    fontSize: 20,
    marginRight: 5,
  },
  input: {
    height: 50,
    color: "#fff",
    fontSize: 18,
    flex: 1,
  },
  transferButton: {
    backgroundColor: "#266A61", // Green button color
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  statusMessage: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default TransferScreen;
