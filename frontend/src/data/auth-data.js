import { API_URL, domain } from '@/settings';
import { useAuth0 } from "@auth0/auth0-react";
import { makeApiRequest } from './main-api';

const API_BASE_URL = API_URL;

export async function changePassword(email) {
  const result = await makeApiRequest(
    `${API_BASE_URL}/changepassword/${email}`,
    'PUT',
  );
  if (result.error) {
    return { error: `Failed to change passwords: ${result.error}` };
  }

  return result;
}

export async function userRole(userId) {
  const result = await makeApiRequest(
    `${API_BASE_URL}/userrolesrequest/${userId}`,
    'PUT',
  );
  if (result.error) {
    return { error: `Failed to retrieve user role ${result.error}` };
  }

  return result;
}

export async function userPermission(userid, permission) {
  const result = await makeApiRequest(
    `${API_BASE_URL}/userpermission?userid=${userid}&permission=${permission}`,
    'GET',
  );

  if (result.error) {
    return { error: `Failed to retrieve user role ${result.error}` };
  }

  return result;
}

export function useAccessToken() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  async function fetchAccessToken() {
    try {
      const accessToken = isAuthenticated ? await getAccessTokenSilently() : '';
      sessionStorage.setItem('token', accessToken);
      return accessToken;
    } catch (error) {
      console.error('Error fetching access token:', error);
      return null;
    }
  }

  return fetchAccessToken();
}