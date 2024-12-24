import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const FAQScreen = () => {
  const navigation = useNavigation();
  const [faqOpen, setFaqOpen] = useState(false);

  // Handle back navigation
  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };

  // Register back handler
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Cleanup the back handler when component is unmounted
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Help & FAQs</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subTitle}>How Can We Help You?</Text>

        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.faqButton}>
          <Text style={styles.faqButtonText}>FAQs</Text>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.faqItem} onPress={() => setFaqOpen(!faqOpen)}>
          <Text style={styles.faqQuestion}>How does TeeFinder find the best T-shirt deals?</Text>
          <Text style={styles.expandIcon}>{faqOpen ? '▼' : '▲'}</Text>
        </TouchableOpacity>

        {faqOpen && (
          <View style={styles.faqAnswer}>
            <Text style={styles.faqAnswerText}>
              TeeFinder aggregates prices from top online retailers like Amazon, Flipkart, and others to provide you with the best T-shirt deals in one place.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3d05b', // Yellow background
  },
  scrollView: {
    alignItems: 'center',
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: height * 0.03,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
  },
  subTitle: {
    fontSize: width * 0.05,
    color: '#333',
    marginVertical: height * 0.02,
  },
  contactButton: {
    backgroundColor: '#fde7e0',
    width: width * 0.7,
    paddingVertical: height * 0.02,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  contactButtonText: {
    color: '#333',
    fontSize: width * 0.045,
  },
  faqButton: {
    backgroundColor: '#5779e4',
    width: width * 0.7,
    paddingVertical: height * 0.02,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  faqButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    width: width * 0.9,
    paddingHorizontal: 15,
    marginBottom: height * 0.03,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  searchButton: {
    padding: 10,
  },
  searchButtonText: {
    color: '#888',
    fontSize: width * 0.05,
  },
  faqItem: {
    backgroundColor: '#a5c3ff', // Light blue background for FAQ item
    width: width * 0.9,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  faqQuestion: {
    fontSize: width * 0.045,
    color: '#333',
    fontWeight: 'bold',
  },
  expandIcon: {
    fontSize: width * 0.05,
    color: '#333',
  },
  faqAnswer: {
    backgroundColor: '#a5c3ff', // Same color for the answer section
    width: width * 0.9,
    padding: 15,
    borderRadius: 10,
    marginTop: height * 0.01,
    marginBottom: height * 0.03,
  },
  faqAnswerText: {
    fontSize: width * 0.04,
    color: '#333',
  },
});

export default FAQScreen;
