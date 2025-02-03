import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  useColorScheme,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import otpimage from '../../assets/images/Fruit.png';
import CustomButton from '../../commonComponents/Button';
import ConfettiCannon from 'react-native-confetti-cannon';
import {useNavigation} from '@react-navigation/native';

const {height} = Dimensions.get('window');

const COLORS = {
  light: {
    primary: '#FFFFFF',
    secondary: '#F3F5F7',
    heading: '#06161C',
    subHeading: '#617986',
    inputBackground: '#E0E0E0',
    inputText: '#06161C',
    toggleText: '#23AA49',
    toggle: '#0D1F29',
  },
  dark: {
    primary: '#212427',
    secondary: '#1A3848',
    heading: '#FFFFFF',
    subHeading: '#617986',
    inputBackground: '#979899',
    inputText: '#FFFFFF',
    toggleText: '#23AA49',
    toggle: '#FFFFFF',
  },
};

const Otp = () => {
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false); // Track OTP verification state
  const colorScheme = useColorScheme();
  const colors = COLORS[colorScheme || 'dark'];
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const confettiRef = useRef(null); // Initialize ref for confetti
  const navigation = useNavigation();

  const handleOtpChange = (value, index) => {
    if (!/[^0-9]/.test(value)) {
      const updatedOtp = otp.split('');
      updatedOtp[index] = value;
      const newOtp = updatedOtp.join('');
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 4 || isNaN(otp)) {
      Snackbar.show({
        text: '✖ OTP must be 4 digits.',
        duration: 3000,
        backgroundColor: '#D32F2F',
        textColor: '#FFFFFF',
      });
      return;
    }

    setOtpVerified(true); // Mark OTP as verified

    // Trigger confetti animation
    if (confettiRef.current) {
      confettiRef.current.start();
    }

    Snackbar.show({
      text: '✔ OTP Verified Successfully!',
      duration: 3000,
      backgroundColor: '#4CAF50',
      textColor: '#FFFFFF',
    });

    // Navigate after confetti animation
    setTimeout(() => {
      navigation.navigate('TabBar');
      setOtpVerified(false); // Reset confetti state after navigation
    }, 3000); // Navigate after 3 seconds
  };

  const handleBackspace = (value, index) => {
    if (!value && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // Reset confetti on unmount (or when navigating away)
  useEffect(() => {
    return () => {
      setOtpVerified(false); // Reset confetti when screen is unmounted
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={otpimage} style={styles.bgImage} blurRadius={5} />
      <View style={[styles.card, {backgroundColor: colors.primary}]}>
        <Text style={[styles.title, {color: colors.heading}]}>Enter OTP</Text>
        <Text style={[styles.subtitle, {color: colors.subHeading}]}>
          We sent an OTP to your mobile number.
        </Text>
        <View style={styles.otpContainer}>
          {[...Array(4)].map((_, index) => (
            <TextInput
              key={index}
              style={[
                styles.otpInput,
                {
                  backgroundColor: colors.inputBackground,
                  color: colors.inputText,
                },
              ]}
              value={otp[index] || ''}
              onChangeText={value => handleOtpChange(value, index)}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspace(otp[index], index);
                }
              }}
              maxLength={1}
              keyboardType="numeric"
              textAlign="center"
              ref={inputRefs[index]}
              editable={otp[index] ? false : true}
            />
          ))}
        </View>
        <CustomButton
          title="Verify OTP"
          onPress={handleVerifyOtp}
          style={styles.customStyle}
          textStyle={styles.customTextStyle}
        />
      </View>

      {/* Confetti only appears after OTP verification */}
      {otpVerified && (
        <ConfettiCannon
          count={100}
          origin={{x: 0, y: 0}}
          fallSpeed={2500}
          ref={confettiRef}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 1.0,
    width: '120%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    top: 10,
  },
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginTop: -30,
    alignItems: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 50,
    top: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    textAlign: 'center',
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
});

export default Otp;
