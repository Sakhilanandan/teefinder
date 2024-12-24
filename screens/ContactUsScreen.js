import React, { useEffect } from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 StyleSheet,
 ScrollView,
 BackHandler,
 Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";


const { width, height } = Dimensions.get("window");

const ContactUsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>contact Us</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>How Can We Help You?</Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactButtonText}>Contact Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.faqButton}
      onPress={() => navigation.navigate("FAQScreen")}>
        <Text style={styles.faqButtonText}>FAQs</Text>
      </TouchableOpacity>

      {/* Bottom Card */}
      <View style={styles.bottomCard}>
        <TouchableOpacity style={styles.cardItem}>
          <Ionicons name="headset-outline" size={28} color="#007BFF" />
          <Text style={styles.cardItemText}>Customer service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardItem}>
          <Ionicons name="book-outline" size={28} color="#007BFF" />
          <Text style={styles.cardItemText}>Help & FAQs</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  headerText: {
    fontSize: height * 0.03,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: height * 0.02,
    textAlign: "center",
    marginBottom: height * 0.03,
    color: "#000",
  },
  contactButton: {
    backgroundColor: "#ADD8E6",
    borderRadius: 25,
    paddingVertical: height * 0.015,
    marginBottom: height * 0.02,
    alignItems: "center",
  },
  contactButtonText: {
    fontSize: height * 0.02,
    fontWeight: "bold",
    color: "#000",
  },
  faqButton: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    paddingVertical: height * 0.015,
    marginBottom: height * 0.03,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ADD8E6",
  },
  faqButtonText: {
    fontSize: height * 0.02,
    fontWeight: "bold",
    color: "#000",
  },
  bottomCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: height * 0.02,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.015,
  },
  cardItemText: {
    marginLeft: width * 0.03,
    fontSize: height * 0.02,
    color: "#000",
  },
});

export default ContactUsScreen;
