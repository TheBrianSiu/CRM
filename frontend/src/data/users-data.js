import { API_URL } from "@/settings";
import { fetchUserDataAndStoreLocal } from "./indexdb";
import { isTokenExpired, refreshToken } from "./auth-data";
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

export async function retrieveData() {
  const result = await makeApiRequest(`${API_BASE_URL}/users-table`, "GET", null);
  if (result.error) {
    return { error: 'Failed to retrieve data: ' + result.error };
  }
  fetchUserDataAndStoreLocal();
  return result;
}

export async function deleteUser(id) {
  const result = await makeApiRequest(`${API_BASE_URL}/users-table/delete/${id}`, "PUT", null);
  if (result.error) {
    return { error: 'Failed to delete user: ' + result.error };
  }
  fetchUserDataAndStoreLocal();
  return result;
}

export async function addUser(customerData) {
  const result = await makeApiRequest(`${API_BASE_URL}/users-table/add`, "POST", customerData);
  if (result.error) {
    return { error: 'Failed to add user: ' + result.error };
  }

  return result;
}

export async function supervisor() {
  const result = await makeApiRequest(`${API_BASE_URL}/users-table/supervisor`, "GET", null);
  if (result.error) {
    return { error: 'Failed to retrieve supervisor data: ' + result.error };
  }
  return result;
}

export async function retrieveDataById(id) {
  const result = await makeApiRequest(`${API_BASE_URL}/users-table/${id}`, "GET", null);
  if (result.error) {
    return { error: 'Failed to retrieve data by ID: ' + result.error };
  }
  return result;
}

export async function updateUser(id, updatedData) {
  const result = await makeApiRequest(`${API_BASE_URL}/users-table/update/${id}`, "PUT", updatedData);
  if (result.error) {
    return { error: 'Failed to update user: ' + result.error };
  }
  return result;
}
