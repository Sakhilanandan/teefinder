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
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { productId } = route.params; // Get the product ID from params

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false); // State for favorite status

  // Handle the back button press on Android
  useEffect(() => {
    const backAction = () => {
      navigation.goBack(); // This will trigger the navigation back
      return true; // Prevent default behavior (exit the app)
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [navigation]);

  // Fetch product details based on productId
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        console.log('Fetching product details with productId:', productId); // Log productId for debugging

        const response = await fetch(
          `http://192.168.203.70/teefinder/getProductDetails.php?product_id=${productId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log('API Response:', data);

        if (data.status === 'success') {
          setProduct(data.product);
          setIsFavorite(data.product.is_favorite); // Initialize favorite status
        } else {
          setProduct(null);
          Alert.alert('Error', 'Product not found.');
        }
      } catch (error) {
        console.error('Error fetching product details:', error); // Log error details
        Alert.alert('Error', 'Unable to fetch product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Debugging AsyncStorage
  useEffect(() => {
    const debugUserId = async () => {
      const userId = await AsyncStorage.getItem('user_id');
      console.log('Stored user_id:', userId);
    };
    debugUserId();
  }, []);

  // Function to toggle favorite status
  const toggleFavorite = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      console.log('Retrieved user_id in toggleFavorite:', userId); // Debugging the user_id

      if (!userId) {
        Alert.alert('Error', 'User not logged in.');
        return;
      }

      const response = await fetch('http://192.168.203.70/teefinder/updateFavorite.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: parseInt(userId),
          product_id: productId,
          is_favorite: !isFavorite,
        }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (data.status === 'success') {
        setIsFavorite(!isFavorite);
      } else {
        Alert.alert('Error', 'Failed to update favorite status.');
      }
    } catch (error) {
      console.error('Error in toggleFavorite:', error);
      Alert.alert('Error', 'An error occurred while updating the favorite status.');
    }
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6347" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
          <Icon name="arrow-back-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Details</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={28}
            color={isFavorite ? '#ff6347' : '#fff'}
          />
        </TouchableOpacity>
      </View>

      {/* Product Details */}
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{ uri: product.image || 'https://via.placeholder.com/300' }}
          style={styles.image}
        />
        <Text style={styles.name}>{product.product_name || 'No name available'}</Text>
        <Text style={styles.description}>
          {product.description || 'No description available'}
        </Text>
        {product.platforms && product.platforms.length > 0 ? (
          <View style={styles.platformsContainer}>
            {product.platforms.map((platform, index) => (
              <View key={index} style={styles.platform}>
                <Text style={styles.platformName}>{platform.platformname}</Text>
                <Text style={styles.platformRate}>₹{platform.platformrate}</Text>
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
    backgroundColor: '#ff6347',
    justifyContent: 'space-between',
  },
  iconContainer: { padding: 5 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  content: { padding: 16 },
  image: { width: '100%', height: 300, marginBottom: 16, borderRadius: 10 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
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
  platformName: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#333' },
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
  errorText: { fontSize: 20, color: '#ff6347' },
});

export default DetailsScreen;
