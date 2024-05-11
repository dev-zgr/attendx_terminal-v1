import {StyleSheet, Text, View} from "react-native";
import MenuButton from "../buttons/MenuButton";
import {StatusBar} from 'expo-status-bar';
import {useEffect} from "react";
import {useSelector} from "react-redux";
import LogoutButton from "../buttons/LogoutButton";
import {SessionsScreen} from "./SessionsScreen";


export const HomeScreen = ({navigation}) => {
    const sessionState = useSelector(state => state.accountDetailsSlice);


    const handleLogin = () => {
        navigation.navigate('LoginScreen')
    }
    return (
        <>
            <View style={styles.container}>
                <View style={styles.loginText}>
                    <Text style={styles.welcomeText}>Welcome to</Text>
                    <Text style={styles.attendXText}>AttendX</Text>
                </View>
                <View>
                    <View style={styles.menuWrapper}>
                        {
                            sessionState.isLogged ?
                                <>
                                    <LogoutButton title={"🔓Logout"}/>
                                    <MenuButton title={"📖My Courses"} onPress={()=> {
                                        navigation.navigate('SessionsScreen');

                                    }}/>
                                </>

                                :
                                <MenuButton title={"🔐Login"} onPress={handleLogin}/>
                        }
                </View>
                </View>
                <StatusBar style="auto"/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f9ff',
        "flex-direction": "column",
        alignItems: 'center',
        justifyContent: 'center',

    },
    loginText: {
        marginBottom: 100,
    }
    ,
    welcomeText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'rgba(8,51,68,0.96)',
    },
    attendXText: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#3b82f6',
        textAlign: 'center',

    }
    ,
    menuWrapper:{
        width: '100%',
        alignItems: 'center',
    },
});