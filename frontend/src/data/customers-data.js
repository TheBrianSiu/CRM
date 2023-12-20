import { API_URL } from '@/settings';
import { makeApiRequest } from './main-api';
import { fetchCustDataAndStoreLocal } from './index-db';

const API_BASE_URL = API_URL;

export async function addCusts(customerdata, userid) {
  const result = await makeApiRequest(
    `${API_BASE_URL}/customers-table/add/${userid}`,
    'POST',
    customerdata,
  );
  if (result.error) {
    return { error: `Failed to add customer: ${result.error}` };
  }

  fetchCustDataAndStoreLocal(userid);

  return result;
}

export async function retrieveCustomers(userid) {
  const result = await makeApiRequest(
    `${API_BASE_URL}/customers-table/${userid}`,
    'GET',
    null,
  );
  if (result.error) {
    return { error: `Failed to retrieve customers: ${result.error}` };
  }

  return result;
}

export async function deleteCustomer(id, userid) {
  const result = await makeApiRequest(
    `${API_BASE_URL}/customers-table/delete/${id}/${userid}`,
    'PUT',
    null,
  );

  if (result.error) {
    return { error: `Failed to remove customer: ${result.error}` };
  }

  fetchCustDataAndStoreLocal(userid);

  return result;
}

export async function retrievecustomersbyid(id) {
  const result = await makeApiRequest(
    `${API_BASE_URL}/customer/${id}`,
    'GET',
    null,
  );
  if (result.error) {
    return { error: `Failed to retrieve customer by ID: ${result.error}` };
  }

  return result;
}

export async function updatecustomers(id, userid, updateddata) {
  const result = await makeApiRequest(
    `${API_BASE_URL}/customers-table/update/${id}/${userid}`,
    'PUT',
    updateddata,
  );
  if (result.error) {
    return { error: `Failed to update customer: ${result.error}` };
  }

  fetchCustDataAndStoreLocal(userid);

  return result;
}
