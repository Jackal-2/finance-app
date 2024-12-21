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
import CustomButton from "../CustomButton";
import SendMoneyScreen from "../SendMoneyScreen";

const HomeScreen = ({ navigation }) => {
  const images = [
    { id: 1, source: require("../../assets/peak3.jpg"), navigateTo: "Send" },
    { id: 2, source: require("../../assets/peak2.jpg") },
    { id: 3, source: require("../../assets/peak1.jpg"), navigateTo: "Send" },
    { id: 4, source: require("../../assets/peak4.jpg") },
  ];

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
            <View>
              <TouchableOpacity>
                <Ionicons name="options" size={25} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  color: "#979ea8",
                  fontSize: "20",
                }}
              >
                Good Morning
              </Text>
              <Text style={{ color: "white", fontSize: "20" }}>Malone</Text>
            </View>
          </View>

          <TouchableOpacity>
            <View style={{}}>
              <Ionicons
                style={{}}
                name="notifications"
                size={25}
                color="white"
              />
            </View>
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
            <Text style={{ color: "#979ea8", fontSize: "20" }}>
              Your Total Balance
            </Text>
            <TouchableOpacity style={{}}>
              <Ionicons name="eye-off" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                color: "white",
                fontSize: "30",
                fontWeight: "bold",
              }}
            >
              $12,739.58
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: "20",
            marginTop: 28,
          }}
        >
          <CustomButton
            title="request"
            buttonStyle={{
              backgroundColor: "black",
              paddingVertical: 20,
              paddingHorizontal: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            textStyle={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}
          />
          <CustomButton
            buttonStyle={{
              backgroundColor: "white",
              paddingVertical: 20,
              paddingHorizontal: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            textStyle={{ color: "black", fontSize: 16, fontWeight: "bold" }}
            title="send"
          />
        </View>
      </View>

      <View
        style={{
          marginTop: 30,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 15,
          }}
        >
          <Text
            style={{
              color: "#dce0e6",
              fontSize: 25,
              fontWeight: "600",
            }}
          >
            Quick send
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                color: "#979ea8",
                fontSize: 14,
              }}
            >
              View all
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 130, marginLeft: 10 }}>
          <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: "gray",
                    height: "100",
                    width: "100",
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 40,
                      color: "white",
                      paddingLeft: "37",
                      paddingTop: "25",
                    }}
                  >
                    +
                  </Text>
                </View>
              </TouchableOpacity>
              {images.map((image) => (
                <TouchableOpacity
                  key={image.id}
                  onPress={
                    image.navigateTo
                      ? () => navigation.navigate(image.navigateTo)
                      : null
                  }
                >
                  <Image
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 20,
                    }}
                    source={image.source}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      <View style={{ paddingTop: "20" }}>
        <Text
          style={{
            color: "#dce0e6",
            fontSize: 20,
          }}
        >
          Transactions
        </Text>
      </View>

      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <TouchableOpacity>
          <View
            style={{
              height: "100",
              width: "440",
              borderRadius: 12,
              marginTop: 10,
              alignItems: "left",
            }}
          >
            <Image
              style={{ height: "100", width: "100", borderRadius: 20 }}
              source={require("../../assets/peak3.jpg")}
            />
            <Text
              style={{
                color: "#dce0e6",
                paddingLeft: "110",
                marginTop: -80,
                fontSize: "20",
              }}
            >
              Wendy
            </Text>
            <Text
              style={{
                color: "#979ea8",
                paddingLeft: "110",
                marginTop: 10,
                fontSize: "15",
              }}
            >
              Today
            </Text>
            <Text
              style={{
                color: "#979ea8",
                paddingLeft: "350",
                marginTop: -35,
                fontSize: "15",
              }}
            >
              $1,850.98
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View
            style={{
              height: "100",
              width: "440",
              borderRadius: 12,
              marginTop: 10,
              alignItems: "left",
            }}
          >
            <Image
              style={{ height: "100", width: "100", borderRadius: 20 }}
              source={require("../../assets/peak3.jpg")}
            />
            <Text
              style={{
                color: "#dce0e6",
                paddingLeft: "110",
                marginTop: -80,
                fontSize: "20",
              }}
            >
              Wendy
            </Text>
            <Text
              style={{
                color: "#979ea8",
                paddingLeft: "110",
                marginTop: 10,
                fontSize: "15",
              }}
            >
              18/12/24
            </Text>
            <Text
              style={{
                color: "#979ea8",
                paddingLeft: "350",
                marginTop: -35,
                fontSize: "15",
              }}
            >
              $2,400.98
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View
            style={{
              height: "100",
              width: "440",
              borderRadius: 12,
              marginTop: 10,
              alignItems: "left",
            }}
          >
            <Image
              style={{ height: "100", width: "100", borderRadius: 20 }}
              source={require("../../assets/peak2.jpg")}
            />
            <Text
              style={{
                color: "#dce0e6",
                paddingLeft: "110",
                marginTop: -80,
                fontSize: "20",
              }}
            >
              Denise
            </Text>
            <Text
              style={{
                color: "#979ea8",
                paddingLeft: "110",
                marginTop: 10,
                fontSize: "15",
              }}
            >
              18/12/24
            </Text>
            <Text
              style={{
                color: "#979ea8",
                paddingLeft: "350",
                marginTop: -35,
                fontSize: "15",
              }}
            >
              $400.65
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View
            style={{
              height: "100",
              width: "440",
              borderRadius: 12,
              marginTop: 10,
              alignItems: "left",
            }}
          >
            <Image
              style={{ height: "100", width: "100", borderRadius: 20 }}
              source={require("../../assets/peak4.jpg")}
            />
            <Text
              style={{
                color: "#dce0e6",
                paddingLeft: "110",
                marginTop: -80,
                fontSize: "20",
              }}
            >
              Thugger
            </Text>
            <Text
              style={{
                color: "#979ea8",
                paddingLeft: "110",
                marginTop: 10,
                fontSize: "15",
              }}
            >
              01/12/24
            </Text>
            <Text
              style={{
                color: "#979ea8",
                paddingLeft: "350",
                marginTop: -35,
                fontSize: "15",
              }}
            >
              $800.78
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View
            style={{
              height: "100",
              width: "440",
              borderRadius: 12,
              marginTop: 10,
              alignItems: "left",
            }}
          >
            <Image
              style={{ height: "100", width: "100", borderRadius: 20 }}
              source={require("../../assets/peak1.jpg")}
            />
            <Text
              style={{
                color: "#dce0e6",
                paddingLeft: "110",
                marginTop: -80,
                fontSize: "20",
              }}
            >
              Pablo
            </Text>
            <Text
              style={{
                color: "#979ea8",
                paddingLeft: "110",
                marginTop: 10,
                fontSize: "15",
              }}
            >
              31/11/24
            </Text>
            <Text
              style={{
                color: "#979ea8",
                paddingLeft: "350",
                marginTop: -35,
                fontSize: "15",
              }}
            >
              $100.67
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View
            style={{
              height: "100",
              width: "440",
              borderRadius: 12,
              marginTop: 10,
              alignItems: "left",
            }}
          >
            <Image
              style={{ height: "100", width: "100", borderRadius: 20 }}
              source={require("../../assets/peak.jpg")}
            />
            <Text
              style={{
                color: "#dce0e6",
                paddingLeft: "110",
                marginTop: -80,
                fontSize: "20",
              }}
            >
              Estaban
            </Text>
            <Text
              style={{
                color: "#979ea8",
                paddingLeft: "110",
                marginTop: 10,
                fontSize: "15",
              }}
            >
              22/11/24
            </Text>
            <Text
              style={{
                color: "#979ea8",
                paddingLeft: "350",
                marginTop: -35,
                fontSize: "15",
              }}
            >
              $50.12
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    alignItems: "center",
  },
});

export default HomeScreen;
