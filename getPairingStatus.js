export const getPairingStatus = async sessionId => {
  try {
    const response = await fetch(
      `http://192.168.0.7:8080/sessions/${sessionId}`,
    );
    const responseJson = await response.json();
    return responseJson.status;
  } catch (error) {
    console.error(error);
  }
};
