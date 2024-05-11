import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";
import {accountActions} from "../store/slices/accountDetailsSlice";

const LogoutButton = ({title}) => {
    const dispatch = useDispatch();


    const logOutHandler = async () => {
        const token = await AsyncStorage.getItem("token") || "";

            const preparedUrl = `http://localhost:8080/api/v1/login?token=${token}`
            const response  = await fetch(preparedUrl,
                {
                    method: "DELETE",
                });
            if(response.status === 202){
                dispatch(accountActions.logout())
                await AsyncStorage.removeItem("token")
            }else{
                dispatch(accountActions.logout())
            }
    }


    return (
        <TouchableOpacity style={styles.button} onPress={logOutHandler}>
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

export default LogoutButton;
