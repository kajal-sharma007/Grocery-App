import React, { useState } from 'react';
import { Text, View, StyleSheet, useColorScheme, Image, Dimensions } from 'react-native';
import Snackbar from 'react-native-snackbar';  
import logo from '../../assets/icons/logo.png';
import CustomButton from '../../commonComponents/Button';
import bgImage from '../../assets/images/Fruit.png';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../commonComponents/CustomInput';
import ToggleButton from '../../commonComponents/ToggleButton';  // Import the ToggleButton

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
        inputText: '#FFFFFF',
        toggleText: '#23AA49',
        toogle:'#FFFFFF'
    },
};

const { height } = Dimensions.get('window');

const Signup = () => {
    const [showLogin, setShowLogin] = useState(false); 
    const [phoneNo, setPhoneNo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];

    const navigation = useNavigation();

    const handlePhoneNoChange = (input) => {
        const newInput = input.replace(/\D/g, '').slice(0, 10); 
        setPhoneNo(newInput);
    };

    const handleEmailChange = (input) => {
        setEmail(input);
    };

    const handlePasswordChange = (input) => {
        setPassword(input);
    };

    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const handleSignup = () => {
        if (!isValidEmail(email)) {
            Snackbar.show({
                text: '✖ Please enter a valid email address.',
                duration: 3000,
                backgroundColor: '#D32F2F',
                textColor: '#FFFFFF',
            });
        } else if (password.length < 6) {
            Snackbar.show({
                text: '✖ Password must be at least 6 characters.',
                duration: 3000,
                backgroundColor: '#D32F2F',
                textColor: '#FFFFFF',
            });
        } else if (!email || !password) {
            Snackbar.show({
                text: '✖ Please fill out all fields.',
                duration: 3000,
                backgroundColor: '#D32F2F',
                textColor: '#FFFFFF',
            });
        } else {
            navigation.navigate('Home');dyy6
            Snackbar.show({
                text: '✔ Signup Successful.',
                duration: 3000,
                backgroundColor: '#4CAF50',
                textColor: '#FFFFFF',
            });
            setEmail('')
            setPassword('')
        }
    };

    const handleLogin = () => {
        const phoneNumberWithoutSpaces = phoneNo.replace(/\D/g, '');
        if (phoneNumberWithoutSpaces.length !== 10) {
            Snackbar.show({
                text: '✖ Please enter a valid 10-digit mobile number.',
                duration: 3000,
                backgroundColor: '#D32F2F',
                textColor: '#FFFFFF',
            });
        } else {
            navigation.navigate('Otp');
            Snackbar.show({
                text: '✔ Login Successful.',
                duration: 3000,
                backgroundColor: '#4CAF50',
                textColor: '#FFFFFF',
            });
            setPhoneNo('')
        }
    };

    return (
        <View style={styles.container}>
            <Image source={bgImage} style={styles.bgImage} />
            <View style={[styles.card, { backgroundColor: colors.primary }]}>
                <View style={styles.container2}>
                    <ToggleButton
                        title="Signup"
                        isActive={!showLogin}
                        onPress={() => setShowLogin(false)}
                        activeColor={colors.toggleText}
                        inactiveColor={colors.toogle}
                    />
                    <ToggleButton
                        title="Login"
                        isActive={showLogin}
                        onPress={() => setShowLogin(true)}
                        activeColor={colors.toggleText}
                        inactiveColor={colors.toogle}
                    />
                </View>

                {!showLogin ? (
                    <View style={styles.container}>
                        <View style={[styles.logoContainer, { backgroundColor: colors.secondary }]}>
                            <Image source={logo} style={styles.logo} />
                        </View>
                        <View style={styles.passwordContainer}>
                        <CustomInput 
                        title="Create an Account"
                        subtitle="Fill the details to sign up"
                        placeholder="Enter Email"
                        placeholderTextColor={colors.subHeading}
                                value={email}
                                onChangeText={handleEmailChange}
                                keyboardType="email-address"
                                textAlign="center"
                        />
                        </View>
                        <View style={styles.passwordContainer}>
                        <CustomInput 
                        placeholder="Password"
                        placeholderTextColor={colors.subHeading}
                                value={password}
                                onChangeText={handlePasswordChange}
                                secureTextEntry={!showPassword}
                                textAlign="center"
                                showPasswordIcon
                                onEyePress={() => setShowPassword(!showPassword)}
                        />
                        </View>
                        <CustomButton title="Sign Up" onPress={handleSignup} style={styles.customStyle} textStyle={styles.customTextStyle} />
                    </View>
                ) : (
                    <View style={styles.container}>
                        <View style={[styles.logoContainer, { backgroundColor: colors.secondary }]}>
                            <Image source={logo} style={styles.logo} />
                        </View>
                        <View style={styles.passwordContainer}>
                        <CustomInput
                        title="Enter your mobile number"
                        subtitle="We will send you a verification code"
                        placeholder="Mobile Number"
                        placeholderTextColor={colors.subHeading}
                        value={phoneNo}
                        onChangeText={handlePhoneNoChange}
                        keyboardType="phone-pad"
                        maxLength={10}
                        textAlign="center"
                        />
                        </View>
                        <CustomButton title="Continue" onPress={handleLogin} style={styles.customStyle} textStyle={styles.customTextStyle} />
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        position: 'relative',
    },
    bgImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: height * 0.5,
        width: '110%',
        resizeMode: 'cover',
    },
    card: {
        position: 'absolute',
        bottom: 0,
        width: '106%',
        height: height * 0.6, 
        borderRadius: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        elevation: 5,
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        bottom:20
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        bottom:30,
    },
    subtitle: {
        fontSize: 13,
        bottom:30,
        textAlign: 'center',
    },
    logoContainer: {
        height: 80,
        width: 80,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        bottom:30
    },
    passwordContainer: {
        width: '90%',  
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        bottom: 10,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginRight: 5,
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
    customStyle: {
        backgroundColor: '#28a745',
        borderRadius: 20,
        marginTop: 10,
        width: '100%',
    },
    customTextStyle: {
        fontSize: 18,
    },
    toggleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
});

export default Signup;
