import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  PanResponder,
  Image,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native"; 
import { ArrowLeft } from "lucide-react-native"; 

const SendMoneyScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { contactName, contactPhoto, contactCard } = route.params || {}; // Receive the contact card

  const [amount, setAmount] = useState("0");
  const [swiped, setSwiped] = useState(false); 
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const formatAmount = (amount) => {
    const number = parseFloat(amount.replace(/,/g, ""));
    return number.toLocaleString();
  };

  const handleKeypadPress = (value) => {
    if (amount.replace(/,/g, "").length >= 7 && value !== "DEL") {
      triggerShake();
      return;
    }

    if (value === "DEL") {
      setAmount((prevAmount) => prevAmount.slice(0, -1) || "0");
    } else {
      setAmount((prevAmount) => (prevAmount === "0" ? value : prevAmount + value));
    }
  };

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

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: slideAnimation },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > 150) {
          setSwiped(true);
          setAmount("0");
          console.log("Money Sent!");

          Animated.spring(slideAnimation, {
            toValue: 0,
            useNativeDriver: true,
          }).start();

          setTimeout(() => {
            setSwiped(false);
          }, 500);
        } else {
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
      onPress={() => handleKeypadPress(value)}
    >
      <Text style={styles.keypadButtonText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#D3D3D3" />
        </TouchableOpacity>
      </View>

      <View style={styles.nameArea}>
        <View style={styles.profileContainer}>
          <Image source={contactPhoto} style={styles.profileImage} />
          <View style={styles.textInfo}>
            <Text style={styles.nameText}>{contactName}</Text>
            <Text style={styles.cardText}>{contactCard}</Text> {/* Display passed card number */}
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.transparentCancelButton}>
          <Text style={styles.cancelButtonText}>X</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.secondBar}>
        <Animated.View
          style={{
            transform: [{ translateX: shakeAnimation }],
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: 75, color: "white", marginBottom: 5 }}>
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
    width: 80,
    height: 70,
    borderRadius: 25,
    paddingLeft:"10"
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
    backgroundColor: "transparent",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "white",
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
    backgroundColor: "#34D399",
    borderRadius: 25,
    position: "absolute",
    left: 0,
  },
});

export default SendMoneyScreen;
