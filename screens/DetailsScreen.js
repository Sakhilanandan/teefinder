import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  Alert,
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

  // Handle back button press
  useEffect(() => {
    const handleBackPress = () => {
      if (navigation.canGoBack()) {
        navigation.goBack(); // Navigate to the previous screen
      } else {
        Alert.alert(
          'Exit App',
          'Do you want to exit?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
      }
      return true; // Prevent default back behavior
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [navigation]);

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
      </View>

      {/* Product Details */}
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#f5f5f5' },
  iconContainer: { padding: 5 },
  title: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: 'bold' },
  content: { padding: 16 },
  image: { width: '100%', height: 300, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, color: '#555' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default DetailsScreen;
