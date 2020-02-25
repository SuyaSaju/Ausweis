import React, {useState, useEffect} from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera as Camera} from 'react-native-camera';
import {getSessionStatus, patchSessions} from './proofsApi';

const Dashboard = () => {
  const [pairingStarted, setPairingStarted] = useState(false);
  const [pairingStatus, setPairingStatus] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');

  useEffect(() => {
    const sessionStatus = async () => {
      const pairingStatusFromResponse = await getSessionStatus(sessionId);
      if (pairingStatusFromResponse.includes('Active')) {
        setDisplayMessage(
          'Device has already paired. No further action needed',
        );
      }
      setPairingStatus(pairingStatusFromResponse);
    };
    sessionStatus();
  }, [sessionId]);

  useEffect(() => {
    const patch = async () => {
      if (pairingStatus.includes('Pairing')) {
        await patchSessions(sessionId, ['Active']);
        setPairingStatus(['Active']);
        setDisplayMessage('Session Pairing: Active');
      }
      if (
        pairingStatus.length !== 0 &&
        !(
          pairingStatus.includes('Pairing') ||
          pairingStatus.includes('Active') ||
          pairingStatus.includes('Closed')
        )
      ) {
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

  const canStartScanning = () => {
    return (
      (pairingStatus.length === 0 || pairingStatus.includes('Closed')) &&
      !pairingStarted
    );
  };

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
      {pairingStatus.length !== 0 && !pairingStatus.includes('Closed') && (
        <Button title={'Detach pairing'} onPress={detachPairing} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Dashboard;
