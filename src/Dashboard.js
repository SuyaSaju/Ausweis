import React, {useState, useEffect} from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera as Camera} from 'react-native-camera';
import {getSessionStatus, patchSessions} from './api/proofsApi';
import {LocationUpdatesScreen} from './LocationUpdatesScreen';
import {STATUS_CHECK_INTERVAL} from './api/Configuration';
import {StackActions} from '@react-navigation/native';

const Dashboard = ({navigation}) => {
  const [pairingStarted, setPairingStarted] = useState(false);
  const [pairingStatus, setPairingStatus] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');

  useEffect(() => {
    const sessionStatus = async () => {
      console.log('Checking status...');
      const pairingStatusFromResponse = await getSessionStatus(sessionId);
      if (pairingStatusFromResponse.includes('Active')) {
        setDisplayMessage(
          'Device has already paired. No further action needed',
        );
      }
      setPairingStatus(pairingStatusFromResponse);
    };
    if (sessionId === '') {
      return;
    }
    const interval = setInterval(sessionStatus, STATUS_CHECK_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, [sessionId]);

  useEffect(() => {
    const patch = async () => {
      if (sessionId != '' && pairingStatus.includes('Pairing')) {
        await patchSessions(sessionId, ['Active']);
        setPairingStatus(['Active']);
        setDisplayMessage('Session Pairing: Active');
      }
      if (
        pairingStatus.length !== 0 &&
        (pairingStatus.includes('Error') || pairingStatus.includes('Timed-Out'))
      ) {
        setSessionId('');
        setDisplayMessage(
          'Session pairing expired or invalid. To re-initiate pairing, logout\n' +
            '            and login once again to Topcoder through VSCode',
        );
      }
    };
    patch();
  }, [pairingStatus, sessionId]);

  const onSuccess = value => {
    setPairingStarted(false);
    console.log('Pairing Success');
    setSessionId(value.data);
  };

  const detachPairing = async () => {
    await patchSessions(sessionId, ['Closed']);
    setPairingStatus(['Closed']);
    setSessionId('');
    setDisplayMessage('');
  };

  const canStartScanning = () =>
    (pairingStatus.length === 0 || pairingStatus.includes('Closed')) &&
    !pairingStarted;

  return (
    <SafeAreaView>
      {canStartScanning() && (
        <Button
          title={'Pair a session'}
          onPress={() => {
            setPairingStarted(true);
            setDisplayMessage('Pairing');
          }}
        />
      )}
      {pairingStarted && (
        <QRCodeScanner
          onRead={onSuccess}
          cameraProps={{flashMode: Camera.Constants.FlashMode.auto}}
        />
      )}
      {displayMessage !== '' && <Text>{displayMessage}</Text>}
      {pairingStatus.length !== 0 && pairingStatus.includes('Active') && (
        <Button title={'Detach pairing'} onPress={detachPairing} />
      )}
      <Button
        title={'Log out'}
        onPress={() => {
          // const resetAction = NavigationActions.reset({
          //   index: 0,
          //   actions: [NavigationActions.navigate({routeName: 'Login'})],
          // });
          // navigation.dispatch(resetAction);
          console.log('Logout');
          const popAction = StackActions.pop(1);

          navigation.dispatch(popAction);
        }}
      />
      {sessionId !== '' && <LocationUpdatesScreen sessionId={sessionId} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Dashboard;
