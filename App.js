import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



export default function App() {
  return (
    <View style={styles.container}>

      <View style={{ backgroundColor: "#266A61", height: "400", width: "430", borderRadius: 40 }}>


        <View style={{ paddingTop: "100", paddingLeft: "15", }}>
          <Text style={{ color: "#979ea8", fontSize: "20", paddingLeft: "40", paddingTop: "-30" }}>Good Morning</Text>
          <Text style={{ color: "white", fontSize: "20", paddingLeft: "40" }}>Malone</Text>

          <TouchableOpacity style={{ marginTop: -50 }}>
            <Ionicons name="options" size={25} color="white" />
          </TouchableOpacity>

          <Ionicons style={{ paddingLeft: "365", marginTop: -20 }} name="notifications" size={25} color="white" />

        </View>


        <View style={{ paddingTop: "80", marginBottom: 50 }}>

          <Text style={{ color: "#979ea8", fontSize: "20", paddingLeft: "20" }}>Balance</Text>
          <Text style={{ color: "white", fontSize: "30", fontWeight: "bold", paddingLeft: "20" }}>$12,739.58</Text>

          <TouchableOpacity style={{ paddingLeft: "380", marginTop: -50 }}>
            <Ionicons name="eye-off" size={30} color="white" />
          </TouchableOpacity>


        </View>


        <View>

          <TouchableOpacity>

            <View style={{ backgroundColor: "#0F0F0F", height: "80", width: "150", borderRadius: 30, marginLeft: 30 }}>

              <Text style={{ color: "white", paddingLeft: "50", paddingTop: "30" }}>Request</Text>

            </View>

          </TouchableOpacity>

          <TouchableOpacity>

            <View style={{ backgroundColor: "#FFFFFF", height: "80", width: "150", borderRadius: 30, marginLeft: 250, marginTop: -80 }}>

              <Text style={{ color: "0F0F0F", paddingLeft: "60", paddingTop: "30" }}>Send</Text>

            </View>

          </TouchableOpacity>


        </View>


      </View>

      <View style={{ paddingTop: "50" }}>
        <Text style={{ color: "#dce0e6", fontSize: 25, paddingRight: "280", paddingLeft: "10" }}>Quick send</Text>

        <TouchableOpacity>
          <Text style={{ color: "#979ea8", fontSize: 14, paddingLeft: "350", marginTop: -20 }}>View all > </Text>
        </TouchableOpacity>

        <SafeAreaView style={{ height: 130 }}>

          <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between" }}>

              <TouchableOpacity>
                <Image style={{ height: "100", width: "100", borderRadius: 20 }} source={require("./assets/peak3.jpg")} />
              </TouchableOpacity>

              <TouchableOpacity>

                <Image style={{ height: "100", width: "100", borderRadius: 20, paddingLeft: "5" }} source={require("./assets/peak2.jpg")} />

              </TouchableOpacity>

              <TouchableOpacity>
                <Image style={{ height: "100", width: "100", borderRadius: 20, paddingLeft: "5" }} source={require("./assets/peak1.jpg")} />

              </TouchableOpacity>

              <TouchableOpacity>
                <Image style={{ height: "100", width: "100", borderRadius: 20, paddingLeft: "5" }} source={require("./assets/peak4.jpg")} />

              </TouchableOpacity>


              <TouchableOpacity>
                <View style={{ backgroundColor: "black", height: "100", width: "100", borderRadius: 20 }}>
                  <Text style={{ fontSize: 40, color: "white", paddingLeft: "37", paddingTop: "25" }}>+</Text>
                </View>
              </TouchableOpacity>


            </View>

          </ScrollView>

        </SafeAreaView>



      </View>

      <View style={{ paddingTop: "20" }}>
        <Text style={{ color: "white", fontSize: 20, paddingRight: "360", paddingLeft: "10" }}>History</Text>
      </View>

      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>

        <TouchableOpacity>

          <View style={{ height: "100", width: "440", borderRadius: 12, marginTop: 10, alignItems: "left" }}>
            <Image style={{ height: "100", width: "100", borderRadius: 20 }} source={require("./assets/peak3.jpg")} />
            <Text style={{ color: "#dce0e6", paddingLeft: "110", marginTop: -80, fontSize: "20" }}>Wendy</Text>
            <Text style={{ color: "#979ea8", paddingLeft: "110", marginTop: 10, fontSize: "15" }}>Today</Text>
            <Text style={{ color: "#979ea8", paddingLeft: "350", marginTop: -35, fontSize: "15" }}>$1,850.98</Text>

          </View>

        </TouchableOpacity>

        <TouchableOpacity>

          <View style={{ height: "100", width: "440", borderRadius: 12, marginTop: 10, alignItems: "left" }}>
            <Image style={{ height: "100", width: "100", borderRadius: 20 }} source={require("./assets/peak3.jpg")} />
            <Text style={{ color: "#dce0e6", paddingLeft: "110", marginTop: -80, fontSize: "20" }}>Wendy</Text>
            <Text style={{ color: "#979ea8", paddingLeft: "110", marginTop: 10, fontSize: "15" }}>a day ago</Text>
            <Text style={{ color: "#979ea8", paddingLeft: "350", marginTop: -35, fontSize: "15" }}>$2,400.98</Text>

          </View>

        </TouchableOpacity>

        <TouchableOpacity>

          <View style={{ height: "100", width: "440", borderRadius: 12, marginTop: 10, alignItems: "left" }}>
            <Image style={{ height: "100", width: "100", borderRadius: 20 }} source={require("./assets/peak2.jpg")} />
            <Text style={{ color: "#dce0e6", paddingLeft: "110", marginTop: -80, fontSize: "20" }}>Denise</Text>
            <Text style={{ color: "#979ea8", paddingLeft: "110", marginTop: 10, fontSize: "15" }}>a day ago</Text>
            <Text style={{ color: "#979ea8", paddingLeft: "350", marginTop: -35, fontSize: "15" }}>$400.65</Text>

          </View>

        </TouchableOpacity>

        <TouchableOpacity>

          <View style={{ height: "100", width: "440", borderRadius: 12, marginTop: 10, alignItems: "left" }}>
            <Image style={{ height: "100", width: "100", borderRadius: 20 }} source={require("./assets/peak4.jpg")} />
            <Text style={{ color: "#dce0e6", paddingLeft: "110", marginTop: -80, fontSize: "20" }}>Thugger</Text>
            <Text style={{ color: "#979ea8", paddingLeft: "110", marginTop: 10, fontSize: "15" }}>2 days ago</Text>
            <Text style={{ color: "#979ea8", paddingLeft: "350", marginTop: -35, fontSize: "15" }}>$800.78</Text>

          </View>

        </TouchableOpacity>

        <TouchableOpacity>

          <View style={{ height: "100", width: "440", borderRadius: 12, marginTop: 10, alignItems: "left" }}>
            <Image style={{ height: "100", width: "100", borderRadius: 20 }} source={require("./assets/peak1.jpg")} />
            <Text style={{ color: "#dce0e6", paddingLeft: "110", marginTop: -80, fontSize: "20" }}>Pablo</Text>
            <Text style={{ color: "#979ea8", paddingLeft: "110", marginTop: 10, fontSize: "15" }}>a week ago</Text>
            <Text style={{ color: "#979ea8", paddingLeft: "350", marginTop: -35, fontSize: "15" }}>$100.67</Text>

          </View>

        </TouchableOpacity>

        <TouchableOpacity>

          <View style={{ height: "100", width: "440", borderRadius: 12, marginTop: 10, alignItems: "left" }}>
            <Image style={{ height: "100", width: "100", borderRadius: 20 }} source={require("./assets/peak.jpg")} />
            <Text style={{ color: "#dce0e6", paddingLeft: "110", marginTop: -80, fontSize: "20" }}>Estaban</Text>
            <Text style={{ color: "#979ea8", paddingLeft: "110", marginTop: 10, fontSize: "15" }}>a week ago</Text>
            <Text style={{ color: "#979ea8", paddingLeft: "350", marginTop: -35, fontSize: "15" }}>$50.12</Text>

          </View>

        </TouchableOpacity>







      </ScrollView>


      <StatusBar style="auto" />
    </View >
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',


  },
});
