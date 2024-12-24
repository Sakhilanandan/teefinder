import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');

  // Handle the SignUp action
  const handleSignUp = () => {
    // Basic client-side validation
    if (!username || !email || !password || !reEnterPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (password !== reEnterPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // Send a POST request to the PHP server for registration
    fetch('http://192.168.227.172/teefinder/signup.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        re_enter_password: reEnterPassword, // Ensure this is sent
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the server response
        if (data.status === 'success') {
          Alert.alert('Success', 'Account created successfully!');
          // Navigate to login screen after successful registration
          navigation.navigate('LoginScreen');
        } else {
          Alert.alert('Error', data.message || 'Registration failed.');
        }
      })
      .catch(error => {
        Alert.alert('Error', 'Network error occurred.');
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Create an Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            style={styles.visibilityButton}
            onPress={() => setPasswordVisible(!isPasswordVisible)}
          >
            <Text style={styles.visibilityText}>
              {isPasswordVisible ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Re-enter Password"
          value={reEnterPassword}
          onChangeText={setReEnterPassword}
          secureTextEntry={!isPasswordVisible}
        />

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginText}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0d8e7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    paddingHorizontal: width * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    paddingVertical: height * 0.1,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: height * 0.05,
    textAlign: 'center',
  },
  input: {
    width: width * 0.85,
    height: height * 0.07,
    borderColor: '#0056b3',
    borderWidth: 1,
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.02,
    backgroundColor: '#d0d8e7',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#0056b3',
    borderWidth: 1,
    borderRadius: width * 0.03,
    marginBottom: height * 0.03,
    width: width * 0.85,
    backgroundColor: '#d0d8e7',
  },
  passwordInput: {
    flex: 1,
    height: height * 0.07,
    paddingHorizontal: width * 0.04,
  },
  visibilityButton: {
    paddingHorizontal: width * 0.03,
  },
  visibilityText: {
    color: '#0056b3',
    fontSize: width * 0.04,
  },
  signUpButton: {
    backgroundColor: '#0056b3',
    width: width * 0.85,
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.03,
    marginTop: height * 0.03,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#0056b3',
    fontSize: width * 0.045,
    marginTop: height * 0.02,
    textAlign: 'center',
  },
});

export default SignUpScreen;
