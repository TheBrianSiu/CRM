import { API_URL } from "@/settings";
import { refreshToken, isTokenExpired } from "./auth-data";

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

export async function Addcusts(customerdata) {
  const result = await makeApiRequest(`${API_BASE_URL}/customers-table/add`, "POST", customerdata);
  if (result.error) {
    return { error: 'Failed to add customer: ' + result.error };
  }

  fetchCustDataAndStoreLocal();

  return result;
}

export async function retrievecustomers() {
  const result = await makeApiRequest(`${API_BASE_URL}/customers-table`, "GET", null);
  if (result.error) {
    return { error: 'Failed to retrieve customers: ' + result.error };
  }

  return result;
}

export async function removecustomer(id) {
  const result = await makeApiRequest(`${API_BASE_URL}/customers-table/delete/${id}`, "PUT", null);
  if (result.error) {
    return { error: 'Failed to remove customer: ' + result.error };
  }

  fetchCustDataAndStoreLocal();

  return result;
}

export async function retrievecustomersbyid(id) {
  const result = await makeApiRequest(`${API_BASE_URL}/customers-table/${id}`, "GET", null);
  if (result.error) {
    return { error: 'Failed to retrieve customer by ID: ' + result.error };
  }

  return result;
}

export async function updatecustomers(id, updateddata) {
  const result = await makeApiRequest(`${API_BASE_URL}/customers-table/update/${id}`, "PUT", updateddata);
  if (result.error) {
    return { error: 'Failed to update customer: ' + result.error };
  }

  fetchCustDataAndStoreLocal();

  return result;
}

