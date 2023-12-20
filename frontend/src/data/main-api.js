import { refreshToken, isTokenExpired } from './auth-data';

export async function makeApiRequest(url, method, data) {
  let token = localStorage.getItem('token');

  if (!token || isTokenExpired(token)) {
    try {
      token = await refreshToken();
    } catch (error) {
      console.error(error);
      return { error: 'Token refresh failed' };
    }
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: data !== null ? JSON.stringify(data) : null,
    });

    const responseData = await response.json();

    if (!response.ok) {
      if (responseData && responseData.message) {
        return { error: responseData.message };
      }
      return { error: 'API request failed' };
    }

    return responseData;
  } catch (error) {
    return { error: `API request error: ${error.message}` };
  }
}
