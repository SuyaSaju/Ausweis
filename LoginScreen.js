import React , { useState }from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Button,
    Text,
    StatusBar,
} from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({ domain: 'https://topcoder-dev.auth0.com/', clientId: '1NpddnMe5M3r04W71F95wDZZTNubWl5u' });

export const LoginScreen = () => {
    const [accessToken, setAccessToken] = useState(
        'Login To Get the Access Token'
    );


    return <SafeAreaView>
        <Text>{accessToken}</Text>

        <Button title={"Login"} onPress={() => {
            console.log("Login")
            auth0
                .webAuth
                .authorize({scope: 'openid profile email'})
                .then(credentials =>
                    // Successfully authenticated
                    // Store the accessToken
                    setAccessToken(credentials.accessToken)
                )
                .catch(error => console.log(error));
        }}/>

    </SafeAreaView>;
};
