import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const AdminHomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>

      {/* Navigation Buttons */}
      <View style={styles.menuContainer}>
      <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('AdminCategoriesScreen')}
        >
          <Icon name="stats-chart-outline" size={width * 0.15} color="#0056b3" />
          <Text style={styles.menuText}>UserHome</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('AdminScreen')}
        >
          <Icon name="list-circle-outline" size={width * 0.15} color="#0056b3" />
          <Text style={styles.menuText}>Manage Categories</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('AdminProductsScreen')}
        >
          <Icon name="shirt-outline" size={width * 0.15} color="#0056b3" />
          <Text style={styles.menuText}>Manage Products</Text>
        </TouchableOpacity>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#0056b3',
    textAlign: 'center',
    marginBottom: height * 0.03,
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  menuItem: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: height * 0.02,
    borderRadius: width * 0.03,
    elevation: 3,
  },
  menuText: {
    marginTop: height * 0.01,
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AdminHomeScreen;
