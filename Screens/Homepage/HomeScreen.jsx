import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image, Modal, Button, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react"; 
import CustomButton from "../../components/CustomButton"; 

const { width, height } = Dimensions.get('window'); // Get screen width and height

const HomeScreen = ({ route, navigation }) => {
  // Define the initial transaction data with a type field
  const [transactionData, setTransactionData] = useState([
    { id: 1, source: require("../../assets/peak3.jpg"), name: "Wendy", date: "21/12/2024", amount: "$1,850.98", status: "completed", type: "received" },
    { id: 2, source: require("../../assets/peak2.jpg"), name: "Denise", date: "18/12/24", amount: "$2,400.98", status: "completed", type: "sent" },
    { id: 3, source: require("../../assets/peak1.jpg"), name: "Pablo", date: "31/11/24", amount: "$100.67", status: "completed", type: "received" },
    { id: 4, source: require("../../assets/peak4.jpg"), name: "Thugger", date: "01/12/24", amount: "$800.78", status: "completed", type: "sent" },
    { id: 5, source: require("../../assets/peak.jpg"), name: "Estaban", date: "22/11/24", amount: "$50.12", status: "completed", type: "received" },
    { id: 6, source: require("../../assets/peak4.jpg"), name: "Thugger", date: "01/09/24", amount: "$390.31", status: "completed", type: "sent" },
    { id: 7, source: require("../../assets/peak1.jpg"), name: "Pablo", date: "31/90/24", amount: "$0", status: "failed", type: "received" },
  ]);

  const [totalBalance, setTotalBalance] = useState(12739.58); // Set initial total balance
  const [isBalanceVisible, setIsBalanceVisible] = useState(true); // State to toggle visibility of total balance
  const [isModalVisible, setIsModalVisible] = useState(false); // State to toggle modal visibility
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Store selected transaction

  // Define imagesData here
  const imagesData = [
    { id: 1, source: require("../../assets/peak3.jpg"), name: "Wendy", navigateTo: "Send" },
    { id: 2, source: require("../../assets/peak2.jpg"), name: "Denise", navigateTo: "Send" },
    { id: 3, source: require("../../assets/peak1.jpg"), name: "Pablo", navigateTo: "Send" },
    { id: 4, source: require("../../assets/peak4.jpg"), name: "Thugger", navigateTo: "Send" },
    { id: 5, source: require("../../assets/peak.jpg"), name: "Estaban", navigateTo: "Send" },
  ];

  // Function to format the number with commas
  const formatBalance = (amount) => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(prevState => !prevState); // Toggle the visibility
  };

  // Function to format the amount with a negative sign for sent transactions
  const formatTransactionAmount = (amount, type) => {
    // Remove non-numeric characters and check if it should be negative
    const numericAmount = parseFloat(amount.replace(/[^0-9.-]+/g, ""));
    return type === "sent" ? `-$${numericAmount.toLocaleString()}` : `$${numericAmount.toLocaleString()}`;
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#266A61",
          height: "37%",
          width: "100%",
          borderRadius: 30,
        }}
      >
        <SafeAreaView
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 7,
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Ionicons name="options" size={25} color="white" />
            </TouchableOpacity>
            <View>
              <Text style={{ color: "#979ea8", fontSize: width * 0.05 }}>Good Morning</Text>
              <Text style={{ color: "white", fontSize: width * 0.05 }}>Malone</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications" size={25} color="white" />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={{ display: "flex", marginHorizontal: 20 }}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: "#979ea8", fontSize: width * 0.05 }}>Your Total Balance</Text>
            <TouchableOpacity onPress={toggleBalanceVisibility}>
              <Ionicons name={isBalanceVisible ? "eye-off" : "eye"} size={30} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={{ color: "white", fontSize: width * 0.08, fontWeight: "bold" }}>
            {isBalanceVisible ? formatBalance(totalBalance) : "****"}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginTop: 28,
          }}
        >
          <CustomButton
            title="Request"
            buttonStyle={{
              backgroundColor: "black",
              paddingVertical: 25,
              paddingHorizontal: 50,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
              width: width * 0.4,
            }}
            textStyle={{
              color: "#FFFFFF",
              fontSize: width * 0.04,
              fontWeight: "bold",
            }}
            onPress={() => navigation.navigate('Request')}
          />
          <CustomButton
            title="Send"
            buttonStyle={{
              backgroundColor: "white",
              paddingVertical: 25,
              paddingHorizontal: 50,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
              width: width * 0.4,
            }}
            textStyle={{
              color: "black",
              fontSize: width * 0.04,
              fontWeight: "bold",
            }}
            onPress={() => navigation.navigate('Contacts', { imagesData })} // Pass imagesData when navigating to Contacts
          />
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 15,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "#dce0e6", fontSize: width * 0.06, fontWeight: "600" }}>Quick send</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Contacts', { imagesData })}>
            <Text style={{ color: "#979ea8", fontSize: width * 0.04 }}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 130, marginLeft: 10 }}>
          <ScrollView horizontal showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <TouchableOpacity onPress={() => navigation.navigate('Newcontact')}>
                <View
                  style={{
                    backgroundColor: "gray",
                    height: 100,
                    width: 100,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: -22,
                  }}
                >
                  <Text style={{ fontSize: 40, color: "white" }}>+</Text>
                </View>
              </TouchableOpacity>

              {imagesData.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    navigation.navigate(item.navigateTo, {
                      contactName: item.name,
                      contactPhoto: item.source,
                      contactCard: item.cardNumber,
                    })
                  }
                >
                  <View style={{ alignItems: "center" }}>
                    <Image
                      style={{ height: 100, width: 100, borderRadius: 20 }}
                      source={item.source}
                    />
                    <Text style={{ color: "white", marginTop: 8 }}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      <View style={{ paddingTop: 20, paddingBottom: 10, alignItems: "center" }}>
        <Text style={{ color: "#dce0e6", fontSize: width * 0.05 }}>Transactions</Text>
      </View>

      <SafeAreaView style={{ height: 500 }}>
        <ScrollView horizontal={false} showsVerticalScrollIndicator={false} style={{ marginBottom: 130 }}>
          {transactionData.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              onPress={() => handleTransactionPress(transaction)}
            >
              <View
                style={{
                  height: 100,
                  width: 430,
                  borderRadius: 12,
                  marginTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 15,
                  position: "relative",
                }}
              >
                <Image style={{ height: 100, width: 100, borderRadius: 20 }} source={transaction.source} />
                <View style={{ marginLeft: 15 }}>
                  <Text style={{ color: "#dce0e6", fontSize: width * 0.05 }}>{transaction.name}</Text>
                  <Text style={{ color: "#979ea8", fontSize: width * 0.04, marginTop: 5 }}>{transaction.date}</Text>
                </View>
                <Text style={{ position: "absolute", right: 10, fontSize: width * 0.04, color: "#979ea8" }}>
                  {formatTransactionAmount(transaction.amount, transaction.type)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>

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
                <Text style={styles.modalTitle}>{selectedTransaction.name}</Text>
                <Text style={styles.modalText}>Date: {selectedTransaction.date}</Text>
                <Text style={styles.modalText}>
                  Amount: {formatTransactionAmount(selectedTransaction.amount, selectedTransaction.type)}
                </Text>
                <View style={styles.statusContainer}>
                  {selectedTransaction.status === "completed" ? (
                    <Ionicons name="checkmark-circle" size={40} color="green" />
                  ) : (
                    <Ionicons name="close-circle" size={40} color="red" />
                  )}
                  <Text style={styles.statusText}>
                    {selectedTransaction.status === "completed" ? "Completed" : "failed"}
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
