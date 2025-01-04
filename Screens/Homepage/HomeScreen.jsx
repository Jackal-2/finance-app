import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Modal,
  Button,
  Dimensions,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import CustomButton from "../../components/CustomButton";
import TopArea from "./components/TopArea";
import QuickSend from "./components/QuickSend";
import Transactions from "./components/Transactions";

const { width, height } = Dimensions.get("window"); // Get screen width and height

const HomeScreen = ({ route, navigation }) => {
  // Define the initial transaction data with a type field
  const [transactionData, setTransactionData] = useState([
    {
      id: 1,
      source: require("../../assets/peak3.jpg"),
      name: "Wendy",
      date: "21/12/2024",
      amount: "$1,850.98",
      status: "completed",
      type: "received",
    },
    {
      id: 2,
      source: require("../../assets/peak2.jpg"),
      name: "Denise",
      date: "18/12/24",
      amount: "$2,400.98",
      status: "completed",
      type: "sent",
    },
    {
      id: 3,
      source: require("../../assets/peak1.jpg"),
      name: "Pablo",
      date: "31/11/24",
      amount: "$100.67",
      status: "completed",
      type: "received",
    },
    {
      id: 4,
      source: require("../../assets/peak4.jpg"),
      name: "Thugger",
      date: "01/12/24",
      amount: "$800.78",
      status: "completed",
      type: "sent",
    },
    {
      id: 5,
      source: require("../../assets/peak.jpg"),
      name: "Estaban",
      date: "22/11/24",
      amount: "$50.12",
      status: "completed",
      type: "received",
    },
    {
      id: 6,
      source: require("../../assets/peak4.jpg"),
      name: "Thugger",
      date: "01/09/24",
      amount: "$390.31",
      status: "completed",
      type: "sent",
    },
    {
      id: 7,
      source: require("../../assets/peak1.jpg"),
      name: "Pablo",
      date: "31/90/24",
      amount: "$0",
      status: "failed",
      type: "received",
    },
  ]);

  const [totalBalance, setTotalBalance] = useState(12739.58); // Set initial total balance
  const [isBalanceVisible, setIsBalanceVisible] = useState(false); // Initially, the balance is hidden
  const [isModalVisible, setIsModalVisible] = useState(false); // State to toggle modal visibility
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Store selected transaction

  // Define imagesData here
  const imagesData = [
    {
      id: 1,
      source: require("../../assets/peak3.jpg"),
      name: "Wendy",
      navigateTo: "Send",
    },
    {
      id: 2,
      source: require("../../assets/peak2.jpg"),
      name: "Denise",
      navigateTo: "Send",
    },
    {
      id: 3,
      source: require("../../assets/peak1.jpg"),
      name: "Pablo",
      navigateTo: "Send",
    },
    {
      id: 4,
      source: require("../../assets/peak4.jpg"),
      name: "Thugger",
      navigateTo: "Send",
    },
    {
      id: 5,
      source: require("../../assets/peak.jpg"),
      name: "Estaban",
      navigateTo: "Send",
    },
  ];

  // Transaction list component

  const renderTransactions = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => handleTransactionPress(item)}
      >
        <View
          style={{
            borderRadius: 12,
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 10,
            position: "relative",
            paddingVertical: 10,
          }}
        >
          <Image
            style={{ height: 90, width: 90, borderRadius: 20 }}
            source={item.source}
          />
          <View style={{ marginLeft: 15 }}>
            <Text style={{ color: "#dce0e6", fontSize: width * 0.05 }}>
              {item.name}
            </Text>
            <Text
              style={{
                color: "#979ea8",
                fontSize: width * 0.04,
                marginTop: 5,
              }}
            >
              {item.date}
            </Text>
          </View>
          <Text
            style={{
              position: "absolute",
              right: 10,
              fontSize: width * 0.04,
              color: item.type === "sent" ? "#979ea8" : "#dce0e6",
            }}
          >
            {formatTransactionAmount(item.amount, item.type)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  // Function to format the number with commas
  const formatBalance = (amount) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // Listen for the new transaction data from SendMoneyScreen
  useEffect(() => {
    if (route.params?.newTransaction) {
      const newTransaction = route.params.newTransaction;
      setTransactionData((prevData) => [newTransaction, ...prevData]); // Add the new transaction to the list
    }

    if (route.params?.updatedBalance) {
      setTotalBalance(route.params.updatedBalance); // Update the total balance if it's passed from SendMoneyScreen
    }
  }, [route.params?.newTransaction, route.params?.updatedBalance]); // Run when newTransaction or updatedBalance is updated in route.params

  // Function to handle the opening of the modal with transaction details
  const handleTransactionPress = (transaction) => {
    setSelectedTransaction(transaction);
    // Delay modal visibility change to avoid "state update during render"
    setTimeout(() => {
      setIsModalVisible(true);
    }, 0);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedTransaction(null); // Clear the selected transaction when modal is closed
  };

  // Toggle visibility of the total balance
  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prevState) => !prevState); // Toggle the visibility
  };

  // Function to format the amount with a negative sign for sent transactions
  const formatTransactionAmount = (amount, type) => {
    // Remove non-numeric characters and check if it should be negative
    const numericAmount = parseFloat(amount.replace(/[^0-9.-]+/g, ""));
    return type === "sent"
      ? `-$${numericAmount.toLocaleString()}`
      : `$${numericAmount.toLocaleString()}`;
  };

  return (
    <View style={styles.container}>
      {/* Top Green Area component */}
      <TopArea
        navigation={navigation}
        toggleBalanceVisibility={toggleBalanceVisibility}
        isBalanceVisible={isBalanceVisible}
        formatBalance={formatBalance}
        totalBalance={totalBalance}
        imagesData={imagesData}
      />

      <View style={{ marginTop: 20 }}>
        {/*Quick Send component */}

        <QuickSend navigation={navigation} imagesData={imagesData} />
      </View>

      {/* Transactions component */}

      <Transactions
        transactionData={transactionData}
        renderTransactions={renderTransactions}
      />

      {/* Modal for transaction details */}
      <Modal
        visible={isModalVisible}
        onRequestClose={closeModal}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedTransaction && (
              <>
                <Text style={styles.modalTitle}>
                  {selectedTransaction.name}
                </Text>
                <Text style={styles.modalText}>
                  Date: {selectedTransaction.date}
                </Text>
                <Text style={styles.modalText}>
                  Amount:{" "}
                  {formatTransactionAmount(
                    selectedTransaction.amount,
                    selectedTransaction.type
                  )}
                </Text>
                <View style={styles.statusContainer}>
                  {selectedTransaction.status === "completed" ? (
                    <Ionicons name="checkmark-circle" size={40} color="green" />
                  ) : (
                    <Ionicons name="close-circle" size={40} color="red" />
                  )}
                  <Text style={styles.statusText}>
                    {selectedTransaction.status === "completed"
                      ? "Completed"
                      : "failed"}
                  </Text>
                </View>
              </>
            )}
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#1d1d1d",
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#266A61",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dce0e6",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    color: "#979ea8",
    marginBottom: 5,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  statusText: {
    fontSize: 18,
    color: "#dce0e6",
    marginLeft: 10,
  },
});

export default HomeScreen;
