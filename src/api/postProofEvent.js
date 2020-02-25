import {BASE_URL} from './Configuration';

export const postProofEvent = async ({
  sessionId,
  deviceId,
  latitude,
  longitude,
}) => {
  try {
    const response = await fetch(BASE_URL + '/proofEvents', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        sessionId: sessionId,
        deviceId: deviceId,
        proofType: ['Geolocation'],
        geolocation: {longitude: longitude, latitude: latitude},
      },
    });
    return response.status;
  } catch (error) {
    console.log('Update GeoLocation failed');
  }
};
