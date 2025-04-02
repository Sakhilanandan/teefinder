import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";

// Import API base URL from config.js
import API_BASE_URL from './config';

const { width, height } = Dimensions.get("window");

const MyProfileScreen = ({ route, navigation }) => {
  const { username } = route.params || { username: "default_user" };

  const [fullName, setFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/FetchUser1.php?username=${username}`);
        const result = await response.json();

        if (result.status === "success") {
          const { username, email, password } = result.data;
          setFullName(username);
          setUserEmail(email);
          setPassword(password);
        } else {
          Alert.alert("Error", result.message || "Unable to fetch data.");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/updateUserData.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${encodeURIComponent(fullName)}&email=${encodeURIComponent(userEmail)}&password=${encodeURIComponent(password)}`,
      });

      const result = await response.json();
      if (result.success) {
        Alert.alert("Profile Updated", "Your changes have been saved!");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "Failed to update profile.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to connect to the server.");
    }
  };

  const handleLogout = () => {
    Alert.alert("Logged Out", "You have been logged out.", [
      {
        text: "OK",
        onPress: () => navigation.replace("LoginScreen"),
      },
    ]);
  };

  const deleteUser = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const response = await fetch(`${API_BASE_URL}/deleteUser.php`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `username=${encodeURIComponent(username)}`,
              });

              const result = await response.json();
              if (result.success) {
                Alert.alert("Account Deleted", "Your account has been deleted.");
                navigation.replace("LoginScreen");
              } else {
                Alert.alert("Error", result.message || "Failed to delete account.");
              }
            } catch (error) {
              Alert.alert("Error", "Failed to connect to the server.");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0056b3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.profileName}>{fullName}</Text>
        <Text style={styles.profileEmail}>{userEmail}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={userEmail}
          onChangeText={(text) => setUserEmail(text)}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        {/* 🛑 Delete Account Button */}
        <TouchableOpacity style={styles.deleteButton} onPress={deleteUser}>
          <Text style={styles.deleteButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD700",
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFD700",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: height * 0.03,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  profileName: {
    fontSize: height * 0.025,
    fontWeight: "bold",
    color: "#000",
  },
  profileEmail: {
    fontSize: height * 0.02,
    color: "#555",
  },
  form: {
    marginVertical: height * 0.02,
  },
  label: {
    fontSize: height * 0.018,
    marginBottom: 5,
    color: "#000",
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: height * 0.02,
    fontSize: height * 0.02,
    color: "#000",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    padding: height * 0.02,
    alignItems: "center",
    marginBottom: height * 0.015,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: height * 0.02,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FF6347",
    borderRadius: 10,
    padding: height * 0.02,
    alignItems: "center",
    marginBottom: height * 0.015,
  },
  logoutButtonText: {
    color: "#FFF",
    fontSize: height * 0.02,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF0000",
    borderRadius: 10,
    padding: height * 0.02,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#FFF",
    fontSize: height * 0.02,
    fontWeight: "bold",
  },
});

export default MyProfileScreen;
