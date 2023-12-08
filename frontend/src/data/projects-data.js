import { API_URL } from "@/settings";
import { fetchDataAndStoreLocal } from "./indexdb";
import { makeApiRequest } from "./mainApi";

const API_BASE_URL = API_URL;

export async function fetchProjects() {
  try {
    return await makeApiRequest(`${API_BASE_URL}/projects-with-assignees`, 'GET', null, localStorage.getItem('token'));
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteProjectWithRelatedData(id) {
  try {
    const projectDeletionResponse = await makeApiRequest(`${API_BASE_URL}/projects/delete/${id}`, 'PUT', null);
    const assigneesRemovalResponse = await removeAssignees(id);
    const customersRemovalResponse = await removeCustomer(id);
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

export async function removeAssignees(project_id) {
  try {
    return await makeApiRequest(`${API_BASE_URL}/project-assignee/delete/${project_id}`, 'DELETE', null);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function removeCustomer(project_id) {
  try {
    return await makeApiRequest(`${API_BASE_URL}/project-customer/delete/${project_id}`, 'DELETE', null);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function customer_basic_info() {
  try {
    return await makeApiRequest(`${API_BASE_URL}/customers-basicinfo`, 'GET', null);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function retrieveprojects(id) {
  try {
    return await makeApiRequest(`${API_BASE_URL}/inserted-projects/${id}`, 'GET', null);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addprojects(customerdata) {
  try {
    const response = await makeApiRequest(`${API_BASE_URL}/projects-table/add`, 'POST', customerdata);
    fetchDataAndStoreLocal();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addassignees(userProjectData) {
  try {
    return await makeApiRequest(`${API_BASE_URL}/project_assignees/add`, 'POST', userProjectData);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addcustomers(custProjectData) {
  try {
    return await makeApiRequest(`${API_BASE_URL}/project_customers/add`, 'POST', custProjectData);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updatestatus(id, status) {
  try {
    const response = await makeApiRequest(`${API_BASE_URL}/projects-table/update-status/${id}`, 'PUT', [status]);
    fetchDataAndStoreLocal();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateprojects(id, taskData) {
  try {
    return await makeApiRequest(`${API_BASE_URL}/projects-table/update/${id}`, 'PUT', taskData);
  } catch (error) {
    throw new Error(error.message);
  }
}
