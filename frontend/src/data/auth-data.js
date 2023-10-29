import { API_URL } from "@/settings";

const API_BASE_URL = API_URL;


export async function changePassword(email){
  try{
    const response = await fetch(`${API_BASE_URL}/changepassword/${email}`,{
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
    if(!response.ok){
      throw new Error("Request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
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
    return newToken;
  } catch (error) {
    throw new Error('Token refresh error: ' + error.message);
  }
}

