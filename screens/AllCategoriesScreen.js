import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from './config'; // Import the API base URL

const { width, height } = Dimensions.get('window');

const AllCategoriesScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('all');
  const [categories, setCategories] = useState({ mens: [], womens: [] });
  const [loading, setLoading] = useState(true);

  // Fetch categories from the PHP endpoint using the API_BASE_URL
  useEffect(() => {
    fetch(`${API_BASE_URL}/manage_categories.php`) // Use API_BASE_URL
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success' && data.data) {
          setCategories(data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  // Filter categories based on the selected tab
  const getFilteredCategories = () => {
    if (selectedTab === 'all') {
      return [...(categories.mens || []), ...(categories.womens || [])];
    }
    return categories[selectedTab] || [];
  };

  // Handle category selection and navigation
  const handleCategoryPress = (categoryName) => {
    if (selectedTab === 'mens') {
      navigation.navigate('MensScreen', { categoryName });  // Navigate to MensScreen
    } else if (selectedTab === 'womens') {
      navigation.navigate('WomensScreen', { categoryName });  // Navigate to WomensScreen
    }
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryButton}
      onPress={() => handleCategoryPress(item.name.toLowerCase())}
    >
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderSectionHeader = (sectionTitle) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{sectionTitle}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>All Categories</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'all' && styles.activeTab]}
          onPress={() => setSelectedTab('all')}
        >
          <Text style={styles.tabText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'womens' && styles.activeTab]}
          onPress={() => setSelectedTab('womens')}
        >
          <Text style={styles.tabText}>Women's</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'mens' && styles.activeTab]}
          onPress={() => setSelectedTab('mens')}
        >
          <Text style={styles.tabText}>Men's</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
      ) : (
        <FlatList
          data={getFilteredCategories()}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.categoriesContainer}
          renderItem={renderCategory}
          ListHeaderComponent={selectedTab !== 'all' && renderSectionHeader(selectedTab === 'mens' ? 'Men\'s Categories' : 'Women\'s Categories')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3E7F1' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    backgroundColor: '#FFCC33',
  },
  headerText: { fontSize: width * 0.06, fontWeight: 'bold' },
  closeButton: { fontSize: width * 0.05, fontWeight: 'bold' },
  tabsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: height * 0.02 },
  tabButton: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.05,
    backgroundColor: '#FFFFFF',
  },
  activeTab: { backgroundColor: '#007BFF' },
  tabText: { color: '#000', fontSize: width * 0.04 },
  categoriesContainer: { paddingHorizontal: width * 0.05 },
  categoryButton: {
    flex: 1,
    margin: width * 0.02,
    paddingVertical: height * 0.02,
    backgroundColor: '#F0F0F0',
    borderRadius: width * 0.03,
    alignItems: 'center',
  },
  categoryText: { fontSize: width * 0.04 },
  loader: { marginTop: height * 0.05 },
  sectionHeader: {
    paddingHorizontal: width * 0.05,
    marginVertical: height * 0.02,
  },
  sectionHeaderText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
});

export default AllCategoriesScreen;
