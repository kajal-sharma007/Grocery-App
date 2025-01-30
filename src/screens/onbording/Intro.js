import { StyleSheet, Text, View, Image, useColorScheme } from 'react-native';
import React from 'react';
import Darkimage from '../../assets/images/Onbording-dark.png';
import logo from '../../assets/icons/logo.png';
import CustomButton from '../../commonComponents/Button';

const COLORS = {
  light: {
    primary: '#FFFFFF',
    secondary: '#F3F5F7',
    heading: '#06161C',
    subHeading: '#617986',
  },
  dark: {
    primary: '#212427',
    secondary: '#1A3848',
    heading: '#FFFFFF',
    subHeading: '#617986',
  },
};

const Intro = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const colors = COLORS[colorScheme ?? 'dark'];

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={[styles.logoContainer, { backgroundColor: colors.secondary }]}>
        <Image source={logo} style={styles.logo} />
      </View>
      <Text style={[styles.title, { color: colors.heading }]}>
        Get your groceries delivered to your home
      </Text>
      <Text style={[styles.subtitle, { color: colors.subHeading }]}>
        The best delivery app in town for delivering your daily fresh groceries
      </Text>
      <CustomButton
      title="Shop now" 
      onPress={()=>navigation.navigate('Signup')} 
      style={styles.customStyle}
      textStyle={styles.customTextStyle}
      />
      <View style={styles.imageContainer}>
        <Image
          source={Darkimage}
          style={styles.onboardingImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logoContainer: {
    height: 80,
    width: 80,
    bottom: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginTop:100
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    marginTop: 5,
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  onboardingImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  customStyle: {
    backgroundColor: '#28a745',
    borderRadius:30,
    marginTop:20
  },
  customTextStyle: {
    fontSize: 18,
  },
});

export default Intro;
