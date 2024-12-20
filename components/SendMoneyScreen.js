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


const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <SafeAreaView
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginHorizontal: 20,
                    marginTop: "35",
                }}
            >

                <TouchableOpacity style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",

                }}>
                    <View
                        style={{
                            height: "90",
                            width: "410",
                            borderRadius: 12,
                            marginTop: 10,
                            alignItems: "left",
                            backgroundColor: "#0F0F0F"
                        }}
                    >
                        <Image
                            style={{ height: "80", width: "60", borderRadius: 20 }}
                            source={require("../assets/peak3.jpg")}
                        />

                    </View>
                </TouchableOpacity>

            </SafeAreaView>





            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
    },
});

export default HomeScreen;