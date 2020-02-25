import React , { useState }from 'react';
import Geolocation from 'react-native-geolocation-service';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Button,
    Text,
    StatusBar,
} from 'react-native';

export const LocationUpdatesScreen = () => {
    const [location, setLocation] = useState(
        'Getting location!'
    );
    if (true) {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                let latitude = position.coords.latitude;
                console.log(latitude)
                let longitude = position.coords.longitude;
                console.log(longitude)
                setLocation("(" +latitude+","+longitude+")")
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }
    return <Text>{location}</Text>
}
