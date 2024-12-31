import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper"; // Import PaperProvider from react-native-paper
import HomeScreen from "./components/Homepage/HomeScreen";
import SettingsScreen from "./components/Settings/SettingsScreen";
import SendMoneyScreen from "./components/SendMoneyScreen";
import AllContactsScreen from "./components/Contacts/AllContactsScreen";
import NotificationsScreen from "./components/Homepage/NotificationsScreen";
import PersonalDetailsScreen from "./components/Settings/PersonalDetailsScreen";
import SecurityScreen from "./components/Settings/SecurityScreen";
import BankAccountsPage from "./components/Settings/BankAccountScreen";
import LoginScreen from "./components/Homepage/LoginScreen";
import NewContactScreen from "./components/Contacts/NewContactScreen";


const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider> {/* Wrapping the app with PaperProider to enavble React Native Paper components */}
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
          <Stack.Screen name="Bank" component={BankAccountsPage} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Newcontact" component={NewContactScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
