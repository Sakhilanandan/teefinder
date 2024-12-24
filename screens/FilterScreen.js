import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider'; // Import Slider from the package
import { FontAwesome } from '@react-native/vector-icons';

const { width, height } = Dimensions.get('window');

const FilterScreen = () => {
   const [selectedSize, setSelectedSize] = useState('M');
   const [selectedColor, setSelectedColor] = useState(null);
   const [priceRange, setPriceRange] = useState([100, 1000]);
   const [sortOption, setSortOption] = useState('Popular');

   const sizes = ['XS', 'S', 'M', 'L', 'XL'];
   const colors = ['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#00FF00', '#FF00FF', '#FFFF00'];

   const handleApplyFilters = () => {
     // Apply the filters here
     console.log('Filters Applied');
   };

   return (
     <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity style={styles.clearButton} onPress={() => {
            // Clear all filters
            setSelectedSize('M');
            setSelectedColor(null);
            setPriceRange([100, 1000]);
            setSortOption('Popular');
          }}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeContainer}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSize,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={styles.sizeText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.colorContainer}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColor,
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price</Text>
          <View style={styles.priceContainer}>
            <Slider
              style={styles.slider}
              minimumValue={100}
              maximumValue={1000}
              step={50}
              value={priceRange[1]}
              onValueChange={(value) => setPriceRange([priceRange[0], value])}
            />
            <Text style={styles.priceText}>
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sort By</Text>
          <View style={styles.sortContainer}>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortOption === 'Popular' && styles.selectedSort,
              ]}
              onPress={() => setSortOption('Popular')}
            >
              <Text style={styles.sortText}>Popular</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortOption === 'Newest' && styles.selectedSort,
              ]}
              onPress={() => setSortOption('Newest')}
            >
              <Text style={styles.sortText}>Newest</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>
     </ScrollView>
   );
};

const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: width * 0.05, // Adjust padding based on device width
     backgroundColor: '#F8D34A', // Match the yellow background color
   },
   header: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     marginBottom: height * 0.02,
   },
   title: {
     fontSize: height * 0.04,
     fontWeight: 'bold',
   },
   clearButton: {
     padding: 10,
     borderWidth: 1,
     borderColor: '#000',
     borderRadius: 5,
   },
   clearText: {
     fontSize: height * 0.02,
   },
   section: {
     marginBottom: height * 0.03,
   },
   sectionTitle: {
     fontSize: height * 0.03,
     marginBottom: height * 0.01,
     fontWeight: 'bold',
   },
   sizeContainer: {
     flexDirection: 'row',
     justifyContent: 'space-around',
   },
   sizeButton: {
     paddingVertical: height * 0.015,
     paddingHorizontal: width * 0.05,
     borderWidth: 1,
     borderColor: '#000',
     borderRadius: 5,
   },
   selectedSize: {
     backgroundColor: '#00F',
     color: '#FFF',
   },
   sizeText: {
     fontSize: height * 0.02,
   },
   colorContainer: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     marginBottom: height * 0.02,
   },
   colorButton: {
     width: width * 0.1,
     height: width * 0.1,
     borderRadius: width * 0.05,
     borderWidth: 2,
     borderColor: '#FFF',
   },
   selectedColor: {
     borderColor: '#000',
   },
   priceContainer: {
     alignItems: 'center',
   },
   slider: {
     width: '90%',
   },
   priceText: {
     fontSize: height * 0.02,
     marginTop: height * 0.01,
   },
   sortContainer: {
     flexDirection: 'row',
     justifyContent: 'space-around',
   },
   sortButton: {
     paddingVertical: height * 0.015,
     paddingHorizontal: width * 0.05,
     borderWidth: 1,
     borderColor: '#000',
     borderRadius: 5,
   },
   selectedSort: {
     backgroundColor: '#00F',
     color: '#FFF',
   },
   footer: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     marginTop: height * 0.05,
   },
   applyButton: {
     flex: 1,
     backgroundColor: '#0000Fr',
     padding: height * 0.02,
     borderRadius: 5,
     alignItems: 'center',
   },
   applyText: {
     color: '#FFF',
     fontSize: height * 0.025,
   },
});

export default FilterScreen;
