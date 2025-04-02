import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    Alert, 
    Dimensions, 
    Image 
} from 'react-native';
import API_BASE_URL from './config'; // Import the API URL

const { width, height } = Dimensions.get('window');

const API_URL = `${API_BASE_URL}/login.php`;
  // Use the API URL from config.js

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const handleLogin = async () => {
        try {
            if (!username || !password) {
                Alert.alert("Error", "Please enter both username and password.");
                return;
            }
    
            // Log the request payload for debugging
            console.log('Request Payload:', {
                username: username.trim(),
                password: password.trim(),
            });
    
            // Log the constructed API URL for debugging
            console.log('API URL:', API_URL);
    
            // Send the login request
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
    
            // Check for response status
            if (response.ok) {
                const data = await response.json();
    
                // Log the API response for debugging
                console.log('API Response:', data);
    
                if (data.status === "success") {
                    Alert.alert("Login Successful", `Welcome, ${data.username || 'User'}!`);
                    navigation.navigate(data.role === "admin" ? "AdminHomeScreen" : "HomeScreen", {
                        username: data.username,
                    });
                } else {
                    Alert.alert("Login Failed", data.message || "Invalid credentials.");
                }
            } else {
                Alert.alert("Error", "An unexpected error occurred. Please try again.");
            }
        } catch (error) {
            console.log('Error:', error);
            Alert.alert("Error", "Unable to connect to the server. Please check your internet connection.");
        }
    };
    


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Log in to your account</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#aaa"
                value={username}
                onChangeText={setUsername}
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity 
                    style={styles.visibilityButton} 
                    onPress={() => setPasswordVisible(!isPasswordVisible)}
                >
                    <Text style={styles.visibilityText}>
                        {isPasswordVisible ? "Hide" : "Show"}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
            >
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                <Text style={styles.signupText}>Don't have an account? Sign Up!</Text>
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
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        alignItems: 'center',
        padding: width * 0.05,
    },
    title: {
        fontSize: width * 0.07,
        fontWeight: 'bold',
        color: '#0056b3',
        marginBottom: height * 0.02,
    },
    subtitle: {
        fontSize: width * 0.045,
        color: '#666',
        marginBottom: height * 0.03,
    },
    input: {
        width: width * 0.85,
        height: height * 0.07,
        backgroundColor: '#ffffff',
        borderRadius: width * 0.02,
        paddingHorizontal: width * 0.04,
        marginBottom: height * 0.015,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: width * 0.04,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.85,
        height: height * 0.07,
        backgroundColor: '#ffffff',
        borderRadius: width * 0.02,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: height * 0.015,
        paddingHorizontal: width * 0.02,
    },
    passwordInput: {
        flex: 1,
        fontSize: width * 0.04,
        color: 'black', // Set the text color to black
    },
    
    visibilityButton: {
        paddingHorizontal: width * 0.03,
    },
    visibilityText: {
        color: '#0056b3',
        fontSize: width * 0.04,
    },
    loginButton: {
        width: width * 0.85,
        height: height * 0.07,
        backgroundColor: '#0056b3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width * 0.02,
        marginBottom: height * 0.02,
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
        backgroundColor: '#6c757d',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width * 0.02,
        marginTop: height * 0.03,
    },
    guestButtonText: {
        color: '#fff',
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
