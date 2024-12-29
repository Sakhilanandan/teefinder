import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const MyProfileScreen = ({ route, navigation }) => {
  // Extract email from route params, with a fallback
  const { email } = route.params || { email: "example@example.com" };

  // State for profile details
  const [fullName, setFullName] = useState("John Doe");
  const [userEmail, setUserEmail] = useState(email);
  const [password, setPassword] = useState("123");

  const handleSave = () => {
    Alert.alert("Profile Updated", "Your changes have been saved!");
    navigation.goBack();
  };

  const handleLogout = () => {
    Alert.alert("Logged Out", "You have been logged out.", [
      {
        text: "OK",
        onPress: () => navigation.replace("LoginScreen"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileHeader}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.profileName}>{fullName}</Text>
        <Text style={styles.profileEmail}>{userEmail}</Text>
      </View>

      {/* Editable Fields */}
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

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
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
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    marginBottom: 10,
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
  },
  logoutButtonText: {
    color: "#FFF",
    fontSize: height * 0.02,
    fontWeight: "bold",
  },
});

export default MyProfileScreen;
