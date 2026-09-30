import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from './screens/DashboardScreen';
import PromptScreen from './screens/PromptScreen';
import TotpScreen from './screens/TotpScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Alerts') {
              iconName = focused ? 'shield' : 'shield-outline';
            } else if (route.name === 'Prompt') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Codes') {
              iconName = focused ? 'keypad' : 'keypad-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0056D2',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#ffffff',
            elevation: 0, // for Android
            shadowOpacity: 0, // for iOS
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
          },
          headerTitleStyle: {
            fontWeight: '600',
            color: '#1a1a1a',
          },
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
            backgroundColor: '#ffffff',
            elevation: 0,
            height: 60,
            paddingBottom: 10,
            paddingTop: 5,
          }
        })}
      >
        <Tab.Screen name="Alerts" component={DashboardScreen} options={{ title: 'EBO Security' }} />
        <Tab.Screen name="Prompt" component={PromptScreen} options={{ title: 'Login Attempt' }} />
        <Tab.Screen name="Codes" component={TotpScreen} options={{ title: 'Authenticator' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
