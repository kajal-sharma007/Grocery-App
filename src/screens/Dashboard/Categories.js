import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Appearance } from 'react-native';

// Sample categories data
const categories = [
  { id: '1', name: 'Fruits', image: require('../../assets/icons/fruits.png') },
  { id: '2', name: 'Vegetables', image: require('../../assets/icons/vegetable.png') },
  { id: '3', name: 'Dairy', image: require('../../assets/icons/dairy.png') },
  { id: '4', name: 'Bakery', image: require('../../assets/icons/bakery.png') },
  { id: '5', name: 'Snacks', image: require('../../assets/icons/snack.png') },
  { id: '6', name: 'Beverages', image: require('../../assets/icons/beverages.png') },
  { id: '7', name: 'Meat', image: require('../../assets/icons/meat.png') },
  { id: '8', name: 'Frozen', image: require('../../assets/icons/frozen.png') },
];

const Categories = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light'); // Detect the current theme (light or dark)

  useEffect(() => {
    const colorSchemeListener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme); // Update theme on change
    });
    return () => colorSchemeListener.remove(); // Cleanup listener on component unmount
  }, []);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={[styles.categoryItem, { backgroundColor: COLORS[theme].secondary }]}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={[styles.categoryName, { color: COLORS[theme].heading }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: COLORS[theme].primary }]}>
      <Text style={[styles.sectionTitle, { color: COLORS[theme].heading }]}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Categories;

const COLORS = {
  light: {
    primary: '#FFFFFF',
    secondary: '#F3F5F7',
    heading: '#06161C',
    subHeading: '#617986',
    inputBackground: '#E0E0E0',
    inputText: '#06161C',
    toggleText: '#23AA49',
    toogle: '#0D1F29',
  },
  dark: {
    primary: '#212427',
    secondary: '#1A3848',
    heading: '#FFFFFF',
    subHeading: '#617986',
    inputBackground: '#2E3335',
    inputText: '#FFFFFF',
    toggleText: '#23AA49',
    toogle: '#FFFFFF',
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 8,
    elevation: 0,
    padding: 15,
  },
  categoryImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  categoryName: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
