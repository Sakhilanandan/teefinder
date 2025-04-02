import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Favorites = () => {
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([]); // Empty list for now

    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <FontAwesome name="arrow-left" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>Favorites</Text>

            {favorites.length === 0 ? (
                <View style={styles.noFavorites}>
                    <FontAwesome name="heart-o" size={50} color="gray" />
                    <Text style={styles.noFavoritesText}>No Favorites Added</Text>
                </View>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.favoriteItem}>
                            <Text>{item}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    noFavorites: {
        alignItems: 'center',
        marginTop: 50,
    },
    noFavoritesText: {
        fontSize: 18,
        color: 'gray',
        marginTop: 10,
    },
    favoriteItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        textAlign: 'center',
    },
});

export default Favorites;
