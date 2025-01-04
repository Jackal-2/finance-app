import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { ChevronLeft } from "lucide-react-native";

const { width, height } = Dimensions.get("window");

const RequestMoneyScreen = ({ navigation }) => {  // Destructure navigation from props
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRequestSentModalVisible, setRequestSentModalVisible] = useState(false);

  // Dummy data for recipient list
  const recipients = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Mike Johnson" },
    { id: "4", name: "Sarah Lee" },
  ];

  const handleRequestMoney = () => {
    // Basic validation
    if (!amount || !recipient) {
      alert("Please enter both an amount and a recipient");
      return;
    }

    // Trigger modal display with request details
    setRequestSentModalVisible(true);
  };

  const handleRecipientSelect = (selectedRecipient) => {
    setRecipient(selectedRecipient);
    setModalVisible(false);
  };

  // Modify closeRequestSentModal to navigate to the previous page after resetting fields
  const closeRequestSentModal = () => {
    setAmount("");
    setRecipient("");
    setRequestSentModalVisible(false);
    navigation.goBack();  // Navigate back to the previous page
  };

  // Function to format amount with commas
  const formatAmount = (value) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    const numericValueFloat = parseFloat(numericValue);

    // Limit to 1 million
    if (numericValueFloat > 1000000) {
      return "1,000,000";
    }

    // Format with commas
    return numericValueFloat.toLocaleString("en-US");
  };

  const handleAmountChange = (text) => {
    const formattedText = text.replace(/[^0-9.]/g, "");
    const formattedAmount = formatAmount(formattedText);
    setAmount(formattedAmount);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#266A61", "#0F0F0F"]} style={styles.background}>
        <BlurView intensity={50} style={styles.blurContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeft color="white" size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>Request for money</Text>
          </View>
        </BlurView>
      </LinearGradient>

      <View style={styles.form}>
        <Text style={styles.label}>Amount</Text>

        {/* Container for dollar sign and input */}
        <View style={styles.amountContainer}>
          <Text style={styles.dollarSign}>$</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor="#ccc" // Placeholder color
            value={amount}
            onChangeText={handleAmountChange}
          />
        </View>

        <Text style={styles.label}>Recipient</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.inputContainer}
        >
          <Text style={styles.inputText}>
            {recipient || "Select a recipient"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.requestButton}
          onPress={handleRequestMoney}
        >
          <Text style={styles.requestButtonText}>Send Request</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for recipient selection */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select a Recipient</Text>
            <FlatList
              data={recipients}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleRecipientSelect(item.name)}
                >
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for "Request Sent" */}
      <Modal
        visible={isRequestSentModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeRequestSentModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.requestSentModal}>
            <Text style={styles.requestSentTitle}>Request Sent</Text>
            <Text style={styles.requestSentText}>
              Amount: ${amount}
            </Text>
            <Text style={styles.requestSentText}>
              Recipient: {recipient}
            </Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={closeRequestSentModal}  // Close modal and navigate back
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  blurContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: height * 0.07,
  },
  header: {
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
  form: {
    backgroundColor: "#1C1C1C",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 30,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
    color: "#ccc",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#266A61",
    paddingLeft: 10,
    marginBottom: 15,
  },
  dollarSign: {
    color: "white",
    fontSize: 20,
    paddingRight: 8,
  },
  input: {
    height: 50,
    fontSize: 16,
    color: "white",
    flex: 1,
    backgroundColor: "#333",
    paddingVertical: 0,
  },
  inputContainer: {
    height: 50,
    backgroundColor: "#333",
    borderRadius: 8,
    borderColor: "#266A61",
    borderWidth: 1,
    justifyContent: "center",
    paddingLeft: 12,
    marginBottom: 15,
  },
  inputText: {
    color: "white",
    fontSize: 16,
  },
  requestButton: {
    backgroundColor: "#266A61",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  requestButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ccc",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#1C1C1C",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  modalItem: {
    padding: 10,
  },
  modalItemText: {
    color: "white",
    fontSize: 18,
  },
  modalCloseButton: {
    marginTop: 15,
    backgroundColor: "#266A61",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  modalCloseText: {
    color: "#fff",
    fontSize: 16,
  },
  requestSentModal: {
    backgroundColor: "#1C1C1C",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  requestSentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#266A61",
    textAlign: "center",
    marginBottom: 10,
  },
  requestSentText: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default RequestMoneyScreen;
