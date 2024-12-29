import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const TermsConditionsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Terms and Conditions</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.termsText}>
          {/* You can replace this with your actual terms and conditions text */}
          By using this app, you agree to the following terms and conditions:
          {'\n\n'}
          1. You must be at least 18 years old to use this app.
          {'\n'}
          2. All information provided is accurate to the best of our knowledge.
          {'\n'}
          3. We reserve the right to modify these terms at any time without notice.
          {'\n'}
          4. Users are responsible for maintaining the confidentiality of their account information.
          {'\n\n'}
          {/* Add more terms and conditions here */}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3E7F1' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    backgroundColor: '#FFCC33',
  },
  headerText: { fontSize: width * 0.06, fontWeight: 'bold' },
  closeButton: { fontSize: width * 0.05, fontWeight: 'bold' },
  content: { padding: width * 0.05 },
  termsText: { fontSize: width * 0.04, color: '#000', lineHeight: height * 0.03 },
});

export default TermsConditionsScreen;
