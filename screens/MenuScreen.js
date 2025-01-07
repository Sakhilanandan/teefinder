import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, BackHandler, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const MenuScreen = () => {
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  // Handle system back button to navigate back
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.menuText}>Menu</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Menu Options */}
      <ScrollView contentContainerStyle={styles.menuOptions}>
        {/* Personal Section */}
        <Text style={styles.sectionHeader}>Personal</Text>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('MyProfile')}>
          <Icon name="person" size={24} style={styles.icon} />
          <Text style={styles.menuTextItem}>Profile</Text>
        </TouchableOpacity>

        {/* Shop Section */}
        <Text style={styles.sectionHeader}>Shop</Text>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('AllCategoriesScreen')}>
          <Icon name="category" size={24} style={styles.icon} />
          <Text style={styles.menuTextItem}>All Categories</Text>
        </TouchableOpacity>

        {/* More Options Section */}
        <Text style={styles.sectionHeader}>More Options</Text>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('AboutUsScreen')}>
          <Icon name="info" size={24} style={styles.icon} />
          <Text style={styles.menuTextItem}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="star-rate" size={24} style={[styles.icon, { color: '#FFD700' }]} />
          <Text style={styles.menuTextItem}>Rate Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="share" size={24} style={styles.icon} />
          <Text style={styles.menuTextItem}>Share App</Text>
        </TouchableOpacity>

        {/* Support Section */}
        <Text style={styles.sectionHeader}>Support</Text>
        <TouchableOpacity style={styles.highlightedMenuItem} onPress={() => handleNavigation('ContactUs')}>
          <Text style={styles.menuTextHighlighted}>Contact Us</Text>
          <Icon name="chevron-right" size={24} style={styles.highlightedIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.highlightedMenuItem} onPress={() => handleNavigation('TermsConditionsScreen')}>
          <Text style={styles.menuTextHighlighted}>Terms and Conditions</Text>
          <Icon name="chevron-right" size={24} style={styles.highlightedIcon} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0F4F8', // Soft light background
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: width * 0.05,
      paddingVertical: height * 0.025,
      backgroundColor: '#FFD700', // Vibrant yellow header
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      elevation: 4, // Shadow effect
    },
    menuText: {
      fontSize: width * 0.06,
      fontWeight: 'bold',
      color: '#FFFFFF', // White text for contrast
    },
    closeButton: {
      backgroundColor: '#FFFFFF',
      padding: 8,
      borderRadius: 20,
      elevation: 3,
    },
    closeButtonText: {
      fontSize: width * 0.045,
      fontWeight: 'bold',
      color: 'FFFFFF',
    },
    menuOptions: {
      paddingHorizontal: width * 0.05,
      paddingVertical: height * 0.02,
    },
    sectionHeader: {
      fontSize: width * 0.045,
      fontWeight: '600',
      color: '#333',
      marginBottom: height * 0.01,
      marginTop: height * 0.03,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingVertical: height * 0.015,
      paddingHorizontal: width * 0.04,
      borderRadius: 10,
      marginVertical: height * 0.01,
      elevation: 3, // Add depth with shadow
    },
    menuTextItem: {
      fontSize: width * 0.045,
      color: '#333',
      marginLeft: width * 0.03,
      flex: 1,
    },
    icon: {
      color: '#0066CC',
    },
    highlightedMenuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF', 
      paddingVertical: height * 0.015,
      paddingHorizontal: width * 0.04,
      borderRadius: 10,
      marginVertical: height * 0.01,
      elevation: 2, 
    },
    menuTextHighlighted: {
      fontSize: width * 0.048,
      fontWeight: 'bold',
      color: '#0056D2',
      flex: 1,
    },
    highlightedIcon: {
      color: '#0056D2', 
    },
  });
  

export default MenuScreen;
