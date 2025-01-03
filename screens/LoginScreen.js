import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const API_URL = "http://192.168.34.149/teefinder/login.php";

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        try {
            if (!username || !password) {
                Alert.alert("Error", "Please enter both username and password.");
                return;
            }
    
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username.trim(),
                    password: password.trim(),
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                if (data.status === "success") {
                    console.log("Login Successful:", data);
                    Alert.alert("Login Successful", `Welcome, ${data.user.username}!`);
                    
                    // Pass the username to the HomeScreen
                    navigation.navigate("HomeScreen", { username: data.user.username, email: data.user.email });

                } else {
                    Alert.alert("Login Failed", data.message || "Invalid credentials.");
                }
            } else {
                Alert.alert("Error", "An unexpected error occurred. Please try again.");
            }
        } catch (error) {
            Alert.alert("Error", "Unable to connect to the server. Please check your internet connection.");
        }
    };
    
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
            >
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                <Text style={styles.signupText}>New to the App? Sign Up!</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.guestButton} onPress={() => navigation.navigate('HomeScreen')}>
                <Text style={styles.guestButtonText}>Continue as Guest</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d0d8e7',
        padding: width * 0.05,
    },
    title: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        color: '#0056b3',
        marginBottom: height * 0.04,
    },
    input: {
        width: width * 0.85,
        height: height * 0.07,
        backgroundColor: '#d0d8e7',
        borderRadius: width * 0.03,
        paddingHorizontal: width * 0.04,
        marginBottom: height * 0.015,
        borderWidth: 1,
        borderColor: '#0056b3',
    },
    loginButton: {
        width: width * 0.85,
        height: height * 0.07,
        backgroundColor: '#0056b3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width * 0.03,
        marginBottom: height * 0.025,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
    signupText: {
        color: '#0056b3',
        fontSize: width * 0.04,
        marginTop: height * 0.02,
    },
    guestButton: {
        width: width * 0.85,
        height: height * 0.07,
        backgroundColor: '#0056b3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width * 0.03,
        marginTop: height * 0.03,
    },
    guestButtonText: {
        color: '#fff',
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
