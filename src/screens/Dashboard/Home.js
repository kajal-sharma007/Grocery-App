import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Avatar } from 'react-native-paper';
import AnimatedSearchBox from "@ocean28799/react-native-animated-searchbox";
import { Appearance } from 'react-native'; // Import Appearance API for system theme

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

const Home = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light'); // Default to light mode
  const categories = [
    { id: '1', name: 'Fruits', image: require('../../assets/icons/fruits.png') },
    { id: '2', name: 'Vegetables', image: require('../../assets/icons/vegetable.png') },
    { id: '3', name: 'Dairy', image: require('../../assets/icons/dairy.png') },
    { id: '4', name: 'Bakery', image: require('../../assets/icons/bakery.png') },
    { id: '5', name: 'Snacks', image: require('../../assets/icons/snack.png') },
    { id: '6', name: 'Beverages', image: require('../../assets/icons/beverages.png') },
  ];

  const bestSellingItems = [
    { id: '1', category: 'carrots', image: require('../../assets/images/carrots.png'), price: '$1.99' },
    { id: '2', category: 'broccoli', image: require('../../assets/images/brocoli.png'), price: '$2.49' },
    { id: '3', category: 'bellpepper', image: require('../../assets/images/bellpaper.png'), price: '$1.79' },
    { id: '4', category: 'potatoes', image: require('../../assets/images/potatoes.png'), price: '$3.99' },
    { id: '5', category: 'banana', image: require('../../assets/images/banana.png'), price: '$0.99' },
    { id: '6', category: 'avocado', image: require('../../assets/images/avocado.png'), price: '$2.99' },
    { id: '7', category: 'Ginger', image: require('../../assets/images/ginger.png'), price: '$1.49' },
  ];

  const [cartQuantity, setCartQuantity] = useState({});
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const refSearchBox = useRef();

  const toggleSearchBox = () => {
    if (isSearchBoxOpen) {
      refSearchBox.current.close();
    } else {
      refSearchBox.current.open();
    }
    setIsSearchBoxOpen(!isSearchBoxOpen);
  };

  const userName = "John"; 

  const getGreeting = () => {
    const currentHour = new Date().getHours(); 
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={[styles.categoryItem, { backgroundColor: COLORS[theme].secondary }]}>
      <Image size={50} source={item.image} style={styles.categoryImage} />
      <Text style={[styles.categoryName, { color: COLORS[theme].subHeading }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleAddToCart = (id) => {
    setCartQuantity((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (id) => {
    setCartQuantity((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) - 1),
    }));
  };

  const renderBestSellingItem = ({ item }) => {
    const quantity = cartQuantity[item.id] || 0;
    return (
      <View style={[styles.bestSellingItem, { backgroundColor: COLORS[theme].secondary }]}>
        <Image source={item.image} style={styles.bestSellingImage} />
        <Text style={[styles.bestSellingName, { color: COLORS[theme].subHeading }]}>{item.category}</Text>
        <Text style={[styles.bestSellingPrice, { color: COLORS[theme].subHeading }]}>{item.price}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)} style={styles.quantityButton}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>

          <Text style={[styles.quantityText,{ color: COLORS[theme].heading }]}>{quantity}</Text>

          <TouchableOpacity onPress={() => handleAddToCart(item.id)} style={styles.quantityButton}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.addToCartButton, { backgroundColor: COLORS[theme].toggleText }]}>
             <Text style={styles.addToCartText}>+ ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const colorSchemeListener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => colorSchemeListener.remove();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: COLORS[theme].primary }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Avatar.Image size={40} source={require('../../assets/icons/man.png')} />
          <View style={styles.header1}>
            <Text style={[styles.headerText, { color: COLORS[theme].subHeading }]}>{getGreeting()}</Text>
            <Text style={[styles.userName, { color: COLORS[theme].heading }]}>{userName}</Text>
          </View>
        </View>
        <AnimatedSearchBox
          ref={(ref) => (refSearchBox.current = ref)}
          placeholder={"Search"}
          placeholderTextColor={COLORS[theme].subHeading}
          backgroundColor={COLORS[theme].secondary}
          searchIconColor={COLORS[theme].toggleText}
          focusAfterOpened
          searchIconSize={18}
          borderRadius={25}
          onChangeText={(text) => {
            console.log("Input: ", text);
          }}
          onBlur={() => refSearchBox.current.close()}
          onPress={toggleSearchBox}
          style={[styles.searchBox, isSearchBoxOpen ? styles.searchBoxOpen : styles.searchBoxClosed]}
        />
        <View>
          <Text style={[styles.sectionTitle, { color: COLORS[theme].heading }]}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Text style={[styles.sectionTitle, { color: COLORS[theme].heading }]}>Best Selling</Text>
        <ScrollView style={[styles.container, { backgroundColor: COLORS[theme].primary }]}>
          <FlatList
            data={bestSellingItems}
            renderItem={renderBestSellingItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.bestSellingList}
          />
          <View style={{ height: 20 }}>
            <Text>No more Items</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header1: {
    flexDirection: 'column', 
    alignItems: 'baseline',
    marginBottom: 10,
    marginLeft: 10,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 15,
    top: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    top: 5
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    top: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  categoryItem: {
    width: 90,  
    height: 90,
    top: 10,  
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,  
    marginBottom: 10,  
    backgroundColor: '#fff',
    borderRadius: 8,  
    elevation: 0,  
    padding: 10,  
  },
  categoryImage: {
    width: 30, 
    height: 30, 
    resizeMode: 'contain',  
  },
  categoryName: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  bestSellingItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    elevation: 0,
  },
  bestSellingImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  bestSellingName: {
    marginTop: 1,
    fontSize: 12,
    fontWeight: 'bold',
  },
  bestSellingList: {
    flexDirection: 'column',
    flexShrink: 10,
    justifyContent: 'space-between',
  },
  searchBox: {
    position: 'absolute',
    top: 10,
    right: 20,
    left: 20,
    zIndex: 1,
    width: '90%',
  },
  searchBoxOpen: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  searchBoxClosed: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 1,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',    
    justifyContent: 'space-evenly',
    gap:7,
    bottom:5,
  },
  quantityButton: {
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  quantityText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginHorizontal: 3,
  },
  addToCartButton: {
    backgroundColor: '#23AA49',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 15, 
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
