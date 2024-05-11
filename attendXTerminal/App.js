
import React from 'react';
import {HomeScreen} from "./src/pages/HomeScreen";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {LoginScreen} from "./src/pages/LoginScreen";
import {Provider} from "react-redux";
import store from "./src/store/store/store";
import {SessionsScreen} from "./src/pages/SessionsScreen";
import {AttendanceScreen} from "./src/pages/AttendanceScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    // Text is used to display text
    // View like a div
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={"Home"} component={HomeScreen} navigation ={Stack}/>
                    <Stack.Screen name={"LoginScreen"} component={LoginScreen} navigation ={Stack}/>
                    <Stack.Screen name={"SessionsScreen"} component={SessionsScreen} navigation ={Stack}/>
                    <Stack.Screen name={"AttendanceScreen"} component={AttendanceScreen} navigation ={Stack}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>

    );
}


