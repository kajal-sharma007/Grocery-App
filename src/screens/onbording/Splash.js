import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, StyleSheet, useColorScheme, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Add this import
import logo from '../../assets/icons/logo.png';

const COLORS = {
  light: {
    primary: '#23AA49',
    secondary: '#F3F5F7',
  },
  dark: {
    primary: '#212427',
    secondary: '#1A3848',
  }
};

function Splash() {
    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];
    const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Intro'); 
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigation]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.primary }]} showsVerticalScrollIndicator={false}>
                <View style={[styles.logoContainer, { backgroundColor: colors.secondary }]}>
                    <Image source={logo} style={styles.logo} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        height: 100,
        width: 100,
        bottom: 30,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
});

export default Splash;
