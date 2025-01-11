import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { ChevronLeft } from "lucide-react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

const TransferScreen = () => {
  const navigation = useNavigation(); // Use the navigation hook

  // States to handle transfer logic
  const [amount, setAmount] = useState(""); // Amount entered by the user
  const [selectedBank, setSelectedBank] = useState(""); // Selected bank
  const [isTransferSuccessful, setIsTransferSuccessful] = useState(null); // Transfer success or failure
  const [isPickerVisible, setIsPickerVisible] = useState(false); // Toggle for bank picker visibility
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility for showing success transfer details

  // List of linked banks (with dummy data for demonstration)
  const linkedBanks = [
    { id: 1, name: "Bank of America", accountNumber: "1234567890123456" },
    { id: 2, name: "Chase Bank", accountNumber: "9876543210987654" },
    { id: 3, name: "Wells Fargo", accountNumber: "1928374655647382" },
    { id: 4, name: "Citibank", accountNumber: "5638291047582937" },
    { id: 5, name: "HSBC", accountNumber: "8473920192837482" },
  ];

  // Function to get the last four digits of the account number
  const getLastFourDigits = (accountNumber) => {
    return accountNumber.slice(-4);
  };

  // Function to handle the transfer action
  const handleTransfer = () => {
    Keyboard.dismiss(); // Dismiss the keyboard when the transfer is initiated

    if (!selectedBank) {
      Alert.alert("Select a Bank", "Please select a bank to transfer from.");
      return;
    }

    // Remove commas for validation
    const rawAmount = amount.replace(/,/g, "");

    if (!rawAmount || isNaN(rawAmount) || parseFloat(rawAmount) <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount to transfer.");
      return;
    }

    // Simulate a successful transfer
    setIsTransferSuccessful(true);
    setIsModalVisible(true); // Show the modal after successful transfer
  };

  // Function to handle amount input with formatting
  const handleAmountChange = (text) => {
    let numericValue = text.replace(/[^0-9.]/g, "");

    if (numericValue === "") {
      setAmount(""); // Clear the input if the field is empty
    } else {
      let formattedValue = parseFloat(numericValue).toLocaleString();

      if (parseFloat(numericValue) > 1000000) {
        formattedValue = "1,000,000";
      }

      setAmount(formattedValue); // Update the amount state with formatted value
    }
  };

  // Function to handle closing of the modal and resetting fields
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIsTransferSuccessful(null); // Reset the transfer success flag
    setAmount(""); // Reset the amount field
    setSelectedBank(""); // Reset the selected bank
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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

        <View style={{ paddingHorizontal: 15, marginTop: 25 }}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>From</Text>

            <TouchableOpacity
              onPress={() => setIsPickerVisible(true)}
              style={styles.pickerContainer}
            >
              <Text style={styles.selectedBankText}>
                {selectedBank ? selectedBank : "Select a Bank"}
              </Text>
            </TouchableOpacity>

            {isPickerVisible && (
              <View style={{ height: 150 }}>
                <Picker
                  selectedValue={selectedBank}
                  style={styles.picker}
                  onValueChange={(itemValue) => {
                    setSelectedBank(itemValue);
                    setIsPickerVisible(false);
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
                      style={styles.pickerItem}
                    />
                  ))}
                </Picker>
              </View>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Amount to Transfer</Text>
            <View style={styles.inputWithDollar}>
              <Text style={styles.dollarSign}>$</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={handleAmountChange}
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
        </View>

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              {isTransferSuccessful && (
                <View style={styles.successContainer}>
                  <FontAwesome name="check-circle" size={30} color="green" />
                  <Text style={styles.successText}>Transfer Initiated</Text>
                </View>
              )}
              <Text style={styles.modalText}>
                Transfer from: {selectedBank}
              </Text>
              <Text style={styles.modalText}>Amount: ${amount}</Text>
              <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F", // Primary background color
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
    backgroundColor: "black",
  },
  selectedBankText: {
    color: "#ccc",
    fontSize: 18,
  },
  picker: {
    height: 150,
    color: "#fff",
    backgroundColor: "white",
  },
  pickerItem: {
    color: "#fff",
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
    backgroundColor: "#266A61",
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(15, 15, 15, 0.8)", // Modal background dark color
  },
  modalContent: {
    backgroundColor: "#333", // Darker shade for the modal content
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    color: "#fff", // White text for better contrast
    marginBottom: 10,
  },
  successContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  successText: {
    fontSize: 18,
    color: "#266A61", 
    marginLeft: 10,
  },
  modalButton: {
    marginTop: 15,
    backgroundColor: "#266A61",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TransferScreen;
