import 'react-native-gesture-handler';

import {useFonts} from 'expo-font';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import SettingsScreen from "./screens/SettingsScreen";
import HomeScreen from "./screens/HomeScreen";
import React from "react";


const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" >
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Settings" component={SettingsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default function AppContainer() {
    const [loaded] = useFonts({Nirmala: require('../assets/fonts/Nirmala.ttf'),});
    if (!loaded) return null;
    return <App/>
}


