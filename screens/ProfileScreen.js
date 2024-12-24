import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // States to hold user data
  const [userName, setUserName] = useState("Loading...");
  const [email, setEmail] = useState("Loading...");
  const { userNameParam } = route.params || {}; // Extract username passed during navigation

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
    if (!userNameParam) {
      console.error("Username is not provided");
      return;
    }

    const fetchUserDetails = async () => {
      const serverUrl = `http://192.168.111.187/teefinder/getUserDetails.php?username=${userNameParam}`;  // Replace with your server's IP
      try {
        const response = await fetch(serverUrl);
        const result = await response.json();

        if (result.success) {
          setUserName(result.data.username);
          setEmail(result.data.email);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userNameParam]);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userName}</Text>
        <Text style={styles.profileEmail}>{email}</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("MyProfile", { username: userName })}
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
    backgroundColor: "#FFD700",
    paddingTop: height * 0.05,
    paddingHorizontal: width * 0.05,
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
  profileContainer: {
    alignItems: "center",
    marginBottom: height * 0.05,
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    marginBottom: height * 0.02,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  profileEmail: {
    fontSize: 14,
    color: "#555",
  },
  menu: {
    marginVertical: height * 0.02,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  menuIcon: {
    fontSize: 18,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: "#000",
  },
  logoutButton: {
    marginTop: height * 0.03,
    alignSelf: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "#FF0000",
  },
});

export default ProfileScreen;
