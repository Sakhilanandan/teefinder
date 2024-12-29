import * as React from 'react';
import 'react-native-gesture-handler';  
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import MensScreen from './screens/MensScreen';
import WomensScreen from './screens/WomensScreen';
import DetailsScreen from './screens/DetailsScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import MenuScreen from './screens/MenuScreen';
import AllCategoriesScreen from './screens/AllCategoriesScreen';
import FilterScreen from './screens/FilterScreen';
import SettingsScreen from './screens/SettingsScreen'; // Import SettingsScreen
import  SearchScreen from './screens/SearchScreen';
import  ProfileScreen from './screens/ProfileScreen';
import MyProfileScreen from "./screens/MyProfileScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import FAQScreen from "./screens/FAQScreen";
import ChooseScreen from "./screens/ChooseScreen";
import AdminLoginScreen from "./screens/AdminLoginScreen";
import AdminScreen from "./screens/AdminScreen";
import AdminHomeScreen from "./screens/AdminHomeScreen";
import AdminCategoriesScreen from "./screens/AdminCategoriesScreen";
import AboutUsScreen from "./screens/AboutUsScreen";
import TermsConditionsScreen from "./screens/TermsConditionsScreen";
const Stack = createStackNavigator();

export default function App() {
 return (
  <NavigationContainer>
   <Stack.Navigator initialRouteName="WelcomeScreen">
    <Stack.Screen
     name="WelcomeScreen"
     component={WelcomeScreen}
     options={{ headerShown: false }}
    />
    <Stack.Screen
     name="HomeScreen"
     component={HomeScreen}
     options={{ headerShown: false }}
    />
    <Stack.Screen
     name="MensScreen"
     component={MensScreen}
     options={{ headerShown: false }}
    />
    <Stack.Screen
     name="WomensScreen"
     component={WomensScreen}
     options={{ headerShown: false }}
    />
    <Stack.Screen
     name="DetailsScreen"
     component={DetailsScreen}
     options={{ headerShown: false }}
    />
    <Stack.Screen
     name="LoginScreen"
     component={LoginScreen}
     options={{ headerShown: false }}
    />
    <Stack.Screen
     name="SignUpScreen"
     component={SignUpScreen}
     options={{ headerShown: false }}
    />
    <Stack.Screen
     name="MenuScreen"
     component={MenuScreen}
     options={{ headerShown: false }}
    />
    <Stack.Screen
     name="AllCategoriesScreen"
     component={AllCategoriesScreen}
     options={{ headerShown: false }}
    />
    <Stack.Screen
     name="FilterScreen"
     component={FilterScreen}
     options={{ headerShown: false }}
    />
    <Stack.Screen
     name="SettingsScreen"
     component={SettingsScreen} // Add SettingsScreen to the navigator
     options={{ headerShown: false }}
    />
    <Stack.Screen
     name="SearchScreen"
     component={SearchScreen} // Add SettingsScreen to the navigator
     options={{ headerShown: false }}
    />
     <Stack.Screen
     name="ProfileScreen"
     component={ProfileScreen} // Add SettingsScreen to the navigator
     options={{ headerShown: false }}
    />
     <Stack.Screen
          name="MyProfile"
          component={MyProfileScreen}
          options={{ headerShown: false }}
        />
       <Stack.Screen
          name="ContactUs"
          component={ContactUsScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="FAQScreen"
          component={FAQScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChooseScreen"
          component={ChooseScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="AdminLoginScreen"
          component={AdminLoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminScreen"
          component={AdminScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="AdminHomeScreen"
          component={AdminHomeScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="AdminCategoriesScreen"
          component={AdminCategoriesScreen}
          options={{ headerShown: false }}

        />
         <Stack.Screen
          name="AboutUsScreen"
          component={AboutUsScreen}
          options={{ headerShown: false }}

        />
        
        <Stack.Screen
          name="TermsConditionsScreen"
          component={TermsConditionsScreen}
          options={{ headerShown: false }}

        />
      </Stack.Navigator>
  </NavigationContainer>
 );
}

