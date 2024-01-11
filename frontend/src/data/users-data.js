import { API_URL } from '@/settings';
import { fetchUserDataAndStoreLocal } from './index-db';
import { makeApiRequest } from './main-api';

const API_BASE_URL = API_URL;

export async function retrieveData(userid) {
  const result = await makeApiRequest(
    `${API_BASE_URL}/users-table/${userid}`,
    'GET',
    null,
  );
  if (result.error) {
    return { error: `Failed to retrieve data: ${result.error}` };
  }
  return result;
}

export async function retreiveRoles(){
  const result = await makeApiRequest(
    `${API_BASE_URL}/rolesoptions`,
    'GET',
    null,
  );

  if(result.error){
    return {error: `Failure to retrieve role options : ${result.error}`};
  }
  return result;
}

export async function retrieveDataById(id, userid) {
  const result = await makeApiRequest(
    `${API_BASE_URL}/users-table/${id}/${userid}`,
    'GET',
    null,
  );
  if (result.error) {
    return { error: `Failed to retrieve data by ID: ${result.error}` };
  }
  return result;
}

export async function retreiveUserRoleById(userid){
  const result = await makeApiRequest(
    `${API_BASE_URL}/userrolesrequest/${userid}`,
    'GET',
    null,
  );

  if (result.error) {
    return { error: `Failed to retrieve user role: ${result.error}` };
  }
  return result;
}

export async function supervisor() {
  const result = await makeApiRequest(
    `${API_BASE_URL}/users-table/get/supervisor`,
    'GET',
    null,
  );
  if (result.error) {
    return { error: `Failed to retrieve supervisor data: ${result.error}` };
  }
  return result;
}

export async function deleteUser(id, userid) {
  const result = await makeApiRequest(
    `${API_BASE_URL}/users-table/delete/${id}/${userid}`,
    'PUT',
    null,
  );
  if (result.error) {
    return { error: `Failed to delete user: ${result.error}` };
  }
  fetchUserDataAndStoreLocal(userid);
  return result;
}

export async function addUser(customerData, userid) {
  const result = await makeApiRequest(
    `${API_BASE_URL}/users-table/add/${userid}`,
    'POST',
    customerData,
  );
  if (result.error) {
    return { error: `Failed to add user: ${result.error}` };
  }
  fetchUserDataAndStoreLocal(userid);
  return result;
}

export async function updateUser(id, updatedData, userid) {
  const result = await makeApiRequest(
    `${API_BASE_URL}/users-table/update/${id}/${userid}`,
    'PUT',
    updatedData,
  );
  if (result.error) {
    return { error: `Failed to update user: ${result.error}` };
  }
  fetchUserDataAndStoreLocal(userid);
  return result;
}