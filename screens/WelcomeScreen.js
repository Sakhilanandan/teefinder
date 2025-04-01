import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
  const colorThemes = [
    {
      background: ['#6a11cb', '#2575fc'],    // Purple to Blue
      textColor: '#ffffff',
      titleColor: '#ffeb3b'                  // Yellow title
    },
    {
      background: ['#f2994a', '#f2c94c'],    // Orange to Yellow
      textColor: '#ffffff',
      titleColor: '#6a1b9a'                  // Deep Purple title
    },
    {
      background: ['#43cea2', '#185a9d'],    // Green to Blue
      textColor: '#ffffff',
      titleColor: '#ff4081'                  // Pink title
    }
  ];

  const [themeIndex, setThemeIndex] = useState(0);

  // Change theme when tapped
  const changeTheme = () => {
    setThemeIndex((prevIndex) => (prevIndex + 1) % colorThemes.length);
  };

  // Auto-navigate to LoginScreen after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 3000); 

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

      {/* "Get Started" Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
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
    paddingHorizontal: width * 0.1,
  },
  welcomeText: {
    fontSize: height * 0.04,
    marginBottom: height * 0.01,
    marginTop: height * 0.05,
    fontWeight: '600',
  },
  toText: {
    fontSize: height * 0.03,
    marginBottom: height * 0.01,
  },
  title: {
    fontSize: height * 0.05,
    fontWeight: 'bold',
    marginBottom: height * 0.015,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: height * 0.022,
    textAlign: 'center',
    marginTop: height * 0.015,
  },
  button: {
    marginTop: height * 0.05,
    backgroundColor: '#007bff',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.3,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: height * 0.025,
    fontWeight: 'bold',
  }
});

export default WelcomeScreen;
