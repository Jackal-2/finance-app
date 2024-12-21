import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // Import Stack Navigator
import HomeScreen from './components/Homepage/HomeScreen';
import SettingsScreen from './components/Homepage/SettingsScreen';
import SendMoneyScreen from './components/SendMoneyScreen';


const Stack = createStackNavigator(); // Create Stack Navigator

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home" // Set the initial route
        screenOptions={{
          headerShown: false, // Hide headers if needed
        }}
      >
        {/* Define the screens in the stack navigator */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Send" component={SendMoneyScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
