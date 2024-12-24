import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ChooseScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>
      
      {/* User Login Button */}
      <TouchableOpacity
        style={[styles.button, styles.userButton]}
        onPress={() => navigation.navigate('LoginScreen')} // Navigate to User Login
      >
        <Text style={styles.buttonText}>User</Text>
      </TouchableOpacity>
      
      {/* Admin Login Button */}
      <TouchableOpacity
        style={[styles.button, styles.adminButton]}
        onPress={() => navigation.navigate('AdminLoginScreen')} // Navigate to Admin Login
      >
        <Text style={styles.buttonText}>Admin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: height * 0.035,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.05,
  },
  button: {
    width: width * 0.7,
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.03,
    marginVertical: height * 0.02,
  },
  userButton: {
    backgroundColor: '#4CAF50', // Green for User
  },
  adminButton: {
    backgroundColor: '#FF5722', // Orange for Admin
  },
  buttonText: {
    color: '#fff',
    fontSize: height * 0.025,
    fontWeight: 'bold',
  },
});

export default ChooseScreen;
