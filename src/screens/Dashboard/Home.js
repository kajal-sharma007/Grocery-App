import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import React, { useState, useRef } from 'react';
import { Avatar } from 'react-native-paper';
import AnimatedSearchBox from "@ocean28799/react-native-animated-searchbox";

const Home = () => {
  // Sample categories for the grocery app
  const categories = [
    { id: '1', name: 'Fruits', image: require('../../assets/icons/fruits.png') },
    { id: '2', name: 'Vegetables', image: require('../../assets/icons/vegetable.png') },
    { id: '3', name: 'Dairy', image: require('../../assets/icons/dairy.png') },
    { id: '4', name: 'Bakery', image: require('../../assets/icons/bakery.png') },
    { id: '5', name: 'Snacks', image: require('../../assets/icons/snack.png') },
    { id: '6', name: 'Beverages', image: require('../../assets/icons/beverages.png') },
  ];

  const bestSellingItems = [
    { id: '1', category: 'carrots', image: require('../../assets/images/carrots.png') },
    { id: '2', category: 'brocoli', image: require('../../assets/images/brocoli.png') },
    { id: '3', category: 'bellpaper', image: require('../../assets/images/bellpaper.png') },
    { id: '4', category: 'potatoes', image: require('../../assets/images/potatoes.png') },
    { id: '5', category: 'banana', image: require('../../assets/images/banana.png') },
    { id: '6', category: 'avocado', image: require('../../assets/images/avocado.png') },
    { id: '7', category: 'Ginger', image: require('../../assets/images/ginger.png') },
  ];

  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false); // State to track search box visibility
  const refSearchBox = useRef();

  // Toggle search box visibility
  const toggleSearchBox = () => {
    if (isSearchBoxOpen) {
      refSearchBox.current.close(); // Close the search box
    } else {
      refSearchBox.current.open(); // Open the search box
    }
    setIsSearchBoxOpen(!isSearchBoxOpen); // Toggle the state
  };

  // Dummy user data
  const userName = "John"; // You can replace this with dynamic data from state or props

  // Function to get the time-based greeting
  const getGreeting = () => {
    const currentHour = new Date().getHours(); // Get the current hour
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Image size={50} source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderBestSellingItem = ({ item }) => (
    <View style={styles.bestSellingItem}>
      <Image source={item.image} style={styles.bestSellingImage} />
      <Text style={styles.bestSellingName}>{item.category}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.header}>
            <Avatar.Image size={40} source={require('../../assets/icons/man.png')} />
            <View style={styles.header1}>
              <Text style={styles.headerText}>{getGreeting()}</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
          </View>

          <AnimatedSearchBox
            ref={(ref) => (refSearchBox.current = ref)}
            placeholder={"Search"}
            placeholderTextColor="#848484"
            backgroundColor="#F3F5F7"
            searchIconColor="#23AA49"
            focusAfterOpened
            searchIconSize={18}
            borderRadius={25}
            onChangeText={(text) => {
              console.log("Input: ", text);
            }}
            onBlur={() => refSearchBox.current.close()} // Close the search box when it loses focus
            onPress={toggleSearchBox}
          />
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />

          <Text style={styles.sectionTitle}>Best Selling</Text>
          <ScrollView Style={styles.container}>
          <FlatList
            data={bestSellingItems}
            renderItem={renderBestSellingItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.bestSellingList}
          />
           keyExtractor={(item) => item.id}
           ListFooterComponent={<View style={{ height: 20 }}>
            <Text>No more Items</Text>
            </View>}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 20,
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
    top:5,
    color:'#979899'
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    top:5
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    top:10,
    marginBottom: 10,
  },
  categoryItem: {
    width:90,  
    height: 80,
    top:10,  
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
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 0,
  },
  bestSellingImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  bestSellingName: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  bestSellingList: {
    flexDirection: 'column',
    flexShrink:10,
    justifyContent: 'space-between',
  },
});
