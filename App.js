import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/Homepage/HomeScreen";
import SettingsScreen from "./components/Homepage/SettingsScreen";
import SendMoneyScreen from "./components/SendMoneyScreen";
import AllContactsScreen from "./components/AllContactsScreen";

const Stack = createStackNavigator();

const App = () => {
  return (


    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Send" component={SendMoneyScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Contacts" component={AllContactsScreen} />

      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
