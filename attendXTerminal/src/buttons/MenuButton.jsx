import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MenuButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#0f172a', // Adjust color according to your preference
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginVertical: 5, // Add margin if needed
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5, // Android shadow
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF', // Adjust color according to your preference
    },
});

export default MenuButton;
