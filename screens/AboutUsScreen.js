import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const AboutUsScreen = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>{"<"} Back</Text>
      </TouchableOpacity>

      {/* About Us Content */}
      <Text style={styles.title}>About TeeFinder</Text>
      <Text style={styles.content}>
        TeeFinder is your ultimate destination for discovering the best deals on T-shirts. 
        Our platform is dedicated to simplifying your shopping experience by providing price 
        comparisons from multiple stores, ensuring that you always get the best value for your money.
      </Text>
      <Text style={styles.content}>
        Whether you're looking for casual wear or trendy designs, TeeFinder brings together 
        a wide variety of options tailored to your preferences. Explore our platform and 
        find the perfect T-shirt today!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: '#f4f4f4',
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#0056b3',
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  content: {
    fontSize: width * 0.045,
    lineHeight: height * 0.03,
    color: '#555',
    textAlign: 'justify',
    marginBottom: height * 0.02,
  },
});

export default AboutUsScreen;
