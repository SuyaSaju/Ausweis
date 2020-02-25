import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import {getUniqueId} from 'react-native-device-info';

import {Text} from 'react-native';
import {postProofEvent} from './api/postProofEvent';
import {LOCATION_UPDATE_INTERVAL} from './api/Configuration';

export const LocationUpdatesScreen = ({sessionId}) => {
  const [location, setLocation] = useState(
    'Monitoring Location: Getting location!',
  );
  const [locationCoords, setLocationCoords] = useState({
    latitude: '',
    longitude: '',
  });
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const sendProofEvents = async () => {
      console.log(
        'Sending Latitude: ' +
          locationCoords.latitude +
          ' Longitude: ' +
          locationCoords.longitude,
      );
      const status = await postProofEvent(
        sessionId,
        getUniqueId(),
        locationCoords.latitude,
        locationCoords.longitude,
      );
      console.log(status);
    };
    if (locationCoords.latitude === '' || locationCoords.longitude === '') {
      return;
    }
    sendProofEvents();
  }, [locationCoords, sessionId]);

  useEffect(() => {
    if (!permissionGranted) {
      return;
    }
    const start = async () => {
      Geolocation.getCurrentPosition(
        async position => {
          setLocationCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocation('Monitoring Location: Active');
        },
        error => {
          // See error code charts below.
          setLocation('Monitoring Location: Error, ' + error.message);
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };
    const interval = setInterval(start, LOCATION_UPDATE_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [permissionGranted]);

  useEffect(() => {
    const isPermissionGranted = async () => {
      if (Platform.OS === 'ios') {
        setPermissionGranted(true);
        return;
      }
      setPermissionGranted(await requestLocationPermission());
    };
    isPermissionGranted();
  }, []);

  return <Text>{location}</Text>;
};

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Ausweis',
        message: 'Grant permission to get the location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the GPS');
      return true;
    } else {
      console.log('Location permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
}
