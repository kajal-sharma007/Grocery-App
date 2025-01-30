// CustomInput.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, useColorScheme } from 'react-native';
import vision from '../assets/icons/vision.png';
import hide from '../assets/icons/hide.png';

const COLORS = {
  light: {
      primary: '#FFFFFF',
      secondary: '#F3F5F7',
      heading: '#06161C',
      subHeading: '#617986',
      inputBackground: '#E0E0E0',
      inputText: '#06161C', // Dark text on light background
      toggleText: '#23AA49',
      toogle: '#0D1F29',
  },
  dark: {
      primary: '#212427',
      secondary: '#1A3848',
      heading: '#FFFFFF',
      subHeading: '#617986',
      inputBackground: '#2E3335',
      inputText: '#FFFFFF', // Light text on dark background
      toggleText: '#23AA49',
      toogle:'#FFFFFF'
  },
}; 

const CustomInput = ({ 
    title, 
    subtitle, 
    placeholder, 
    value, 
    onChangeText, 
    secureTextEntry, 
    onEyePress, 
    showPasswordIcon, 
    placeholderTextColor, 
    keyboardType, 
    maxLength 
}) => {
   const colorScheme = useColorScheme();
      const colors = COLORS[colorScheme ?? 'dark'];
    return (
        <View style={styles.inputContainer}>
            {title && <Text style={[styles.inputTitle, { color: colors.heading }]}>{title}</Text>}
            {subtitle && <Text style={[styles.inputSubtitle, { color: colors.subHeading }]}>{subtitle}</Text>}
            <TextInput
                style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputText }]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={placeholderTextColor}
                keyboardType={keyboardType}
                maxLength={maxLength}
            />
            {showPasswordIcon && (
                <TouchableOpacity onPress={onEyePress} style={styles.eyeIcon}>
                    <Image source={secureTextEntry ? hide : vision} style={styles.icon} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        marginVertical: 5,
    },
    inputTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputSubtitle: {
      fontSize: 13,
      textAlign: 'center',
    },
    input: {
      width: '100%',
        height: 45,
        padding: 10,
        marginTop: 10,
        fontSize: 15,
        borderRadius: 5,
        paddingHorizontal: '30%',
    },
    eyeIcon: {
      position: 'absolute',
      right: 10,
      bottom: 10,
    },
    icon: {
        width: 24,
        height: 24,
    },
});

export default CustomInput;
