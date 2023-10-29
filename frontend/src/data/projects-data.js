import { API_URL } from "@/settings";
import { refreshToken, isTokenExpired } from "./auth-data";
import { fetchDataAndStoreLocal } from "./indexdb";

const API_BASE_URL = API_URL;

async function makeApiRequest(url, method, data, token) {
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

export async function fetchProjects() {
  try {
    return await makeApiRequest(`${API_BASE_URL}/projects-with-assignees`, 'GET', null, localStorage.getItem('token'));
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteProjectWithRelatedData(id) {
  try {
    const projectDeletionResponse = await makeApiRequest(`${API_BASE_URL}/projects/delete/${id}`, 'PUT', null, localStorage.getItem('token'));
    const assigneesRemovalResponse = await removeAssignees(id, localStorage.getItem('token'));
    const customersRemovalResponse = await removeCustomer(id, localStorage.getItem('token'));
    fetchDataAndStoreLocal();
    return {
      projectDeletionResponse,
      assigneesRemovalResponse,
      customersRemovalResponse,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function removeAssignees(project_id, token) {
  try {
    return await makeApiRequest(`${API_BASE_URL}/project-assignee/delete/${project_id}`, 'DELETE', null, token);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function removeCustomer(project_id, token) {
  try {
    return await makeApiRequest(`${API_BASE_URL}/project-customer/delete/${project_id}`, 'DELETE', null, token);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function customer_basic_info() {
  try {
    return await makeApiRequest(`${API_BASE_URL}/customers-basicinfo`, 'GET', null, localStorage.getItem('token'));
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function retrieveprojects(id) {
  try {
    return await makeApiRequest(`${API_BASE_URL}/inserted-projects/${id}`, 'GET', null, localStorage.getItem('token'));
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addprojects(customerdata) {
  try {
    const response = await makeApiRequest(`${API_BASE_URL}/projects-table/add`, 'POST', customerdata, localStorage.getItem('token'));
    fetchDataAndStoreLocal();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addassignees(userProjectData) {
  try {
    return await makeApiRequest(`${API_BASE_URL}/project_assignees/add`, 'POST', userProjectData, localStorage.getItem('token'));
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addcustomers(custProjectData) {
  try {
    return await makeApiRequest(`${API_BASE_URL}/project_customers/add`, 'POST', custProjectData, localStorage.getItem('token'));
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updatestatus(id, status) {
  try {
    const response = await makeApiRequest(`${API_BASE_URL}/projects-table/update-status/${id}`, 'PUT', [status], localStorage.getItem('token'));
    fetchDataAndStoreLocal();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateprojects(id, taskData) {
  try {
    return await makeApiRequest(`${API_BASE_URL}/projects-table/update/${id}`, 'PUT', taskData, localStorage.getItem('token'));
  } catch (error) {
    throw new Error(error.message);
  }
}
