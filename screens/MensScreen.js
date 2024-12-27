import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
  BackHandler,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const MensScreen = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation();

  // Handle hardware back button
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

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'http://192.168.34.149/teefinder/getCategoriesmens.php'
        );
        const data = await response.json();

        if (data.status === 'success') {
          setCategories(data.data);
        } else {
          console.log('No categories found');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products based on selected category
  const fetchProducts = async (categoryId) => {
    try {
      const response = await fetch(
        `http://192.168.34.149/teefinder/getProductsByCategory.php?category_id=${categoryId}`
      );
      const data = await response.json();

      console.log('Products API Response:', data);

      if (data.status === 'success') {
        setProducts(data.data);
        setFilteredProducts(data.data);
      } else {
        setProducts([]);
        setFilteredProducts([]);
        console.log('No products found for category:', categoryId);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCategoryPress = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item.id)}
    >
      <Image source={{ uri: item.image_url }} style={styles.categoryIcon} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <View>
        {item.platforms.map((platform, index) => (
          <TouchableOpacity key={index}>
            <Text style={styles.platformName}>
              {platform.platformname} - ${platform.platformrate}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderHeader = () => (
    <>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.logoText}>TEEFINDER</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MenuScreen')}>
          <Icon name="menu" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Categories Section */}
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={renderCategory}
        contentContainerStyle={styles.categoryContainer}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );

  return (
    <FlatList
      data={filteredProducts}
      keyExtractor={(item, index) =>
        item.id ? item.id.toString() : index.toString()
      }
      renderItem={renderProduct}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        selectedCategory && (
          <Text style={styles.noProductsText}>
            No items available for this category.
          </Text>
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ffeb99', // Matches the template
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    padding: 5,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff', // Matches the template
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    textAlign: 'center',
  },
  productCard: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: height * 0.2,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
  },
  platformName: {
    fontSize: 14,
    color: '#0056b3',
    marginTop: 5,
  },
  noProductsText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default MensScreen;
