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
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  BackHandler,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');

const MensScreen = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  // Handle hardware back button
  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        navigation.goBack(); // Ensure navigation back
        return true; // Prevent default back behavior
      }
      return false; // Allow default behavior if the screen isn't focused
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
          'http://192.168.203.70/teefinder/getCategoriesmens.php'
        );
        const data = await response.json();
        if (data.status === 'success') {
          setCategories(data.data);
          setFilteredCategories(data.data);
        } else {
          console.log('No categories found');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products by category
  const fetchProducts = async (categoryId) => {
    try {
      const response = await fetch(
        `http://192.168.203.70/teefinder/getProductsByCategory.php?category_id=${categoryId}`
      );
      const data = await response.json();
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

  // Handle search for both categories and products
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredCategories(categories);
      setFilteredProducts(products);
    } else {
      // Filter categories
      const filteredCategoriesList = categories.filter((category) =>
        category.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCategories(filteredCategoriesList);

      // Filter products
      const filteredProductsList = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filteredProductsList);
    }
  };

  // Render a category
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => {
        setSelectedCategory(item.id);
        fetchProducts(item.id);
      }}
    >
      <Image source={{ uri: item.image_url }} style={styles.categoryIcon} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Render a product with price information
  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() =>
        navigation.navigate('DetailsScreen', { productId: item.id })
      }
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      {/* Displaying price details */}
      <View>
        {item.platforms.map((platform, index) => (
          <TouchableOpacity key={index}>
            <Text style={styles.platformName}>
              {platform.platformname} - ₹{platform.platformrate}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.logoText}>TEEFINDER</Text>
              <TouchableOpacity onPress={() => navigation.navigate('MenuScreen')}>
                <Icon name="menu" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search categories or products..."
              value={searchQuery}
              onChangeText={handleSearch}
              returnKeyType="search"
              onSubmitEditing={Keyboard.dismiss}
            />
            <FlatList
              data={filteredCategories}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderCategory}
              contentContainerStyle={styles.categoryContainer}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        }
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={styles.noProductsText}>
            {searchQuery
              ? 'No matching categories or products.'
              : selectedCategory && 'No items available for this category.'}
          </Text>
        }
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ffeb99',
  },
  header: {
    paddingBottom: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
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
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  categoryContainer: {
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
  },
  categoryText: {
    fontSize: 14,
    textAlign: 'center',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
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
