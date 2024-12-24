import React, { useEffect, useState } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Add Axios for API calls
import FastImage from 'react-native-fast-image'; // For fast image loading

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const MensScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryResponse = await axios.get(
          'http://192.168.34.149/teefinder/categories.php?type=categories&categoryType=mens'
        );
        setCategories(categoryResponse.data.data);

        // Fetch products
        const productResponse = await axios.get(
          'http://your-api-url.com/api.php?type=products'
        );
        setProducts(productResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

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
    navigation.navigate('MenuScreen');
  };

  const openSearchScreen = () => {
    navigation.navigate('SearchScreen');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0056b3" />
      </View>
    );
  }

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
              editable={false}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryItem}>
              <FastImage
                style={styles.categoryIcon}
                source={{
                  uri: category.image_url || 'https://via.placeholder.com/150',
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>All Items</Text>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate('FilterScreen')}
          >
            <Icon name="filter-outline" size={20} color="#333" />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productGrid}>
          {products.map((item) => {
            console.log(item.image_url);  // Log the image URL to debug
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.productCard}
                onPress={() => navigateToDetails(item)}
              >
                <FastImage
                  style={styles.productImage}
                  source={{
                    uri: item.image_url || 'https://via.placeholder.com/150',
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.ratesContainer}>
                  {item.rates?.map((rate, index) => (
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
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#0056b3',
  },
  logoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingLeft: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  categoryItem: {
    width: width / 3 - 20,
    margin: 5,
    alignItems: 'center',
  },
  categoryIcon: {
    width: '100%', // Make the category icon take the full width of the container
    height: 100, // Set fixed height for consistency
    borderRadius: 10,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    marginLeft: 5,
    fontSize: 16,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  productCard: {
    width: width / 2 - 20,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: '100%', // Make the product image take the full width of the card
    height: 150, // Set height for consistency
    borderRadius: 10,
  },
  productName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratesContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  rateLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  storeName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#0056b3',
  },
});

export default MensScreen;
