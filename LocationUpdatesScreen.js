import React , { useState, useEffect }from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';


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
        'Moitoring Location: Not activated'
    );

    useEffect( () => {
        const start = async () => {
            const isGranted = await requestLocationPermission();
            if (isGranted) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        console.log(position);
                        let latitude = position.coords.latitude;
                        console.log(latitude)
                        let longitude = position.coords.longitude;
                        console.log(longitude)
                        setLocation("Moitoring Location: Active")
                        // setLocation("(" +latitude+","+longitude+")")
                    },
                    (error) => {
                        // See error code charts below.
                        setLocation("Moitoring Location: Error, "+error.message)
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            }
        }
        start()


    }, []);


    return <>
        <Text>{location}</Text>
    </>
}

async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Ausweis',
                message:
                    'Grant permission to get the location',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
            return true
        } else {
            console.log('Camera permission denied');
            return false
        }
    } catch (err) {
        console.warn(err);
    }
}
