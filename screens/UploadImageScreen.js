import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const UploadImageScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image Picker Error:', response.errorMessage);
      } else {
        const image = response.assets[0];
        setSelectedImage(image);
      }
    });
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first.');
      return;
    }

    setIsLoading(true); // Show loading indicator

    const formData = new FormData();
    formData.append('image', {
      uri: selectedImage.uri,
      name: selectedImage.fileName || 'upload.jpg',
      type: selectedImage.type || 'image/jpeg',
    });

    try {
      const response = await axios.post('http://192.168.227.172/teefinder/adminlogin.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setIsLoading(false); // Hide loading indicator

      if (response.data.status === 'success') {
        Alert.alert('Success', 'Image uploaded successfully!');
        console.log('File URL:', response.data.file_url);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      setIsLoading(false); // Hide loading indicator
      console.error('Upload Error:', error);
      Alert.alert('Error', 'Failed to upload image.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>

      {selectedImage && (
        <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} />
      )}

      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>

      {isLoading && <ActivityIndicator size="large" color="#007bff" style={styles.loading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: { color: '#fff', fontSize: 16 },
  previewImage: { width: 200, height: 200, marginVertical: 20, borderRadius: 10 },
  loading: { marginTop: 20 },
});

export default UploadImageScreen;
