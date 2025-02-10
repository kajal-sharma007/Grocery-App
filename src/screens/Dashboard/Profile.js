import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Appearance } from 'react-native';

// Sample data
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  profilePicture: require('../../assets/icons/man.png'), // Sample profile picture
};

const Profile = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light'); // Detect the current theme (light or dark)

  useEffect(() => {
    const colorSchemeListener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme); // Update theme on change
    });
    return () => colorSchemeListener.remove(); // Cleanup listener on component unmount
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: COLORS[theme].primary }]}>
      <View style={[styles.header, { borderBottomColor: COLORS[theme].secondary }]}>
        <Image source={user.profilePicture} style={styles.profilePicture} />
        <Text style={[styles.name, { color: COLORS[theme].heading }]}>{user.name}</Text>
        <Text style={[styles.email, { color: COLORS[theme].subHeading }]}>{user.email}</Text>
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: COLORS[theme].secondary }]}>
        <Text style={[styles.buttonText, { color: COLORS[theme].heading }]}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: COLORS[theme].secondary }]}>
        <Text style={[styles.buttonText, { color: COLORS[theme].heading }]}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 20,
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
  },
  button: {
    marginVertical: 10,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
