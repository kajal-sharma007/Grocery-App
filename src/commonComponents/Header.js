import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, useColorScheme } from 'react-native';
import Backlight from '../assets/icons/Back-White.png'; // Light mode icon
import Backdark from '../assets/icons/Back-Black.png'; // Dark mode icon
import searchlight from '../assets/icons/search-white.png';
import searchdark from '../assets/icons/search-black.png';

const COLORS = {
  light: {
    primary: '#FFFFFF',
    secondary: '#F3F5F7',
    text: '#06161C',
  },
  dark: {
    primary: '#212427',
    secondary: '#1A3848',
    text: '#FFFFFF',
  },
};

const Header = ({ title, leftIcon, rightIcon, onLeftPress, onRightPress }) => {
  const colorScheme = useColorScheme();
  const colors = COLORS[colorScheme ?? 'dark'];

  // Determine which icon to use for the left and right buttons based on the color scheme
  const leftIconSource = colorScheme === 'light' ? Backdark : Backlight;
  const rightIconSource = colorScheme === 'light' ? searchdark : searchlight;

  return (
    <View style={[styles.headerContainer, { backgroundColor: colors.primary }]}>
      {leftIcon && (
        <View style={[styles.logoContainer, { backgroundColor: colors.secondary }]}>
          <TouchableOpacity style={styles.button} onPress={onLeftPress}>
            <Image source={leftIconSource} style={styles.icon} />
          </TouchableOpacity>
        </View>
      )}
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {rightIcon && (
        <View style={[styles.logoContainer, { backgroundColor: colors.secondary }]}>
          <TouchableOpacity style={styles.button} onPress={onRightPress}>
            <Image source={rightIconSource} style={styles.icon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    zIndex: 1000, // Ensure the header is on top of other elements
  },
  button: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  logoContainer: {
    height: 40,
    width: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default Header;
