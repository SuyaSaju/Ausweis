import {BASE_URL} from './api/Configuration';

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
    const response = await fetch(BASE_URL + '/sessions/${sessionId}', {
      method: 'PATCH',
      body: JSON.stringify({status: status}),
    });
    return response.status;
  } catch (error) {
    console.error(error);
  }
};
