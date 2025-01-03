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
  Dimensions,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native"; 
import { ArrowLeft } from "lucide-react-native";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

const SendMoneyScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { contactName, contactPhoto, contactCard } = route.params || {};

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
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.transparentCancelButton}>
          <Text style={styles.cancelButtonText}>x</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.secondBar}>
        <Animated.View
          style={{
            transform: [{ translateX: shakeAnimation }],
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: responsiveFontSize(8), color: "white", marginBottom: 5 }}>
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
            {row.map((value, buttonIndex) => (
              <TouchableOpacity
                key={buttonIndex}
                style={styles.keypadButton}
                onPress={() => handleKeypadPress(value)} 
              >
                <Text style={styles.keypadButtonText}>{value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.bottomRectangle}>
        <View style={styles.swipeContainer}>
          <Text style={{ color: "gray", fontSize: responsiveFontSize(2.5) }}>
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
    height: responsiveHeight(6),
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "start",
  },
  nameArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: responsiveWidth(10),
    borderRadius: 20,
    height: responsiveHeight(12),
    backgroundColor: "#1B1B1B",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: responsiveWidth(20),
    height: responsiveHeight(8),
    borderRadius: 25,
  },
  textInfo: {
    gap: 8,
    marginLeft: 15,
  },
  nameText: {
    color: "white",
    fontWeight: "900",
    fontSize: responsiveFontSize(2),
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
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    color: "grey",
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
    padding: responsiveWidth(5),
  },
  keypadRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: responsiveHeight(2),
  },
  keypadButton: {
    width: responsiveWidth(20),
    height: responsiveHeight(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 40,
    elevation: 3,
  },
  keypadButtonText: {
    color: "white",
    fontSize: responsiveFontSize(4),
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
    width: responsiveWidth(30),
    height: responsiveHeight(6),
    backgroundColor: "#34D399",
    borderRadius: 25,
    position: "absolute",
    left: 0,
  },
});

export default SendMoneyScreen;
