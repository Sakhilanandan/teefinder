import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from "@react-navigation/native";

// Screen dimensions
const { width, height } = Dimensions.get('window');

const mensCategories = [
  { id: '1', name: "Men's", imageUrl: require('../assets/polo.jpg') },
  { id: '2', name: 'Round Neck', imageUrl: require('../assets/roundneck.jpg') },
  { id: '3', name: 'Sleeveless', imageUrl: require('../assets/Sleeveless.jpeg') },
  { id: '4', name: 'Polo', imageUrl: require('../assets/polo3.jpg') },
  { id: '5', name: 'Oversized', imageUrl: require('../assets/oversized4.jpg') },
];

const womensCategories = [
  { id: '1', name: "Women's", imageUrl: require('../assets/henley-t-shirt(Small).jpeg') },
  { id: '2', name: 'Round Neck', imageUrl: require('../assets/round-neck-shirt.jpeg') },
  { id: '3', name: 'vneck', imageUrl: require('../assets/sleevelesw.jpeg') },
  { id: '4', name: 'Crop Top', imageUrl: require('../assets/halfsleeve.jpeg') },
  { id: '5', name: 'halfsleeves', imageUrl: require('../assets/halfsleeve(2).jpeg') },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Extract username and email from route params with fallbacks
  const { username = "Guest", email = "Not Available" } = route.params || {};

  // State to store products fetched from the API
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from PHP API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://192.168.48.22/teefinder/home.php'); // Replace with the correct URL for your PHP script
        const data = await response.json();

        if (data.status === 'success') {
          setProducts(data.data); // Set the products data from the API response
        } else {
          console.log('No products found');
          setError('No products found');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('MenuScreen')} style={styles.menuIcon}>
            <Icon name="menu-outline" size={width * 0.07} color="#0056b3" />
          </TouchableOpacity>
          <Text style={styles.logoText}>TEEFINDER</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')} style={styles.searchBar}>
            <Text style={styles.searchBarText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Men's Categories */}
        <View style={styles.categorySection}>
          <Text style={styles.categoryHeader}>Men's Categories</Text>
          <ScrollView horizontal style={styles.categoriesContainer} showsHorizontalScrollIndicator={false}>
            {mensCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => navigation.navigate('MensScreen', { categoryId: category.id })}
              >
                <Image source={category.imageUrl} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Women's Categories */}
        <View style={styles.categorySection}>
          <Text style={styles.categoryHeader}>Women's Categories</Text>
          <ScrollView horizontal style={styles.categoriesContainer} showsHorizontalScrollIndicator={false}>
            {womensCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => navigation.navigate('WomensScreen', { categoryId: category.id })}
              >
                <Image source={category.imageUrl} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* All Products Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <Text style={styles.loadingText}>Loading products...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <View>
            <FlatList
              data={products}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.productCard}
                  onPress={() => navigation.navigate('DetailsScreen', { productId: item.id })}
                >
                  <Image source={{ uri: item.image }} style={styles.productImage} />
                  <Text style={styles.productName}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
              contentContainerStyle={styles.productList}
              scrollEnabled={false} // Prevents independent scrolling of FlatList
            />
          </View>
        )}
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
          onPress={() => navigation.navigate('ProfileScreen', { username })}
        >
          <Icon name="person-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { paddingBottom: height * 0.1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.02,
  },
  menuIcon: { marginRight: width * 0.03 },
  logoText: { flex: 1.4, fontSize: width * 0.04, fontWeight: 'bold', color: '#0056b3', textAlign: 'center' },
  searchBar: {
    flex: 3,
    height: height * 0.04,
    backgroundColor: '#f0f0f0',
    borderRadius: width * 0.04,
    paddingHorizontal: width * 0.04,
    marginLeft: width * 0.04,
  },
  categorySection: { marginVertical: height * 0.015 },
  categoryHeader: { paddingHorizontal: width * 0.03, fontSize: width * 0.045, fontWeight: 'bold', color: '#333', marginBottom: height * 0.03 },
  categoriesContainer: { paddingHorizontal: width * 0.04 },
  categoryCard: { alignItems: 'center', marginHorizontal: width * 0.02 },
  categoryImage: { width: width * 0.15, height: width * 0.15, borderRadius: (width * 0.15) / 2 },
  categoryText: { fontSize: width * 0.03, marginTop: height * 0.005, color: '#333' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
    marginTop: height * 0.02,
  },
  sectionTitle: { fontSize: width * 0.05, fontWeight: 'bold', color: '#333' },
  seeAll: { fontSize: width * 0.035, color: '#0056b3' },
  productList: { paddingHorizontal: width * 0.03 },
  productCard: {
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: height * 0.02,
    borderRadius: width * 0.02,
    backgroundColor: '#f0f0f0',
    padding: width * 0.03,
    alignItems: 'center',
  },
  productImage: { width: '100%', height: height * 0.15, borderRadius: width * 0.02 },
  productName: { marginTop: height * 0.01, fontSize: width * 0.04, fontWeight: 'bold', colorr: '#333' },
  productPrice: { marginTop: height * 0.005, fontSize: width * 0.035, color: '#555' },
  loadingText: { fontSize: width * 0.04, color: '#333', textAlign: 'center', marginTop: height * 0.02 },
  errorText: { fontSize: width * 0.04, color: 'red', textAlign: 'center', marginTop: height * 0.02 },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0056b3',
    paddingVertical: height * 0.015,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: { alignItems: 'center' },
  navText: { color: '#fff', fontSize: width * 0.035, marginTop: height * 0.005 },
});

export default HomeScreen;
