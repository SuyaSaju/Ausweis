import {BASE_URL} from './api/BaseUrl';

export const getSessionStatus = async sessionId => {
  try {
    const response = await fetch(BASE_URL + 'sessions/${sessionId}');
    const responseJson = await response.json();
    return responseJson.status;
  } catch (error) {
    console.error(error);
  }
};

export const patchSessions = async (sessionId, status) => {
  try {
    const response = await fetch(
      `http://192.168.0.7:8080/sessions/${sessionId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({status: status}),
      },
    );
    return response.status;
  } catch (error) {
    console.error(error);
  }
};
