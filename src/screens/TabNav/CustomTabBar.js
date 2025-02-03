import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, Animated, Image } from 'react-native';

import home from '../../assets/icons/home.png';
import homegray from '../../assets/icons/homegray.png'; 
import category from '../../assets/icons/category.png'; 
import categorygray from '../../assets/icons/categorygray.png'; 
import card from '../../assets/icons/card.png'; 
import cardgray from '../../assets/icons/cardgray.png'; 
import profile from '../../assets/icons/profile.png'; 
import profilegray from '../../assets/icons/profilegray.png'; 

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const linePosition = useRef(new Animated.Value(0)).current;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const totalTabs = state.routes.length;
  const tabWidth = 50;

  const translateX = linePosition.interpolate({
    inputRange: [0, totalTabs - 1],
    outputRange: [0, (totalTabs - 1) * tabWidth],
  });

  const getIcon = (routeName, isFocused) => {
    switch (routeName) {
      case 'Home':
        return isFocused ? home : homegray;
      case 'Category':
        return isFocused ? category : categorygray;
      case 'Card':
        return isFocused ? card : cardgray;
      case 'Profile':
        return isFocused ? profile : profilegray;
      default:
        return homegray;
    }
  };

  useEffect(() => {
    Animated.timing(linePosition, {
      toValue: state.index,
      duration: 300, 
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name); 
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 20,
            }}
            key={route.name}
          >
            <Image
              source={getIcon(route.name, isFocused)} 
              style={{ width: 24, height: 24, marginBottom: 1, top: 10  }} 
            />
            <Text style={{ color: isFocused ? '#23AA49' : '#ccc', fontSize: 10, top:10 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
      <Animated.View
        style={{
          position: 'absolute',
          height: 10,
          width: tabWidth,
          backgroundColor: '#23AA49',
          bottom: 0,
          borderRadius:10,
          transform: [{ translateX }],
        }}
      />
    </View>
  );
};

export default CustomTabBar;
