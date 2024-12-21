import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  FlatList,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ArrowLeft } from "lucide-react-native";

const HomeScreen = ({ navigation }) => {
  const renderKeypadButton = (value) => (
    <TouchableOpacity style={styles.keypadButton}>
      <Text style={styles.keypadButtonText}>{value}</Text>
    </TouchableOpacity>
  );
  return (
    // <View style={styles.container}>

    //     <SafeAreaView
    //         style={{
    //             display: "flex",
    //             flexDirection: "row",
    //             alignItems: "center",
    //             justifyContent: "space-between",
    //             marginHorizontal: 20,
    //             marginTop: "35",
    //         }}
    //     >

    //         <TouchableOpacity style={{
    //             display: "flex",
    //             flexDirection: "row",
    //             alignItems: "center",
    //             justifyContent: "space-between",

    //         }}>
    //             <View
    //                 style={{
    //                     height: "90",
    //                     width: "410",
    //                     borderRadius: 12,
    //                     marginTop: 10,
    //                     alignItems: "left",
    //                     backgroundColor: "#0F0F0F"
    //                 }}
    //             >
    //                 <Image
    //                     style={{ height: "80", width: "60", borderRadius: 20 }}
    //                     source={require("../assets/peak3.jpg")}
    //                 />

    //             </View>
    //         </TouchableOpacity>

    //     </SafeAreaView>

    //     <StatusBar style="auto" />
    // </View>
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <ScrollView>
        <View style={styles.topBar}>
          <ArrowLeft color="#D3D3D3" />
        </View>
        <View style={styles.nameArea}>
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "red",
                  padding: 33,
                  marginLeft: 15,
                  borderRadius: 10,
                }}
              ></View>
              <View style={{ gap: 8 }}>
                <Text
                  style={{ color: "white", fontWeight: "900", fontSize: 15 }}
                >
                  Roger Whatever
                </Text>
                <Text style={{ color: "gray", fontSize: 15 }}>****5498</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={{ color: "white", marginRight: 15 }}>X</Text>
          </View>
        </View>
        <View style={styles.secondBar}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 75,
              color: "white",
              marginBottom: 5,
            }}
          >
            $150
          </Text>
          <Text style={{ fontWeight: "600", fontSize: 20, color: "gray" }}>
            no tax
          </Text>
        </View>
        <View style={styles.keypadContainer}>
          {[
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
            [".", "0", "DEL"],
          ].map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.keypadRow}>
              {row.map((value) => renderKeypadButton(value))}
            </View>
          ))}
        </View>
        <View style={styles.bottomRectangle}>
          <Text style={{ color: "gray", fontSize: 20 }}>swipe to send </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    alignItems: "center",
  },
  container1: {
    backgroundColor: "black",
  },
  topBar: {
    height: "6%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "start",
  },
  nameArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 40,
    borderRadius: 20,
    height: "12%",
    backgroundColor: "#1B1B1B",
  },
  secondBar: {
    // height: "25%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "black",
    marginTop: 0,
    marginBottom: 0,
  },
  keypadContainer: {
    padding: 15,
  },
  keypadRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  keypadButton: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 40,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  keypadButtonText: {
    color: "white",

    fontSize: 24,
    fontWeight: "bold",
  },
  bottomRectangle: {
    justifyContent: "flex-start",
    backgroundColor: "#1B1B1B",
    paddingHorizontal: 10,
    paddingVertical: 23,

    borderWidth: 1,
    borderRadius: 25,

    marginTop: 0,
  },
});

export default HomeScreen;
