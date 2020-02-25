import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {LoginScreen} from './LoginScreen';
import {LocationUpdatesScreen} from './LocationUpdatesScreen';


export default function Container() {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Location" component={LocationUpdatesScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
