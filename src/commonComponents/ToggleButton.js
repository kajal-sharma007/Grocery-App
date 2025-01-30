// commonComponents/ToggleButton.js
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const ToggleButton = ({ title, isActive, onPress, activeColor, inactiveColor }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text
                style={[
                    styles.text,
                    {
                        color: isActive ? activeColor : inactiveColor,
                    },
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        margin: 24,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ToggleButton;
