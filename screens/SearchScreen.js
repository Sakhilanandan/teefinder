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
  const [userInterest, setUserInterest] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigation = useNavigation();

  // Sample data
  const searchHistory = ['v neck', 'round neck', 'hoodies', 'half sleeves', 'over size'];
  const recommendations = ['Polo', 'Cropped T-Shirt', 'Black T-Shirt', 'Jeans t-shirt', 'Printed Round Neck'];
  const products = [
    { id: '1', name: 'Polo T-Shirt', price: 20, category: 'polo', imageUrl: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Full Sleeve T-Shirt', price: 30, category: 'full sleeve', imageUrl: 'https://via.placeholder.com/150' },
    { id: '3', name: 'V-Neck T-Shirt', price: 25, category: 'v-neck', imageUrl: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Oversized T-Shirt', price: 35, category: 'oversized', imageUrl: 'https://via.placeholder.com/150' },
  ];

  // Handle user interest selection
  const handleInterestSelect = (interest) => {
    if (!userInterest.includes(interest)) {
      const updatedInterests = [...userInterest, interest];
      setUserInterest(updatedInterests);

      const filtered = products.filter((product) =>
        updatedInterests.includes(product.category)
      );
      setFilteredProducts(filtered);
    }
  };

  const displayedProducts = filteredProducts.length > 0 ? filteredProducts : products;

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
        <TextInput style={styles.searchInput} placeholder="Search" />
        <MaterialIcons name="filter-list" size={24} color="black" style={styles.filterIcon} />
      </View>

      {/* Search History */}
      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Search history</Text>
        <View style={styles.tagsContainer}>
          {searchHistory.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tag}
              onPress={() => handleInterestSelect(item)}
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
              onPress={() => handleInterestSelect(item)}
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
          {displayedProducts.map((product) => (
            <View key={product.id} style={[styles.productCard, { width: width * 0.45 }]}>
              <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
              {/* Product details */}
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
  historyContainer: {
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
});

export default SearchScreen;
