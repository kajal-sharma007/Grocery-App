import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import bin from '../../assets/icons/bin.png';

const cartItems = [
  { 
    id: '1', 
    name: 'Bananas', 
    image: require('../../assets/images/banana.png'), 
    price: '$1.99',
    quantitykg: '1kg' // Quantity in kilograms or grams
  },
  { 
    id: '2', 
    name: 'Avocados', 
    image: require('../../assets/images/avocado.png'), 
    price: '$2.50',
    quantitykg: '250g' // Quantity in grams
  },
  { 
    id: '3', 
    name: 'Potatoes', 
    image: require('../../assets/images/potatoes.png'), 
    price: '$3.00',
    quantitykg: '2kg' // Quantity in kilograms
  },
  { 
    id: '4', 
    name: 'Carrots', 
    image: require('../../assets/images/carrots.png'), 
    price: '$1.50',
    quantitykg: '100g' // Quantity in grams
  },
];

const Cart = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light');
  const [cart, setCart] = useState(cartItems);

  useEffect(() => {
    const colorSchemeListener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => colorSchemeListener.remove();
  }, []);

  const handleQuantityChange = (id, type) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { 
              ...item, 
              quantitykg: type === 'increase' 
                ? increaseQuantity(item.quantitykg) 
                : decreaseQuantity(item.quantitykg)
            }
          : item
      )
    );
  };

  // Function to increase quantity in kg or g
  const increaseQuantity = (quantitykg) => {
    const [num, unit] = quantitykg.match(/(\d+)(\D+)/).slice(1, 3);
    
    if (unit === 'g') {
      const newQuantity = parseInt(num) + 50; // Increase by 50g
      return `${newQuantity}${unit}`;
    }
    
    if (unit === 'kg') {
      const newQuantity = parseInt(num) + 1; // Increase by 1kg
      return `${newQuantity}${unit}`;
    }
  };
  
  const decreaseQuantity = (quantitykg) => {
    const [num, unit] = quantitykg.match(/(\d+)(\D+)/).slice(1, 3);
    
    if (unit === 'g') {
      const newQuantity = Math.max(50, parseInt(num) - 50); // Ensure quantity doesn't go below 50g
      return `${newQuantity}${unit}`;
    }
    
    if (unit === 'kg') {
      const newQuantity = Math.max(1, parseInt(num) - 1); // Ensure quantity doesn't go below 1kg
      return `${newQuantity}${unit}`;
    }
  };
  

  const handleRemoveFromCart = (id) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => setCart(prevCart => prevCart.filter(item => item.id !== id)) }
      ]
    );
  };

  const renderCartItem = ({ item }) => {
    const quantitykg = item.quantitykg || '1kg';
    const totalPrice = (parseFloat(item.price.replace('$', '')) * parseInt(quantitykg)).toFixed(2);

    return (
      <View style={[styles.cartItem, { backgroundColor: COLORS[theme].secondary }]}>
        <Image source={item.image} style={styles.cartItemImage} />
        <View style={styles.cartItemDetails}>
          <Text style={[styles.cartItemName, { color: COLORS[theme].heading }]}>{item.name}</Text>
          <Text style={[styles.quantityText, { color: COLORS[theme].heading }]}>{quantitykg}</Text>
          <Text style={[styles.cartItemPrice, { color: COLORS[theme].subHeading }]}>${totalPrice}</Text>
        </View>
        <View style={[styles.quantityContainer, { borderColor: COLORS[theme].subHeading }]}>
          <TouchableOpacity 
            onPress={() => handleQuantityChange(item.id, 'decrease')} 
            style={[styles.quantityButton, { backgroundColor: '#23AA49' }]}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>

          <Text style={[styles.quantityText, { color: COLORS[theme].heading }]}>{quantitykg}</Text>

          <TouchableOpacity 
            onPress={() => handleQuantityChange(item.id, 'increase')} 
            style={[styles.quantityButton, { backgroundColor: '#23AA49' }]}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.removeButton, { backgroundColor: COLORS[theme].secondary }]}
          onPress={() => handleRemoveFromCart(item.id)}
        >
          <Image source={bin} style={styles.binIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const [num, unit] = item.quantitykg.match(/(\d+)(\D+)/).slice(1, 3);
      return total + (parseFloat(item.price.replace('$', '')) * parseInt(num));
    }, 0).toFixed(2);
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS[theme].primary }]}>
      <Text style={[styles.title, { color: COLORS[theme].heading }]}>My Cart</Text>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.total}>
        <TouchableOpacity 
          style={[styles.checkoutButton, { backgroundColor: COLORS[theme].toggleText }]} >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
          <Text style={[styles.totalText, { color: '#FFFFFF' }]}>${calculateTotal()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const COLORS = {
  light: {
    primary: '#FFFFFF',
    secondary: '#F3F5F7',
    heading: '#06161C',
    subHeading: '#617986',
    toggleText: '#23AA49',
  },
  dark: {
    primary: '#212427',
    secondary: '#1A3848',
    heading: '#FFFFFF',
    subHeading: '#617986',
    toggleText: '#23AA49',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    top: 10,
    marginHorizontal: 120
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  cartItemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 15,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 14,
  },
  removeButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'red'
  },
  total: {
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'flex-end',
  },
  checkoutButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-evenly',
    gap: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    padding: 1,
    marginTop: 8
  },
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  binIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 5,
  },
});
