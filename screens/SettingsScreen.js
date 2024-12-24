import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close-outline" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigation("ContactUs")}
          >
            <Text style={styles.menuText}>Contact Us</Text>
            <Icon name="chevron-forward-outline" size={20} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigation("TermsAndConditions")}
          >
            <Text style={styles.menuText}>Terms and Conditions</Text>
            <Icon name="chevron-forward-outline" size={20} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigation("PrivacyPolicy")}
          >
            <Text style={styles.menuText}>Privacy Policy</Text>
            <Icon name="chevron-forward-outline" size={20} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigation("RateUs")}
          >
            <Text style={styles.menuText}>Rate Us</Text>
            <Icon name="chevron-forward-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigation("DeveloperInfo")}
          >
            <Text style={styles.menuText}>Developer Info</Text>
            <Icon name="chevron-forward-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Icon name="home-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Icon name="heart-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Icon name="person-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d0d8e7", // Light blue background
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#333",
  },
  contentContainer: {
    paddingVertical: height * 0.02,
  },
  section: {
    marginBottom: height * 0.03,
    paddingHorizontal: width * 0.05,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    marginBottom: height * 0.01,
    textTransform: "uppercase",
    color: "#333",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.02,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  menuText: {
    fontSize: width * 0.04,
    color: "#333",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#0056b3",
    height: height * 0.08,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: width * 0.03,
    color: "#fff",
  },
});

export default SettingsScreen;
