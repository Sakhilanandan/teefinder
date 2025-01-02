import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window'); // Get width and height for responsive design

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  // Sample data
  const searchHistory = ['v neck', 'round neck', 'hoodies', 'half sleeves', 'over size'];
  const recommendations = ['Polo', 'Cropped T-Shirt', 'Black T-Shirt', 'Jeans t-shirt', 'Printed Round Neck'];
  const products = [
    { id: '1', name: 'Polo T-Shirt', price: 20, category: 'Polo', imageUrl: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Full Sleeve T-Shirt', price: 30, category: 'Full Sleeve', imageUrl: 'https://via.placeholder.com/150' },
    { id: '3', name: 'V-Neck T-Shirt', price: 25, category: 'V-Neck', imageUrl: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Oversized T-Shirt', price: 35, category: 'Oversized', imageUrl: 'https://via.placeholder.com/150' },
  ];

  // Handle search input change
  const handleSearchChange = (text) => {
    setSearchQuery(text);

    // Filter products based on the search term
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(text.toLowerCase()) ||
      product.category.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);

    // Dynamically set categories based on search
    const uniqueCategories = [...new Set(filtered.map((product) => product.category))];
    setCategories(uniqueCategories);
  };

  // Handle back button
  useEffect(() => {
    const backAction = () => {
      navigation.goBack(); // Navigates back to the previous screen
      return true; // Prevents default back button behavior
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // Cleanup listener on unmount
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
        <MaterialIcons name="filter-list" size={24} color="black" style={styles.filterIcon} />
      </View>

      {/* Categories Filter (Dynamic) */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.tagsContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tag}
              onPress={() => handleSearchChange(category)} // Filter products by category
            >
              <Text style={styles.tagText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Search History */}
      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Search History</Text>
        <View style={styles.tagsContainer}>
          {searchHistory.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tag}
              onPress={() => handleSearchChange(item)} // Set search to history item
            >
              <Text style={styles.tagText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recommendations */}
      <View style={styles.recommendationsContainer}>
        <Text style={styles.sectionTitle}>Recommendations</Text>
        <View style={styles.tagsContainer}>
          {recommendations.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tag}
              onPress={() => handleSearchChange(item)} // Set search to recommendation item
            >
              <Text style={styles.tagText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Product List */}
      <View style={styles.productList}>
        <Text style={styles.sectionTitle}>Discover</Text>
        <View style={styles.productContainer}>
          {(filteredProducts.length > 0 ? filteredProducts : products).map((product) => (
            <View key={product.id} style={[styles.productCard, { width: width * 0.45 }]}>
              <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.04,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.015,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: width * 0.05,
    paddingHorizontal: width * 0.03,
    marginHorizontal: width * 0.025,
    height: height * 0.06,
  },
  filterIcon: {
    marginRight: width * 0.02,
  },
  categoriesContainer: {
    marginVertical: height * 0.015,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: width * 0.045,
    marginBottom: height * 0.01,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    borderRadius: width * 0.05,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    margin: width * 0.02,
  },
  tagText: {
    fontSize: width * 0.035,
    color: '#555',
  },
  productList: {
    marginVertical: height * 0.03,
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: width * 0.03,
    padding: width * 0.025,
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: '#eee',
  },
  productImage: {
    width: '100%',
    height: height * 0.15,
    resizeMode: 'contain',
    marginBottom: height * 0.01,
  },
  productName: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  productPrice: {
    fontSize: width * 0.035,
    color: '#888',
  },
});

export default SearchScreen;
