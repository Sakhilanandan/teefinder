import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const AdminLoginScreen = ({ navigation }) => {
  const [adminuser, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      if (!adminuser || !password) {
        Alert.alert('Error', 'Username and password are required.');
        return;
      }

      const response = await fetch('http://192.168.34.149/teefinder/adminlogin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminuser: adminuser.trim(),
          password: password.trim(),
        }),
      });

      const responseText = await response.text();

      try {
        const data = JSON.parse(responseText);

        if (response.ok && data.status === 'success') {
          Alert.alert('Success', 'Login successful!');
          navigation.navigate('AdminHomeScreen');
        } else {
          Alert.alert('Error', data.message || 'Invalid username or password.');
        }
      } catch (jsonError) {
        console.error('Invalid JSON:', responseText);
        Alert.alert('Error', 'Server returned an invalid response.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Unable to connect to the server. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={adminuser}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e7d9d9',
    padding: width * 0.05,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#b30000',
    marginBottom: height * 0.04,
  },
  input: {
    width: width * 0.85,
    height: height * 0.07,
    backgroundColor: '#e7d9d9',
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.015,
    borderWidth: 1,
    borderColor: '#b30000',
  },
  button: {
    width: width * 0.85,
    height: height * 0.07,
    backgroundColor: '#b30000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.03,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: height * 0.02,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default AdminLoginScreen;
