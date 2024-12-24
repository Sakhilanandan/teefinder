import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Screen dimensions
const { width, height } = Dimensions.get('window');

const mensCategories = [
  { id: '1', name: "Men's", imageUrl: require('../assets/polo.jpg') },
  { id: '2', name: 'Round Neck', imageUrl: require('../assets/roundneck.jpg') },
  { id: '3', name: 'Sleeveless', imageUrl: require('../assets/Sleeveless.jpeg') },
  { id: '4', name: 'Polo', imageUrl: require('../assets/polo3.jpg') },
  { id: '5', name: 'Oversized', imageUrl: require('../assets/oversized4.jpg') },
];

const womensCategories = [
  { id: '1', name: "Women's", imageUrl: require('../assets/henley-t-shirt(Small).jpeg') },
  { id: '2', name: 'Round Neck', imageUrl: require('../assets/round-neck-shirt.jpeg') },
  { id: '3', name: 'Sleeveless', imageUrl: require('../assets/sleevelesw.jpeg') },
  { id: '4', name: 'Crop Top', imageUrl: require('../assets/halfsleeve.jpeg') },
  { id: '5', name: 'Oversized', imageUrl: require('../assets/oversizew.jpeg') },
];

const products = [
  { id: '1', name: 'Polo T-Shirt', price: 20, category: 'polo', imageUrl: require('../assets/polo3.jpg') },
  { id: '3', name: 'V-Neck T-Shirt', price: 25, category: 'v-neck', imageUrl: require('../assets/vneck.jpeg') },
  { id: '4', name: 'Oversized T-Shirt', price: 35, category: 'oversized', imageUrl: require('../assets/oversized3.jpg') },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('MenuScreen')} style={styles.menuIcon}>
            <Icon name="menu-outline" size={width * 0.07} color="#0056b3" />
          </TouchableOpacity>
          <Text style={styles.logoText}>TEEFINDER</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')} style={styles.searchBar}>
            <Text style={styles.searchBarText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Men's Categories */}
        <View style={styles.categorySection}>
          <Text style={styles.categoryHeader}>Men's Categories</Text>
          <ScrollView horizontal style={styles.categoriesContainer} showsHorizontalScrollIndicator={false}>
            {mensCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => navigation.navigate('MensScreen', { categoryId: category.id })}
              >
                <Image source={category.imageUrl} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Women's Categories */}
        <View style={styles.categorySection}>
          <Text style={styles.categoryHeader}>Women's Categories</Text>
          <ScrollView horizontal style={styles.categoriesContainer} showsHorizontalScrollIndicator={false}>
            {womensCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => navigation.navigate('WomensScreen', { categoryId: category.id })}
              >
                <Image source={category.imageUrl} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* All Products Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>treand</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.productCard}
                onPress={() => navigation.navigate('DetailsScreen', { productId: item.id })}
              >
                <Image source={item.imageUrl} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.productList}
            scrollEnabled={false} // Prevents independent scrolling of FlatList
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Icon name="home-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Icon name="heart-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("ProfileScreen",{ userNameParam: 'john_doe' })}
        >
          <Icon name="person-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { paddingBottom: height * 0.1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.02,
  },
  menuIcon: { marginRight: width * 0.03 },
  logoText: { flex: 1.4, fontSize: width * 0.04, fontWeight: 'bold', color: '#0056b3', textAlign: 'center' },
  searchBar: {
    flex: 3,
    height: height * 0.04,
    backgroundColor: '#f0f0f0',
    borderRadius: width * 0.04,
    paddingHorizontal: width * 0.04,
    marginLeft: width * 0.04,
  },
  categorySection: { marginVertical: height * 0.015 },
  categoryHeader: { paddingHorizontal: width * 0.03, fontSize: width * 0.045, fontWeight: 'bold', color: '#333', marginBottom: height * 0.03 },
  categoriesContainer: { paddingHorizontal: width * 0.04 },
  categoryCard: { alignItems: 'center', marginHorizontal: width * 0.02 },
  categoryImage: { width: width * 0.15, height: width * 0.15, borderRadius: (width * 0.15) / 2 },
  categoryText: { fontSize: width * 0.03, marginTop: height * 0.005, color: '#333' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
    marginTop: height * 0.02,
  },
  sectionTitle: { fontSize: width * 0.05, fontWeight: 'bold', color: '#333' },
  seeAll: { fontSize: width * 0.035, color: '#0056b3' },
  productList: { paddingHorizontal: width * 0.03 },
  productCard: {
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: height * 0.02,
    borderRadius: width * 0.02,
    backgroundColor: '#f0f0f0',
    padding: width * 0.03,
    alignItems: 'center',
  },
  productImage: { width: '100%', height: height * 0.15, borderRadius: width * 0.02 },
  productName: { marginTop: height * 0.01, fontSize: width * 0.04, fontWeight: 'bold', colorr: '#333' },
 productPrice: { marginTop: height * 0.005, fontSize: width * 0.035, color: '#555' },
 bottomNav: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: '#0056b3',
  paddingVertical: height * 0.015,
  position: 'absolute',
  bottom: 0,
  width: '100%',
 },
 navItem: { alignItems: 'center' },
 navText: { color: '#fff', fontSize: width * 0.035, marginTop: height * 0.005 },
});

export default HomeScreen;