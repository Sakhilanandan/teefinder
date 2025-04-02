import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Import the API base URL from the config file
import API_BASE_URL from './config';

const { width, height } = Dimensions.get("window");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { username } = route.params || {};

  const [userData, setUserData] = useState({
    username: "Loading...",
    email: "Loading...",
  });

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (username === "guest") {
        setUserData({ username: "Guest", email: "guest" });
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/FetchUser.php?username=${username}`
        );

        const rawText = await response.text();
        console.log("Raw Response:", rawText);

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const data = JSON.parse(rawText);

          if (data.success) {
            setUserData({
              username: data.data.username,
              email: data.data.email,
            });
          } else {
            // Show "User not found" for invalid usernames
            setUserData({
              username: "User not found",
              email: "N/A",
            });
          }
        } else {
          console.error("Non-JSON response:", rawText);
          setUserData({
            username: "Error",
            email: "N/A",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData({
          username: "Error",
          email: "N/A",
        });
      }
    };

    fetchUserData();
  }, [username]);

  const deleteAccount = () => {
    if (username === "guest") {
      Alert.alert("Guest User", "Guest accounts cannot be deleted.");
      return;
    }

    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const response = await fetch(
                `${API_BASE_URL}/deleteUser.php`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                  body: `username=${encodeURIComponent(username)}`,
                }
              );

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

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.profileName}>{userData.username}</Text>
        <Text style={styles.profileEmail}>{userData.email}</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("MyProfile", { username: userData.username })}
        >
          <Text style={styles.menuIcon}>👤</Text>
          <Text style={styles.menuText}>My Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("ContactUs")}
        >
          <Text style={styles.menuIcon}>📞</Text>
          <Text style={styles.menuText}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("FAQScreen")}
        >
          <Text style={styles.menuIcon}>❓</Text>
          <Text style={styles.menuText}>Help & FAQs</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={deleteAccount}
      >
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileEmail: {
    fontSize: 16,
    color: "#555",
  },
  menu: {
    width: width * 0.9,
    marginVertical: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6e6e6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#d9534f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#ff0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ProfileScreen;
