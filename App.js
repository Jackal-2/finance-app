import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './components/Homepage/HomeScreen';
import SettingsScreen from './components/Homepage/SettingsScreen';
import SendMoneyScreen from './components/SendMoneyScreen';
import CardsScreen from './components/CardsScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#0F0F0F',
            borderTopWidth: 0,
            position: 'absolute',
            height: 60,
          },
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: '#fff',
          headerShown: false,
        }}
      >

        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Cards"
          component={CardsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="card-outline" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Send Money"
          component={SendMoneyScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="send-outline" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
