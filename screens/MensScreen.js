import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const WomensScreen = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://192.168.34.149/teefinder/getCategoriesmens.php');
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

  const fetchProducts = async (categoryId) => {
    try {
      const response = await fetch(`http://192.168.34.149/teefinder/getProductsByCategory.php?category_id=${categoryId}`);
      const data = await response.json();

      if (data.status === 'success') {
        setProducts(data.data);
      } else {
        setProducts([]);
        console.log('No products found');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCategoryPress = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item.id)}>
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Search and Menu */}
      <View style={styles.header}>
        <Text style={styles.logoText}>TEEFINDER</Text>
      </View>

      {/* Categories Section */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCategory}
        contentContainerStyle={styles.categoryContainer}
        showsHorizontalScrollIndicator={false}
      />

      {/* Products Section */}
      {selectedCategory && (
        <>
          <Text style={styles.sectionTitle}>Items</Text>
          {products.length > 0 ? (
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderProduct}
              contentContainerStyle={styles.listContent}
            />
          ) : (
            <Text style={styles.noProductsText}>No items available for this category.</Text>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f7f7f7',
  },
  header: {
    alignItems: 'center',
    marginBottom: 15,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
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
  listContent: {
    paddingBottom: 20,
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

export default WomensScreen;
