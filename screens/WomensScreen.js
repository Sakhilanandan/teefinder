import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Linking,
  BackHandler,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const categories = [
  { id: '1', name: 'Oversized', icon: 'https://via.placeholder.com/60' },
  { id: '2', name: 'Polo', icon: 'https://via.placeholder.com/60' },
  { id: '3', name: 'Hoodies', icon: 'https://via.placeholder.com/60' },
  { id: '4', name: 'Sleeves', icon: 'https://via.placeholder.com/60' },
  { id: '5', name: 'Full Sleeves', icon: 'https://via.placeholder.com/60' },
  { id: '6', name: 'Round Neck', icon: 'https://via.placeholder.com/60' },
  { id: '7', name: 'V Neck', icon: 'https://via.placeholder.com/60' },
  { id: '8', name: 'Raglan', icon: 'https://via.placeholder.com/60' },
  { id: '9', name: 'Henley Collar', icon: 'https://via.placeholder.com/60' },
  { id: '10', name: 'Half Sleeves', icon: 'https://via.placeholder.com/60' },
];

const products = [
  {
    id: '1',
    name: 'Floral Printed Cotton Blend Women’s T-Shirt',
    rates: [
      { store: 'Flipkart', price: '₹399', link: 'https://www.flipkart.com' },
      { store: 'Amazon', price: '₹379', link: 'https://www.amazon.com' },
      { store: 'Myntra', price: '₹389', link: 'https://www.myntra.com' },
    ],
    image: 'https://via.placeholder.com/100',
  },
  {
    id: '2',
    name: 'Butterfly Patterned Half Sleeve T-Shirt',
    rates: [
      { store: 'Ajio', price: '₹329', link: 'https://www.ajio.com' },
      { store: 'Flipkart', price: '₹349', link: 'https://www.flipkart.com' },
      { store: 'Snapdeal', price: '₹369', link: 'https://www.snapdeal.com' },
    ],
    image: 'https://via.placeholder.com/100',
  },
  {
    id: '3',
    name: 'Striped Oversized Cotton T-Shirt for Women',
    rates: [
      { store: 'Amazon', price: '₹499', link: 'https://www.amazon.com' },
      { store: 'Myntra', price: '₹469', link: 'https://www.myntra.com' },
      { store: 'Ajio', price: '₹479', link: 'https://www.ajio.com' },
    ],
    image: 'https://via.placeholder.com/100',
  },
];

const WomensScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const navigateToDetails = (product) => {
    navigation.navigate('DetailsScreen', { product });
  };

  const openMenuScreen = () => {
    navigation.navigate('MenuScreen'); // Navigate to the MenuScreen
  };
  const openSearchScreen = () => {
    navigation.navigate('SearchScreen');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={openMenuScreen}>
            <Icon name="menu-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.logoText}>TEEFINDER</Text>
          <TouchableOpacity style={{ flex: 2 }} onPress={openSearchScreen}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search"
              placeholderTextColor="#ccc"
              editable={false} // Disable editing to make it act as a button
            />
            </TouchableOpacity>
        </View>

        <View style={styles.categoryContainer}>
          <View style={styles.categoryRow}>
            {categories.slice(0, 5).map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryItem}>
                <Image source={{ uri: category.icon }} style={styles.categoryIcon} />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.categoryRow}>
            {categories.slice(5, 10).map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryItem}>
                <Image source={{ uri: category.icon }} style={styles.categoryIcon} />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>All Items</Text>
          <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate('FilterScreen')}>
            <Icon name="filter-outline" size={20} color="#333" />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.productGrid}>
          {products.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.productCard}
              onPress={() => navigateToDetails(item)}
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <View style={styles.ratesContainer}>
                {item.rates.map((rate, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.rateLink}
                    onPress={() => Linking.openURL(rate.link)}
                  >
                    <Text style={styles.storeName}>{rate.store}:</Text>
                    <Text style={styles.productPrice}>{rate.price}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    backgroundColor: '#ffcc33',
  },
  scrollContainer: {
    paddingBottom: height * 0.1, // Dynamic padding for bottom navigation
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0056b3',
    paddingHorizontal: width * 0.03, // Dynamic horizontal padding
    paddingVertical: height * 0.02, // Dynamic vertical padding
  },
  logoText: {
    flex: 1,
    fontSize: width * 0.05, // Adjust font size dynamically
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: width * 0.02, // Adjust border radius dynamically
    paddingHorizontal: width * 0.03,
    height: height * 0.05,
    flex: 2,
    marginLeft: width * 0.02,
  },
  categoryContainer: {
    paddingHorizontal: width * 0.03,
    marginVertical: height * 0.02,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.01,
  },
  categoryItem: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: width * 0.02,
  },
  categoryIcon: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
    backgroundColor: '#fff',
  },
  categoryText: {
    fontSize: width * 0.03,
    marginTop: height * 0.005,
    color: '#333',
    textAlign: 'center',
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
    backgroundColor: '#ffcc33',
    paddingVertical: height * 0.01,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: height * 0.02,
  },
  productCard: {
    width: width * 0.4,
    backgroundColor: '#fff',
    borderRadius: width * 0.02,
    marginBottom: height * 0.02,
    padding: width * 0.03,
  },
  productImage: {
    width: '100%',
    height: height * 0.15,
    borderRadius: width * 0.02,
    marginBottom: height * 0.01,
  },
  productName: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
    color: '#333',
  },
  ratesContainer: {
    marginTop: height * 0.01,
  },
  rateLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.005,
  },
  storeName: {
    fontSize: width * 0.035,
    color: '#666',
  },
  productPrice: {
    fontSize: width * 0.035,
    color: '#333',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0056b3',
    paddingVertical: height * 0.015,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: width * 0.035,
    color: '#fff',
  },
});

export default WomensScreen;
