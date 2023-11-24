import { API_URL } from "@/settings";

const API_BASE_URL = API_URL;

async function makeApiRequest(url, method, data) {
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
        'Authorization': `${token}`,
      },
      body: data !== null ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData || 'API request failed' };
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return { error: 'API request error: ' + error.message };
  }
}

export async function changePassword(email){
  const result = await makeApiRequest(`${API_BASE_URL}/changepassword/${email}`, "PUT");
  if (result.error) {
    return { error: 'Failed to change passwords: ' + result.error };
  }

  return result;
}

export async function userRole(userId){
  const result = await makeApiRequest(`${API_BASE_URL}/userrolesrequest/${userId}`, "PUT");
  if (result.error) {
    return { error: 'Failed to retrieve user role ' + result.error };
  }

  return result;
}



export function isTokenExpired(token) {
  const tokenData = JSON.parse(atob(token.split('.')[1]));
  const expirationTime = tokenData.exp * 1000; 
  const currentTime = Date.now();
  return expirationTime < currentTime;
}


export async function refreshToken() {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'clientID': 'c902b58d-147e-4d03-9a27-871bb74fa143',
        'clientSecret': '3bfecb7a-832a-4f7c-b3d2-4a4d4c5f5568',
      }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const newToken = await response.json();
    localStorage.setItem('token', newToken.token); 
    return newToken.token;
  } catch (error) {
    throw new Error('Token refresh error: ' + error.message);
  }
}

