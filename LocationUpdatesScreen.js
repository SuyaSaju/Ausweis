import React , { useState, useEffect }from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import { getUniqueId, getManufacturer } from 'react-native-device-info';


import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Button,
    Text,
    StatusBar,
} from 'react-native';
import {postProofEvent} from './postProofEvent';
import asyncGeneratorDelegate from '@babel/runtime/helpers/esm/asyncGeneratorDelegate';

export const LocationUpdatesScreen = () => {
    const [location, setLocation] = useState(
        'Monitoring Location: Getting location!'
    );
    const [latitude, setLatitude] = useState("")
    const [longitude, setlongitude] = useState("")
    const [permissionGranted, setPermissionGranted] = useState(false)

    useEffect(() => {
        const sendProofEvents = async () => {
            console.log("Sending Lat: "+latitude)
            const status = await postProofEvent("s3423kjnkfnas0au",getUniqueId(),latitude, longitude)
            console.log(status)
        };
        sendProofEvents(latitude, longitude);
    }, [latitude, longitude]);

    useEffect(() => {
        if (!permissionGranted) { return; }
        const start = async () => {
            Geolocation.getCurrentPosition(
                async (position) => {
                    setLatitude(position.coords.latitude);
                    setlongitude(position.coords.longitude);
                    setLocation("Monitoring Location: Active")
                    console.log('Value Lat', position.coords.latitude)
                },
                (error) => {
                    // See error code charts below.
                    setLocation("Monitoring Location: Error, "+error.message)
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
        let locationUpdateInterval = 5000; //ReadMe
        setInterval(start, locationUpdateInterval);
    }, [permissionGranted])

    useEffect(() => {
        console.log("Componenet unmount");

        return () => { console.log("componentWillUnmount"); }
    }, [] )

    useEffect( () => {
        const isPermissionGranted = async () => {
            if(Platform.OS === 'ios') setPermissionGranted(true)
            return;
            setPermissionGranted(await requestLocationPermission());
        }
        isPermissionGranted();
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
            console.log('You can use the GPS');
            return true
        } else {
            console.log('Location permission denied');
            return false
        }
    } catch (err) {
        console.warn(err);
    }
}
