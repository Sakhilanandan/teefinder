import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window'); // Added Dimensions

const AllCategoriesScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('all');
  const [expanded, setExpanded] = useState(true);

  // Sample data for categories
  const categories = [
    { title: 'v-neck' },
    { title: 'round neck' },
    { title: 'hoodies' },
    { title: 'half sleeves' },
    { title: 'full sleeves' },
    { title: 'cropped t-shirt' },
    { title: 'polo' },
    { title: 'round neck' },
    { title: 'raglan sleeve' },
    { title: 'U-neck' },
  ];

  // Handle tab switching
  const handleTabSwitch = (tab) => {
    setSelectedTab(tab);
  };

  // Handle dropdown toggle
  const handleDropdownToggle = () => {
    setExpanded(!expanded);
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryButton}>
      <Text style={styles.categoryText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>All Categories</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs Section */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'all' && styles.activeTab]}
          onPress={() => handleTabSwitch('all')}
        >
          <Text style={styles.tabText}>all</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Female' && styles.activeTab]}
          onPress={() => handleTabSwitch('Female')}
        >
          <Text style={styles.tabText}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Male' && styles.activeTab]}
          onPress={() => handleTabSwitch('Male')}
        >
          <Text style={styles.tabText}>Male</Text>
        </TouchableOpacity>
      </View>

      {/* Category Dropdown and List */}
      <FlatList
        ListHeaderComponent={
          expanded && (
            <TouchableOpacity style={styles.dropdown} onPress={handleDropdownToggle}>
              <Text style={styles.dropdownText}>Clothing</Text>
              <Text style={styles.dropdownArrow}>{expanded ? '▲' : '▼'}</Text>
            </TouchableOpacity>
          )
        }
        data={categories}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.categoriesContainer}
        renderItem={renderCategory}
      />

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.recommendation}>
          <Text style={styles.recommendationText}>Just for You</Text>
        </View>
        <TouchableOpacity style={styles.arrowButton}>
          <Text style={styles.arrowText}>➔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E7F1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    backgroundColor: '#FFCC33',
  },
  headerText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: height * 0.02,
  },
  tabButton: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.05,
    backgroundColor: '#FFFFFF',
  },
  activeTab: {
    backgroundColor: '#007BFF',
  },
  tabText: {
    color: '#000',
    fontSize: width * 0.04,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.015,
    backgroundColor: '#FFFFFF',
    marginHorizontal: width * 0.05,
    borderRadius: width * 0.03,
    marginBottom: height * 0.015,
  },
  dropdownText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  dropdownArrow: {
    fontSize: width * 0.04,
  },
  categoriesContainer: {
    paddingHorizontal: width * 0.05,
  },
  categoryButton: {
    flex: 1,
    margin: width * 0.02,
    paddingVertical: height * 0.02,
    backgroundColor: '#F0F0F0',
    borderRadius: width * 0.03,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: width * 0.04,
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height * 0.03,
    paddingHorizontal: width * 0.05,
  },
  recommendation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendationText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  arrowButton: {
    padding: width * 0.03,
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.1,
  },
  arrowText: {
    fontSize: width * 0.05,
  },
});

export default AllCategoriesScreen;
