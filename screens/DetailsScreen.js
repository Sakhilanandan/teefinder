import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const DetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { productId } = route.params; // Get the product ID from params

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product details based on productId
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://your-api-url/products/${productId}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
          <Icon name="arrow-back-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.searchBar}>Search</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="share-social-outline" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="heart-outline" size={28} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Product Image */}
        <Image source={{ uri: product.image }} style={styles.productImage} />

        {/* Product Details */}
        <Text style={styles.productTitle}>{product.name}</Text>

        {/* Price Comparison */}
        <View style={styles.priceContainer}>
          {product.rates.map((rate, index) => (
            <View key={index} style={styles.priceRow}>
              <Text style={styles.storeName}>{rate.store}</Text>
              <Text style={styles.price}>{rate.price}</Text>
            </View>
          ))}
        </View>

        {/* Other details (Size, Quantity, etc.) */}
        {/* ... rest of the code */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffcc33' },
  header: { /* Header styles */ },
  // other styles...
});

export default DetailsScreen;
