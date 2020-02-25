import React from 'react';
import {SafeAreaView, Button, Text} from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'https://topcoder-dev.auth0.com/',
  clientId: '1NpddnMe5M3r04W71F95wDZZTNubWl5u',
});

export const LoginScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text>Login To Get the Access Token</Text>

      <Button
        title={'Login'}
        onPress={() => {
          console.log('Login');
          auth0.webAuth
            .authorize({scope: 'openid profile email'})
            .then(credentials => {
              console.log('Access token', credentials.accessToken);
              navigation.navigate('Dashboard');
            })
            .catch(error => console.log(error));
        }}
      />
    </SafeAreaView>
  );
};
