import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const SessionButtonMetaComponent = ({ onPress, courseCode, courseName, courseDate, enabled }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card} disabled={!enabled}>
            <View style={styles.content}>
                <View style={styles.info}>
                    <Text style={styles.primaryText}>{courseCode}</Text>
                    <Text style={styles.secondaryText}>{courseName}</Text>
                    <Text style={styles.tertiaryText}>{courseDate}</Text>
                </View>
                {
                    enabled &&
                    <View style={styles.arrowContainer}>
                        <Text style={styles.startText}>Start Attendance</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
                    </View>
                }
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    info: {
        flex: 1,
    },
    primaryText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    secondaryText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    tertiaryText: {
        fontSize: 14,
        color: '#888',
    },
    arrowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    startText: {
        marginLeft: 5,
        color: '#888',
    },
});
