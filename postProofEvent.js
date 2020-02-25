export const postProofEvent = async ({
  sessionId,
  deviceId,
  latitude,
  longitude,
}) => {
  try {
    const response = await fetch('http://192.168.0.7:8080/proofEvents/', {
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
    console.error(error);
  }
};
