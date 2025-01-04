import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window"); // Get screen width and height

const QuickSend = ({ navigation, imagesData }) => {
  return (
    <>
      <View style={styles.quickSendTitleView}>
        <Text style={styles.quickSendTitle}>Quick send</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Contacts", { imagesData })}
        >
          <Text style={{ color: "#979ea8", fontSize: width * 0.04 }}>
            View all
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 130, marginLeft: 10 }}>
        <ScrollView horizontal showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Newcontact")}>
              <View style={styles.quickSendPlusButton}>
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
                  <Text style={{ color: "white", marginTop: 8 }}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default QuickSend;

const styles = StyleSheet.create({
  quickSendTitleView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginBottom: 10,
  },
  quickSendTitle: {
    color: "#dce0e6",
    fontSize: width * 0.06,
    fontWeight: "600",
  },
  quickSendPlusButton: {
    backgroundColor: "gray",
    height: 100,
    width: 100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -22,
  },
});
