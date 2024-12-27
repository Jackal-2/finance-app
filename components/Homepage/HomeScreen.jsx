import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react"; // Import useState and useEffect
import CustomButton from "../CustomButton"; // Assuming this is your custom button component

const HomeScreen = ({ route, navigation }) => {
  // Define the initial transaction data
  const [transactionData, setTransactionData] = useState([
    { id: 1, source: require("../../assets/peak3.jpg"), name: "Wendy", date: "21/12/2024", amount: "$1,850.98" },
    { id: 2, source: require("../../assets/peak2.jpg"), name: "Denise", date: "18/12/24", amount: "$2,400.98" },
    { id: 3, source: require("../../assets/peak1.jpg"), name: "Pablo", date: "31/11/24", amount: "$100.67" },
    { id: 4, source: require("../../assets/peak4.jpg"), name: "Thugger", date: "01/12/24", amount: "$800.78" },
    { id: 5, source: require("../../assets/peak.jpg"), name: "Estaban", date: "22/11/24", amount: "$50.12" },
    { id: 6, source: require("../../assets/peak4.jpg"), name: "Thugger", date: "01/09/24", amount: "$390.31" },
  ]);

  const [totalBalance, setTotalBalance] = useState(12739.58); // Set initial total balance
  const [isBalanceVisible, setIsBalanceVisible] = useState(true); // State to toggle visibility of total balance

  // Listen for the new transaction data from SendMoneyScreen
  useEffect(() => {
    if (route.params?.newTransaction) {
      const newTransaction = route.params.newTransaction;
      setTransactionData((prevData) => [newTransaction, ...prevData]); // Add the new transaction to the list
    }

    if (route.params?.updatedBalance) {
      setTotalBalance(route.params.updatedBalance); // Update the total balance if it's passed from SendMoneyScreen
    }
  }, [route.params?.newTransaction, route.params?.updatedBalance]); // Run when `newTransaction` or `updatedBalance` is updated in route.params

  // Define quick send contacts
  const imagesData = [
    {
      id: 1,
      source: require("../../assets/peak3.jpg"),
      name: "Wendy",
      navigateTo: "Send",
      cardNumber: "**** 1234",
    },
    {
      id: 2,
      source: require("../../assets/peak2.jpg"),
      name: "Denise",
      navigateTo: "Send",
      cardNumber: "**** 5678",
    },
    {
      id: 3,
      source: require("../../assets/peak1.jpg"),
      name: "Pablo",
      navigateTo: "Send",
      cardNumber: "**** 9012",
    },
    {
      id: 4,
      source: require("../../assets/peak4.jpg"),
      name: "Thugger",
      navigateTo: "Send",
      cardNumber: "**** 3456",
    },
    {
      id: 5,
      source: require("../../assets/peak.jpg"),
      name: "Estaban",
      navigateTo: "Send",
      cardNumber: "**** 7890",
    },
  ];

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(prevState => !prevState); // Toggle the visibility
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
            marginBottom: "35",
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
              <Text style={{ color: "#979ea8", fontSize: 20 }}>Good Morning</Text>
              <Text style={{ color: "white", fontSize: 20 }}>Malone</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications" size={25} color="white" />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={{ display: "flex", marginHorizontal: 20 }}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: "#979ea8", fontSize: 20 }}>Your Total Balance</Text>
            <TouchableOpacity onPress={toggleBalanceVisibility}>
              <Ionicons name={isBalanceVisible ? "eye-off" : "eye"} size={30} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
            {isBalanceVisible ? `$${totalBalance.toFixed(2)}` : "****"}
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
              width: "45%",
            }}
            textStyle={{
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: "bold",
            }}
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
              width: "45%",
            }}
            textStyle={{
              color: "black",
              fontSize: 18,
              fontWeight: "bold",
            }}
            onPress={() => navigation.navigate('Send', {
              contactName: "Wendy",
              contactPhoto: require("../../assets/peak3.jpg"),
              contactCard: "**** 1234",
              totalBalance,
              setTotalBalance,
              setTransactionData,
            })}
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
          <Text style={{ color: "#dce0e6", fontSize: 25, fontWeight: "600" }}>Quick send</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Contacts', { imagesData })}>
            <Text style={{ color: "#979ea8", fontSize: 14 }}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 130, marginLeft: 10 }}>
          <ScrollView horizontal showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <TouchableOpacity>
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
        <Text style={{ color: "#dce0e6", fontSize: 20 }}>Transactions</Text>
      </View>

      <SafeAreaView style={{ height: 500 }}>
        <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
          {transactionData.map((transaction) => (
            <TouchableOpacity key={transaction.id}>
              <View
                style={{
                  height: 100,
                  width: 440,
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
                  <Text style={{ color: "#dce0e6", fontSize: 20 }}>{transaction.name}</Text>
                  <Text style={{ color: "#979ea8", fontSize: 15, marginTop: 5 }}>{transaction.date}</Text>
                </View>
                <Text style={{ position: "absolute", right: 15, fontSize: 15, color: "#979ea8" }}>
                  {transaction.amount}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default HomeScreen;
