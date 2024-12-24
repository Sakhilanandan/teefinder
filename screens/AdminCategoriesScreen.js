import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');
const API_URL = "http://192.168.34.149/teefinder/categories.php"; // Replace with your PHP server URL

const AdminCategoriesScreen = () => {
  const [categories, setCategories] = useState([]); // For mens and womens categories
  const [allProducts, setAllProducts] = useState([]); // For all products
  const [newCategory, setNewCategory] = useState({ name: '', imageUrl: null });
  const [newProduct, setNewProduct] = useState({ name: '', price: '', imageUrl: null, categoryId: null });
  const [selectedCategoryType, setSelectedCategoryType] = useState('mens'); // Default to mens
  const [loading, setLoading] = useState(false);

  // Fetch Categories (mens and womens) or Products (allProducts)
  const fetchData = async (type) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?type=${type}&categoryType=${selectedCategoryType}`);
      const json = await response.json();

      if (json.success) {
        if (type === 'categories') {
          setCategories(json.data || []);
        } else {
          setAllProducts(json.data || []);
        }
      } else {
        Alert.alert('Error', json.message || 'Failed to fetch data');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData('categories'); // Initially fetch categories (mens and womens)
    fetchData('products');   // Initially fetch all products
  }, [selectedCategoryType]);

  // Select Image for category or product
  const selectImage = (type) => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image Picker Error:', response.errorMessage);
      } else {
        const uri = response.assets[0]?.uri;
        if (type === 'category') {
          setNewCategory({ ...newCategory, imageUrl: uri });
        } else if (type === 'product') {
          setNewProduct({ ...newProduct, imageUrl: uri });
        }
      }
    });
  };

  // Add new category (mens/womens)
  const addCategory = async () => {
    if (!newCategory.name || !newCategory.imageUrl) {
      Alert.alert('Error', 'Please provide all required details.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newCategory.name);
    formData.append('categoryType', selectedCategoryType);
    formData.append('imageUrl', {
      uri: newCategory.imageUrl,
      type: 'image/jpeg',
      name: `category_${Date.now()}.jpg`,
    });

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const json = await response.json();

      if (json.success) {
        Alert.alert('Success', json.message);
        fetchData('categories'); // Refresh categories list
      } else {
        Alert.alert('Error', json.message || 'Failed to add category');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while adding the category');
    }

    setNewCategory({ name: '', imageUrl: null });
  };

  // Add new product
  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.imageUrl || !newProduct.categoryId) {
      Alert.alert('Error', 'Please provide all required details.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('categoryId', newProduct.categoryId);
    formData.append('imageUrl', {
      uri: newProduct.imageUrl,
      type: 'image/jpeg',
      name: `product_${Date.now()}.jpg`,
    });

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const json = await response.json();

      if (json.success) {
        Alert.alert('Success', json.message);
        fetchData('products'); // Refresh products list
      } else {
        Alert.alert('Error', json.message || 'Failed to add product');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while adding the product');
    }

    setNewProduct({ name: '', price: '', imageUrl: null, categoryId: null });
  };

  // Delete category or product
  const deleteItem = async (id, type) => {
    try {
      const response = await fetch(`${API_URL}?type=${type}&id=${id}`, { method: 'DELETE' });
      const json = await response.json();

      if (json.success) {
        Alert.alert('Success', 'Item deleted successfully.');
        fetchData(type === 'products' ? 'products' : 'categories'); // Refresh list after deletion
      } else {
        Alert.alert('Error', json.message || 'Failed to delete item');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while deleting the item');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage {selectedCategoryType === 'allProducts' ? 'Products' : 'Categories'}</Text>

      {/* Input section for adding category or product */}
      <View style={styles.addSection}>
        <TextInput
          style={styles.input}
          placeholder={`Enter ${selectedCategoryType === 'allProducts' ? 'product' : 'category'} name`}
          value={selectedCategoryType === 'allProducts' ? newProduct.name : newCategory.name}
          onChangeText={(text) =>
            selectedCategoryType === 'allProducts'
              ? setNewProduct({ ...newProduct, name: text })
              : setNewCategory({ ...newCategory, name: text })
          }
        />

        {selectedCategoryType === 'allProducts' && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter product price"
              value={newProduct.price}
              keyboardType="numeric"
              onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter product category ID"
              value={newProduct.categoryId}
              onChangeText={(text) => setNewProduct({ ...newProduct, categoryId: text })}
            />
          </>
        )}

        <TouchableOpacity
          style={styles.imageButton}
          onPress={() => selectImage(selectedCategoryType === 'allProducts' ? 'product' : 'category')}
        >
          <Text style={styles.imageButtonText}>
            {selectedCategoryType === 'allProducts' ? (newProduct.imageUrl ? 'Change Product Image' : 'Select Product Image') : (newCategory.imageUrl ? 'Change Category Image' : 'Select Category Image')}
          </Text>
        </TouchableOpacity>

        {selectedCategoryType === 'allProducts' && newProduct.imageUrl && (
          <Image source={{ uri: newProduct.imageUrl }} style={styles.previewImage} />
        )}

        {selectedCategoryType !== 'allProducts' && newCategory.imageUrl && (
          <Image source={{ uri: newCategory.imageUrl }} style={styles.previewImage} />
        )}

        <View style={styles.toggleButtons}>
          <TouchableOpacity
            style={[styles.toggleButton, selectedCategoryType === 'mens' && styles.toggleButtonSelected]}
            onPress={() => setSelectedCategoryType('mens')}
          >
            <Text style={styles.toggleButtonText}>Men's</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, selectedCategoryType === 'womens' && styles.toggleButtonSelected]}
            onPress={() => setSelectedCategoryType('womens')}
          >
            <Text style={styles.toggleButtonText}>Women's</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, selectedCategoryType === 'allProducts' && styles.toggleButtonSelected]}
            onPress={() => setSelectedCategoryType('allProducts')}
          >
            <Text style={styles.toggleButtonText}>All Products</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={selectedCategoryType === 'allProducts' ? addProduct : addCategory}
        >
          <Text style={styles.addButtonText}>
            Add {selectedCategoryType === 'allProducts' ? 'Product' : 'Category'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* List of categories or products */}
      <FlatList
        data={selectedCategoryType === 'allProducts' ? allProducts : categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteItem(item.id, selectedCategoryType === 'allProducts' ? 'products' : 'categories')}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addSection: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  imageButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#fff',
  },
  previewImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  toggleButtons: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  toggleButtonSelected: {
    backgroundColor: '#007BFF',
  },
  toggleButtonText: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    padding: 5,
    backgroundColor: '#FF4136',
  },
  deleteButtonText: {
    color: '#fff',
  },
});

export default AdminCategoriesScreen;
