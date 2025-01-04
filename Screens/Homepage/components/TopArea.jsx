import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../../components/CustomButton";

const { width, height } = Dimensions.get("window"); // Get screen width and height

const TopArea = ({
  navigation,
  toggleBalanceVisibility,
  isBalanceVisible,
  formatBalance,
  totalBalance,
  imagesData,
}) => {
  return (
    <View
      style={{
        backgroundColor: "#266A61",
        height: "38%",
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
          marginBottom: 30,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 11,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Ionicons name="options" size={30} color="white" />
          </TouchableOpacity>
          <View>
            <Text style={{ color: "#979ea8", fontSize: 19 }}>Good Morning</Text>
            <Text style={{ color: "white", fontSize: 25, fontWeight: "600" }}>
              Malone
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Ionicons name="notifications" size={25} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={{ display: "flex", marginHorizontal: 20 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#979ea8", fontSize: 19 }}>
            Your Total Balance
          </Text>
          <TouchableOpacity onPress={toggleBalanceVisibility}>
            <Ionicons
              name={isBalanceVisible ? "eye-off" : "eye"}
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 35,
            fontWeight: "bold",
          }}
        >
          {isBalanceVisible ? formatBalance(totalBalance) : "****"}
        </Text>
      </View>

      <View style={styles.buttonsView}>
        <CustomButton
          title="Request"
          buttonStyle={styles.blackButton}
          textStyle={styles.blackButtonText}
          onPress={() => navigation.navigate("Request")}
        />
        <CustomButton
          title="Send"
          buttonStyle={styles.whiteButton}
          textStyle={styles.whiteButtonText}
          onPress={() => navigation.navigate("Contacts", { imagesData })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 28,
  },
  blackButton: {
    backgroundColor: "black",
    paddingVertical: 21,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.4,
  },
  blackButtonText: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  whiteButton: {
    backgroundColor: "white",
    paddingVertical: 21,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.4,
    marginBottom: 3
  },
  whiteButtonText: {
    color: "black",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
});

export default TopArea;
