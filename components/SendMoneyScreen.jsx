import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
  PanResponder,
  Image,
} from "react-native";
import { ArrowLeft } from "lucide-react-native"; // Assuming this is the correct import for the ArrowLeft icon

const SendMoneyScreen = ({ navigation }) => {
  const [amount, setAmount] = useState("0");
  const [swiped, setSwiped] = useState(false); // To track if the button has been swiped fully
  const slideAnimation = useRef(new Animated.Value(0)).current; // Slide position
  const shakeAnimation = useRef(new Animated.Value(0)).current; // Shake animation reference

  // Function to format the number with commas
  const formatAmount = (amount) => {
    const number = parseFloat(amount.replace(/,/g, "")); // Remove commas before formatting
    return number.toLocaleString(); // Format with commas
  };

  // Function to handle button press and update the amount
  const handleKeypadPress = (value) => {
    // Check if the user is trying to input more than 7 digits
    if (amount.replace(/,/g, "").length >= 7 && value !== "DEL") {
      // Trigger the shake animation if the amount exceeds 7 digits
      triggerShake();
      return;
    }

    if (value === "DEL") {
      // If "DEL" is pressed, remove the last character from the amount
      setAmount((prevAmount) => prevAmount.slice(0, -1) || "0");
    } else {
      // Otherwise, append the pressed value to the amount
      setAmount((prevAmount) => (prevAmount === "0" ? value : prevAmount + value));
    }
  };

  // Function to trigger shake animation
  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Function to handle swipe gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null, // React Native now supports this syntax instead of using e => e.nativeEvent
          { dx: slideAnimation }, // Horizontal sliding
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gestureState) => {
        // Trigger an action when the swipe is complete (e.g., when the button reaches a certain position)
        if (gestureState.dx > 150) {
          setSwiped(true);
          setAmount("0"); // Reset the amount to 0 after successful swipe
          // Trigger any action, e.g., send the money
          console.log("Money Sent!");

          // Animate the swipeable button back to the default position
          Animated.spring(slideAnimation, {
            toValue: 0, // Return to default position
            useNativeDriver: true,
          }).start();

          // Reset "Money Sent!" message after 2 seconds
          setTimeout(() => {
            setSwiped(false); // Hide the "Money Sent!" message and return to "Swipe to send"
          }, 500);
        } else {
          // Reset the position if the swipe is incomplete
          Animated.spring(slideAnimation, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
          setSwiped(false);
        }
      },
    })
  ).current;

  const renderKeypadButton = (value) => (
    <TouchableOpacity
      style={styles.keypadButton}
      onPress={() => handleKeypadPress(value)} // Update amount when a key is pressed
    >
      <Text style={styles.keypadButtonText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
        <View style={styles.topBar}>
          {/* Wrap the ArrowLeft in a TouchableOpacity for navigation */}
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <ArrowLeft color="#D3D3D3" />
          </TouchableOpacity>
        </View>

        {/* Modified "Roger Whatever" view with image and transparent cancel button */}
        <View style={styles.nameArea}>
          <View style={styles.profileContainer}>
            {/* Display an image */}
            <Image
              source={require("../assets/peak3.jpg")} // Replace with a valid image URL or a local image
              style={styles.profileImage}
            />
            <View style={styles.textInfo}>
              <Text style={styles.nameText}>Roger Whatever</Text>
              <Text style={styles.cardText}>****5498</Text>
            </View>
          </View>

          {/* Transparent Cancel Button */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.transparentCancelButton}>
            <Text style={styles.cancelButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.secondBar}>
          {/* Display the current amount with a dollar sign and formatted with commas */}
          <Animated.View
            style={{
              transform: [{ translateX: shakeAnimation }], // Apply shake animation
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 75,
                color: "white",
                marginBottom: 5,
              }}
            >
              ${formatAmount(amount)}
            </Text>
          </Animated.View>
        </View>
        <View style={styles.keypadContainer}>
          {[
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
            [".", "0", "DEL"],
          ].map((row, rowIndex) => (
            <View key={rowIndex} style={styles.keypadRow}>
              {row.map((value) => renderKeypadButton(value))}
            </View>
          ))}
        </View>
        <View style={styles.bottomRectangle}>
          {/* Create a swipeable button */}
          <View style={styles.swipeContainer}>
            <Text style={{ color: "gray", fontSize: 20 }}>
              {swiped ? "Sent!" : "Swipe to send"}
            </Text>
            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.swipeButton,
                {
                  transform: [{ translateX: slideAnimation }],
                },
              ]}
            />
          </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 25,
  },
  textInfo: {
    gap: 8,
    marginLeft: 15,
  },
  nameText: {
    color: "white",
    fontWeight: "900",
    fontSize: 15,
  },
  cardText: {
    color: "gray",
    fontSize: 15,
  },
  transparentCancelButton: {
    backgroundColor: "transparent", // Set the background to transparent
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "white", // Text color to make it visible
    fontSize: 18,
    fontWeight: "bold",
  },
  secondBar: {
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
  swipeContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  swipeButton: {
    width: 120,
    height: 50,
    backgroundColor: "#34D399", // Green color
    borderRadius: 25,
    position: "absolute",
    left: 0,
  },
});

export default SendMoneyScreen;