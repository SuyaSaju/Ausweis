import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, Button} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera as Camera} from 'react-native-camera';
import {getPairingStatus} from './getPairingStatus';

const Dashboard = () => {
  const [pairingStarted, setPairingStarted] = useState(false);
  const [pairingStatus, setPairingStatus] = useState([]);

  useEffect(() => {
    if (pairingStatus && pairingStatus.includes('PAIRING')) {
    }
  }, [pairingStatus]);

  const onSuccess = async value => {
    setPairingStarted(false);
    const sessionId = value.data;
    const pairingStatusFromResponse = await getPairingStatus(sessionId);
    setPairingStatus(pairingStatusFromResponse);
  };

  return (
    <SafeAreaView>
      {pairingStatus.length === 0 && !pairingStarted && (
        <Button
          title={'Pair a session'}
          onPress={() => setPairingStarted(true)}
        />
      )}
      {pairingStarted && (
        <QRCodeScanner
          onRead={onSuccess}
          cameraProps={{flashMode: Camera.Constants.FlashMode.auto}}
        />
      )}
      {pairingStatus.length === 0 && pairingStatus.includes('Active') && (
        <Text>Device has already paired. No further action needed</Text>
      )}
      {pairingStatus.length !== 0 &&
        !(
          pairingStatus.includes('Pairing') || pairingStatus.includes('Active')
        ) && (
          <Text>
            Session pairing expired or invalid. To re-initiate pairing, logout
            and login once again to Topcoder through VSCode
          </Text>
        )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Dashboard;
