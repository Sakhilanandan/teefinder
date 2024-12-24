import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
 const colorThemes = [
  {
   background: ['#a1c4fd', '#c2e9fb'],
   textColor: '#ffffff',
   titleColor: '#0052cc'
  },
  {
   background: ['#d4fc79', '#96e6a1'],
   textColor: '#2f4f4f',
   titleColor: '#00875a'
  }
 ];

 const [themeIndex, setThemeIndex] = useState(0);

 // Change theme when tapped
 const changeTheme = () => {
  setThemeIndex((prevIndex) => (prevIndex + 1) % colorThemes.length);
 };

 // Automatically navigate to LoginScreen after 3 seconds
 useEffect(() => {
  const timer = setTimeout(() => {
   navigation.navigate('ChooseScreen');
  }, 3000);

  // Cleanup timer if the component unmounts
  return () => clearTimeout(timer);
 }, [navigation]);

 const currentTheme = colorThemes[themeIndex];

 return (
  <LinearGradient colors={currentTheme.background} style={styles.container}>
   <TouchableOpacity style={styles.textContainer} onPress={changeTheme}>
    <Text style={[styles.welcomeText, { color: currentTheme.textColor }]}>Welcome</Text>
    <Text style={[styles.toText, { color: currentTheme.textColor }]}>to</Text>
    <Text style={[styles.title, { color: currentTheme.titleColor }]}>Teefinder</Text>
    <Text style={[styles.subtitle, { color: currentTheme.textColor }]}>Find the best deals on T-shirts!</Text>
   </TouchableOpacity>
  </LinearGradient>
 );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
 },
 textContainer: {
  alignItems: 'center',
  paddingHorizontal: width * 0.1, // Adjust padding based on device width
 },
 welcomeText: {
  fontSize: height * 0.03, // Scale font size relative to screen height
  marginBottom: height * 0.01,
  marginTop: height * 0.05,
 },
 toText: {
  fontSize: height * 0.03,
  marginBottom: height * 0.01,
 },
 title: {
  fontSize: height * 0.04,
  fontWeight: 'bold',
  marginBottom: height * 0.015,
  textAlign: 'center',
 },
 subtitle: {
  fontSize: height * 0.02,
  textAlign: 'center',
  marginTop: height * 0.015,
 },
});

export default WelcomeScreen;
