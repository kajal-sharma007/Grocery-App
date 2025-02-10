import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Appearance } from 'react-native';

const cartItems = [
  { id: '1', name: 'Bananas', image: require('../../assets/images/banana.png'), price: '$1.99' },
  { id: '2', name: 'Avocados', image: require('../../assets/images/avocado.png'), price: '$2.50' },
  { id: '3', name: 'Potatoes', image: require('../../assets/images/potatoes.png'), price: '$3.00' },
  { id: '4', name: 'Carrots', image: require('../../assets/images/carrots.png'), price: '$1.50' },
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
          ? { ...item, quantity: type === 'increase' ? (item.quantity || 1) + 1 : Math.max(1, (item.quantity || 1) - 1) }
          : item
      )
    );
  };

  const renderCartItem = ({ item }) => {
    const quantity = item.quantity || 1; 
    const totalPrice = (parseFloat(item.price.replace('$', '')) * quantity).toFixed(2);

    return (
      <View style={[styles.cartItem, { backgroundColor: COLORS[theme].secondary }]}>
        <Image source={item.image} style={styles.cartItemImage} />
        <View style={styles.cartItemDetails}>
          <Text style={[styles.cartItemName, { color: COLORS[theme].heading }]}>{item.name}</Text>
          <Text style={[styles.cartItemPrice, { color: COLORS[theme].subHeading }]}>${totalPrice}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, 'decrease')} style={styles.quantityButton}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>

          <Text style={[styles.quantityText,{ color: COLORS[theme].heading }]}>{quantity}</Text>

          <TouchableOpacity onPress={() => handleQuantityChange(item.id, 'increase')} style={styles.quantityButton}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.removeButton, { backgroundColor: COLORS[theme].secondary }]}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
  };


  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (parseFloat(item.price.replace('$', '')) * (item.quantity || 1));
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
      <View style={[styles.total, { backgroundColor: COLORS[theme].secondary }]}>
        <Text style={[styles.totalText, { color: COLORS[theme].heading }]}>Total: ${calculateTotal()}</Text>
        <TouchableOpacity style={[styles.checkoutButton, { backgroundColor: COLORS[theme].toggleText }]}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
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
    padding:5
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    top:10,
    marginHorizontal:120
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
    color:'red'
  },
  total: {
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  quantityContainer: {
    flexDirection: 'row', 
    alignItems: 'center',  
  },
  quantityButton: {
    paddingHorizontal: 3,
    paddingVertical: 3,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});
