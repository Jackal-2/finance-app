import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ChevronLeft } from "lucide-react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const TopBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ChevronLeft size={40} color="#D3D3D3" />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  topBar: {
    justifyContent: "center",
    paddingVertical: 7,
    paddingHorizontal: 10,
    alignItems: "start",
  },
});
