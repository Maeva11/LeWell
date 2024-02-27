import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Components/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Users from './Components/Users.js';
import Lists from './Components/Lists.js';
 
const Tab = createBottomTabNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Accueil') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home';
            } else if (route.name === 'Compte') {
              iconName = focused ? 'ios-person' : 'ios-person';
            } else {
              iconName = focused ? 'ios-list' : 'ios-list';
            }

            // Centrer verticalement les icônes
            return (
              <View style={{ alignItems: 'center' }}>
                <Ionicons name={iconName} size={size} color={color} />
              </View>
            );
          },
          tabBarActiveTintColor: '#41B8D5',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen options={{ tabBarLabel: '', headerShown: false}} name="Liste" component={Lists} />
        <Tab.Screen options={{ tabBarLabel: '', headerShown: false}} name="Accueil" component={Home} />
        <Tab.Screen options={{ tabBarLabel: '',headerShown: false}} name="Compte" component={Users} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}