import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ArrowLeft, ChevronLeft } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const GradientHeader = () => {
  return (
    <>
      <LinearGradient
        colors={["#266A61", "#0F0F0F"]}
        style={styles.gradientBackground}
      >
        <BlurView intensity={50} style={styles.blurContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeft size={40} color="#D3D3D3" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Notifications</Text>
          </View>
        </BlurView>
      </LinearGradient>
    </>
  );
};

export default GradientHeader;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  blurContainer: {
    flex: 1,
    alignItems: "flex-start",
    width: "100%",
    paddingTop: 50,
  },
  header: {
    backgroundColor: "#266A61",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 27,
    color: "#fff",
    fontWeight: "bold",
    paddingLeft: "10",
  },
});
