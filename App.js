import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import { BankAccountProvider } from './components/Settings/BankAccountScreen'; // Updated import

// Import Screens
import HomeScreen from "./components/Homepage/HomeScreen";
import SettingsScreen from "./components/Settings/SettingsScreen";
import SendMoneyScreen from "./components/SendMoneyScreen";
import AllContactsScreen from "./components/Contacts/AllContactsScreen";
import NotificationsScreen from "./components/Homepage/NotificationsScreen";
import PersonalDetailsScreen from "./components/Settings/PersonalDetailsScreen";
import SecurityScreen from "./components/Settings/SecurityScreen";
import BankAccountScreen from './components/Settings/BankAccountScreen';
import LoginScreen from "./components/Homepage/LoginScreen";
import NewContactScreen from "./components/Contacts/NewContactScreen";
import TransferScreen from "./components/Settings/TransferScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider> {/* Wrapping the app with PaperProvider to enable React Native Paper components */}
      <BankAccountProvider> {/* Wrapping the app with BankAccountProvider */}
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
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Account" component={PersonalDetailsScreen} />
            <Stack.Screen name="Security" component={SecurityScreen} />
            <Stack.Screen name="Bank" component={BankAccountScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Newcontact" component={NewContactScreen} />
            <Stack.Screen name="Transfer" component={TransferScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </BankAccountProvider>
    </PaperProvider>
  );
};

export default App;
