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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Menu Options */}
      <ScrollView contentContainerStyle={styles.menuOptions}>
        {/* Personal Section */}
        <Text style={styles.sectionHeader}>Personal</Text>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('ProfileScreen')}>
          <Text style={styles.menuTextItem}>Profile</Text>
        </TouchableOpacity>

        {/* Shop Section */}
        <Text style={styles.sectionHeader}>Shop</Text>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('AllCategoriesScreen')}>
          <Text style={styles.menuTextItem}>All Categories</Text>
        </TouchableOpacity>

        {/* Account Section */}
        <Text style={styles.sectionHeader}>Account</Text>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('AboutUsScreen')}>
          <Text style={styles.menuTextItem}>About Us</Text>
        </TouchableOpacity>

        {/* New Additional Options Section */}
        <Text style={styles.sectionHeader}>More Options</Text>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('SettingsScreen')}>
          <Icon name="settings" size={20} color="#000" style={styles.icon} />
          <Text style={styles.menuTextItem}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="star-rate" size={20} color="#FFD700" style={styles.icon} />
          <Text style={styles.menuTextItem}>Rate Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="share" size={20} color="#000" style={styles.icon} />
          <Text style={styles.menuTextItem}>Share App</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="system-update" size={20} color="#000" style={styles.icon} />
          <Text style={styles.menuTextItem}>Check for Update</Text>
        </TouchableOpacity>

        {/* Delete Account */}
        <TouchableOpacity style={styles.menuItem}>
          <Text style={[styles.menuTextItem, styles.deleteText]}>Delete My Account</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Slada</Text>
          <Text style={styles.footerText}>Version 1.0 April, 2020</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05, paddingVertical: height * 0.02, backgroundColor: '#EAEAEA', borderBottomWidth: 1, borderBottomColor: '#DDD' },
  menuText: { fontSize: width * 0.06, fontWeight: 'bold' },
  closeButton: { fontSize: width * 0.05, fontWeight: 'bold', color: '#000' },
  menuOptions: { paddingHorizontal: width * 0.05, paddingBottom: height * 0.05 },
  sectionHeader: { fontSize: width * 0.045, fontWeight: 'bold', marginVertical: height * 0.01, color: '#444' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: height * 0.015, borderBottomWidth: 1, borderBottomColor: '#DDD' },
  menuTextItem: { fontSize: width * 0.045, color: '#000' },
  subText: { fontSize: width * 0.035, color: '#555' },
  deleteText: { color: 'red' },
  footer: { marginTop: height * 0.03, alignItems: 'center' },
  footerText: { fontSize: width * 0.035, color: '#555' },
  icon: { marginRight: width * 0.03 },
});

export default MenuScreen;
