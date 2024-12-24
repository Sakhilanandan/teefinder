import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const MyProfileScreen = ({ route, navigation }) => {
  const { email } = route.params; // Passed email from ProfileScreen

  // State for input fields
  const [fullName, setFullName] = useState("John Doe"); // Example full name
  const [userEmail, setUserEmail] = useState(email);
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890"); // Example phone number

  const handleSave = () => {
    console.log("Saved Data:", { fullName, userEmail, phoneNumber });
    alert("Profile Updated!");
    navigation.goBack(); // Navigate back to ProfileScreen after saving
  };

  const handleLogout = () => {
    console.log("User logged out");
    navigation.replace("LoginScreen"); // Navigate to the LoginScreen
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileHeader}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()} // Go back to ProfileScreen
        >
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }} // Replace with actual image
          style={styles.profileImage}
        />
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

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="phone-pad"
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
    paddingHorizontal: width * 0.05, // 5% of screen width
    paddingTop: height * 0.05, // 5% of screen height
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: height * 0.03, // 3% of screen height
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
    width: width * 0.25, // 25% of screen width
    height: width * 0.25, // Keep it square
    borderRadius: (width * 0.25) / 2,
    marginBottom: 10,
  },
  profileName: {
    fontSize: height * 0.025, // Relative font size
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
    marginBottom: height * 0.02, // Dynamic spacing
    fontSize: height * 0.02,
    color: "#000",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    padding: height * 0.02, // Dynamic padding
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
