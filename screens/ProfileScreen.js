import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Extract username from navigation params
  const { username } = route.params || {};

  // State to hold user data
  const [userData, setUserData] = useState({
    username: "Loading...",
    email: "Loading...",
  });

  // Handle hardware back press
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

  // Fetch user data when the screen loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://192.168.34.149/teefinder/FetchUser.php?username=${username}`
        );
        
        // Log raw response for debugging
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
            console.error("Failed to fetch user data:", data.message);
          }
        } else {
          console.error("Non-JSON response:", rawText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [username]);

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
});

export default ProfileScreen;
