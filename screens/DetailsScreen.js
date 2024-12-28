import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const DetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { productId } = route.params; // Get the product ID from params

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false); // State for favorite status

  // Fetch product details based on productId
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://192.168.34.149/teefinder/getProductDetails.php?product_id=${productId}`
        );
        const data = await response.json();

        if (data.status === 'success') {
          setProduct(data.product);
          setIsFavorite(data.product.is_favorite); // Initialize favorite status
        } else {
          setProduct(null);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Function to toggle favorite status
  const toggleFavorite = async () => {
    try {
      const response = await fetch(
        `http://192.168.34.149/teefinder/updateFavorite.php`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_id: productId,
            is_favorite: !isFavorite,
          }),
        }
      );
      const data = await response.json();
      if (data.status === 'success') {
        setIsFavorite(!isFavorite); // Update favorite state
      } else {
        Alert.alert('Error', 'Failed to update favorite status.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while updating the favorite status.');
    }
  };

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
        <Text style={styles.title}>Details</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={28}
            color={isFavorite ? 'red' : '#000'}
          />
        </TouchableOpacity>
      </View>

      {/* Product Details */}
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{ uri: product.image || 'https://via.placeholder.com/300' }}
          style={styles.image}
        />
        <Text style={styles.name}>{product.name || 'No name available'}</Text>
        <Text style={styles.description}>
          {product.description || 'No description available'}
        </Text>
        {product.platforms && product.platforms.length > 0 ? (
          <View style={styles.platformsContainer}>
            {product.platforms.map((platform, index) => (
              <View key={index} style={styles.platform}>
                <Text style={styles.platformName}>{platform.platformname}</Text>
                <Text style={styles.platformRate}>${platform.platformrate}</Text>
                <TouchableOpacity
                  style={styles.buyButton}
                  onPress={() => {
                    if (platform.link) {
                      Linking.openURL(platform.link).catch(() =>
                        Alert.alert('Error', 'Unable to open link.')
                      );
                    } else {
                      Alert.alert('Error', 'No valid link available.');
                    }
                  }}
                >
                  <Text style={styles.buyButtonText}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text>No platforms available</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  iconContainer: { padding: 5 },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { padding: 16 },
  image: { width: '100%', height: 300, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, color: '#555', marginBottom: 20 },
  platformsContainer: { marginTop: 20 },
  platform: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  platformName: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  platformRate: { fontSize: 16, color: '#444', marginBottom: 5 },
  buyButton: {
    marginTop: 10,
    backgroundColor: '#0056b3',
    padding: 10,
    borderRadius: 5,
  },
  buyButtonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default DetailsScreen;
