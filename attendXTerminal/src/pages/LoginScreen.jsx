import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {accountActions} from "../store/slices/accountDetailsSlice";
import {useDispatch} from "react-redux";

export const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [response, setResponse] = useState({code: 0, message: ''});
    const dispatch = useDispatch();


    const handleEmailChange = (text) => {
        setEmail(text);
    }

    const handlePasswordChange = (text) => {
        setPassword(text);
    }

    const handleResponseChange = (text) => {
        setResponse({
            code: text.code,
            message: text.message,
        });
    }
    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password ,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                const account = data.user;

                if(account.role === 'LECTURER'){
                    await AsyncStorage.setItem('token', token);
                    await AsyncStorage.setItem('account', JSON.stringify(account));
                    dispatch(accountActions.loginUser(account));
                    handleEmailChange('')
                    handlePasswordChange('')
                    handleResponseChange({
                        code: response.status,
                        message: `You\'ve logged in successfully! We\'re redirecting you to the home page. Welcome!`,
                    });
                    setTimeout(() => {
                        navigation.navigate('Home');
                    }, 2000);
                }else{
                    handleResponseChange({
                        code: 400,
                        message: `Only Lecturers can use AttendX Terminal.`,
                    });
                }
            } else if(response.status === 400) {
                handleResponseChange({
                    code: 400,
                    message: `Invalid Credentials. Please try again.`,
                });
            }else {
                handleResponseChange({
                    code: 500,
                    message: `Server error. Please try again later.`,
                });
            }
        } catch (error) {
            handleResponseChange({
                code: 500,
                message: `Server error. Please try again later.`,
            });
        }
    }

    return (
        <View style={styles.loginScreenContainer}>
            <View style={styles.formContainer}>
                <Text style={styles.loginHeader}>🔓Login</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={handleEmailChange}
                        value={email}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        secureTextEntry={true}
                        onChangeText={handlePasswordChange}
                        value={password}
                    />
                </View>
                <View>
                    {
                        response.code !== 0 &&
                        <Text style={{color: response.code === 200 ? 'green' : 'red'}}>{response.message}</Text>
                    }
                </View>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>🔐Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    loginScreenContainer: {
        flex: 1,
        backgroundColor: '#f0f9ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        width: '80%',
    },
    loginHeader: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'rgba(8,51,68,0.96)',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#0f172a',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    loginButton: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 20,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
});
