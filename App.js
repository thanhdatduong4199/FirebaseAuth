import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from './screens/Login';
import Home from './screens/Home';
import Registration from './screens/Registration';
import Cart from './screens/Cart';
import { auth } from './firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserProfile from './screens/UserProfile';
import ProfileSetting from './screens/ProfileSetting';

LogBox.ignoreAllLogs(true);
 
// navigation.setOptions({tabBarStyle: {display: 'none'}});
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Tab.Navigator 
      screenOptions={
          ({ route }) => ({
            // headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              console.log(route.name);
              if (route.name === 'HomeScreen') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'UserProfile') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              } else if (route.name === 'ProfileSetting'){
                iconName = focused ? 'ios-settings' : 'ios-settings-outline';
              } else if (route.name === 'Cart'){
                iconName = focused ? 'cart' : 'cart-outline';
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })
      }
    >
    <Tab.Screen name="HomeScreen" component={Home} />
    <Tab.Screen name="Cart" component={Cart} />
    <Tab.Screen name="UserProfile" component={UserProfile} />
    <Tab.Screen name="ProfileSetting" component={ProfileSetting} />
  </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator   screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Home" component={HomeStack} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
