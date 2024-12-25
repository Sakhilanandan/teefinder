import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const { width } = Dimensions.get('window');

const AdminScreen = () => {
  const [data, setData] = useState({ mens: [], womens: [] });
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [platforms, setPlatforms] = useState([{ platformName: '', platformRate: '', link: '' }]);

  useEffect(() => {
    fetch('http://192.168.34.149/teefinder/manage_categories.php')
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'success') {
          setData(result.data);
        } else {
          console.error('Error fetching categories:', result.message);
        }
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('Image Picker Error:', response.errorMessage);
      } else {
        const imageUri = response.assets[0]?.uri;
        setProductImage(imageUri);
      }
    });
  };

  const handlePlatformChange = (index, field, value) => {
    const updatedPlatforms = [...platforms];
    updatedPlatforms[index][field] = value;
    setPlatforms(updatedPlatforms);
  };

  const addPlatform = () => {
    setPlatforms([...platforms, { platformName: '', platformRate: '', link: '' }]);
  };

  const removePlatform = (index) => {
    const updatedPlatforms = platforms.filter((_, i) => i !== index);
    setPlatforms(updatedPlatforms);
  };

  const addProduct = async () => {
    if (
      !selectedSection ||
      !selectedCategory ||
      !productName ||
      !productDescription ||
      !productImage ||
      platforms.some((p) => !p.platformName || !p.platformRate || !p.link)
    ) {
      Alert.alert('Error', 'Please fill all the required fields');
      return;
    }

    const formData = new FormData();
    formData.append('category_id', selectedCategory);
    formData.append('name', productName);
    formData.append('description', productDescription);

    // Handle the image selection and append to FormData
    const imageUri = productImage;
    const uriParts = imageUri.split('.');
    const fileType = uriParts[uriParts.length - 1]; // e.g., jpg, png
    formData.append('image', {
      uri: imageUri,
      type: `image/${fileType}`,
      name: `product_image.${fileType}`,
    });

    platforms.forEach((platform, index) => {
      formData.append(`platform[${index}][platformname]`, platform.platformName);
      formData.append(`platform[${index}][platformrate]`, platform.platformRate);
      formData.append(`platform[${index}][link]`, platform.link);
    });

    try {
      const response = await fetch('http://192.168.34.149/teefinder/add_product.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.status === 'success') {
        Alert.alert('Success', 'Product and platforms added successfully');
        resetForm();
      } else {
        Alert.alert('Error', result.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const resetForm = () => {
    setSelectedSection(null);
    setSelectedCategory(null);
    setProductName('');
    setProductDescription('');
    setProductImage(null);
    setPlatforms([{ platformName: '', platformRate: '', link: '' }]);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Admin Screen</Text>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={[styles.sectionButton, selectedSection === 'mens' && styles.activeSection]}
            onPress={() => setSelectedSection('mens')}
          >
            <Text style={styles.sectionText}>Mens</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sectionButton, selectedSection === 'womens' && styles.activeSection]}
            onPress={() => setSelectedSection('womens')}
          >
            <Text style={styles.sectionText}>Womens</Text>
          </TouchableOpacity>
        </View>

        {selectedSection && (
          <View style={styles.categoryContainer}>
            <Text style={styles.subHeader}>Select Category</Text>
            {data[selectedSection]?.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryButton, selectedCategory === category.name && styles.activeCategory]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {selectedCategory && (
          <View style={styles.productContainer}>
            <Text style={styles.subHeader}>Add Product</Text>
            <TextInput
              placeholder="Product Name"
              value={productName}
              onChangeText={setProductName}
              style={styles.input}
            />
            <Button title="Select Product Image" onPress={selectImage} />
            {productImage && <Image source={{ uri: productImage }} style={styles.image} />}
            <TextInput
              placeholder="Product Description"
              value={productDescription}
              onChangeText={setProductDescription}
              style={styles.input}
              multiline
            />
            <Text style={styles.subHeader}>Platforms</Text>
            {platforms.map((platform, index) => (
              <View key={index} style={styles.platformContainer}>
                <TextInput
                  placeholder="Platform Name"
                  value={platform.platformName}
                  onChangeText={(value) => handlePlatformChange(index, 'platformName', value)}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Platform Rate"
                  value={platform.platformRate}
                  onChangeText={(value) => handlePlatformChange(index, 'platformRate', value)}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Platform Link"
                  value={platform.link}
                  onChangeText={(value) => handlePlatformChange(index, 'link', value)}
                  style={styles.input}
                />
                <Button title="Remove Platform" onPress={() => removePlatform(index)} />
              </View>
            ))}
            <Button title="Add Another Platform" onPress={addPlatform} />
            <Button title="Add Product" onPress={addProduct} />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { flexGrow: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  sectionContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  sectionButton: { padding: 10, borderRadius: 5, backgroundColor: '#ddd' },
  activeSection: { backgroundColor: '#48c6ef' },
  sectionText: { fontSize: 18 },
  categoryContainer: { marginTop: 10 },
  subHeader: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  categoryButton: { padding: 10, borderRadius: 5, backgroundColor: '#f2f2f2', marginVertical: 5 },
  activeCategory: { backgroundColor: '#fbc02d' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, marginVertical: 5 },
  image: { width: width * 0.6, height: 150, marginVertical: 10, alignSelf: 'center' },
  productContainer: { marginTop: 10 },
  platformContainer: { marginVertical: 10 },
});

export default AdminScreen;
