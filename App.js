import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import HomeScreen from "./Screens/Homepage/HomeScreen";
import SettingsScreen from "./Screens/Settings/SettingsScreen";
import SendMoneyScreen from "./Screens/Homepage/SendMoneyScreen";
import AllContactsScreen from "./Screens/Contacts/AllContactsScreen";
import NotificationsScreen from "./Screens/Homepage/NotificationsScreen";
import PersonalDetailsScreen from "./Screens/Settings/PersonalDetailsScreen";
import SecurityScreen from "./Screens/Settings/SecurityScreen";
import BankAccountsPage from "./Screens/Settings/BankAccountScreen";
import LoginScreen from "./Screens/Homepage/LoginScreen";
import NewContactScreen from "./Screens/Contacts/NewContactScreen";
import SignUpScreen from "./Screens/Homepage/SignUpScreen";
import ForgotPasswordScreen from "./Screens/Homepage/ForgotPasswordScreen";
import RequestMoneyScreen from "./Screens/Homepage/RequestScreen";


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
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
          <Stack.Screen name="Request" component={RequestMoneyScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;