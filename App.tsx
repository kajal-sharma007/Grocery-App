import React from 'react';
import { Text, useColorScheme } from 'react-native';

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/screens/onbording/Splash';
import Intro from './src/screens/onbording/Intro';
import Signup from './src/screens/onbording/Signup';
import Otp from './src/screens/onbording/Otp';
import Home from './src/screens/Dashboard/Home';

function App() {
  const Stack = createStackNavigator(); 
  const colorScheme = useColorScheme(); 

  return (
    <NavigationContainer 
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme} 
    >
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
