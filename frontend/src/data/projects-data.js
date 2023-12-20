import { API_URL } from '@/settings';
import { fetchDataAndStoreLocal } from './index-db';
import { makeApiRequest } from './main-api';

const API_BASE_URL = API_URL;

export async function fetchProjects() {
  try {
    return await makeApiRequest(
      `${API_BASE_URL}/projects-with-assignees`,
      'GET',
      null,
      localStorage.getItem('token'),
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteProjectWithRelatedData(id) {
  try {
    const projectDeletionResponse = await makeApiRequest(
      `${API_BASE_URL}/projects/delete/${id}`,
      'PUT',
      null,
    );
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

export async function removeAssignees(projectId) {
  try {
    return await makeApiRequest(
      `${API_BASE_URL}/project-assignee/delete/${projectId}`,
      'DELETE',
      null,
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function removeCustomer(projectId) {
  try {
    return await makeApiRequest(
      `${API_BASE_URL}/project-customer/delete/${projectId}`,
      'DELETE',
      null,
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function customerBasicInfo() {
  try {
    return await makeApiRequest(
      `${API_BASE_URL}/customers-basicinfo`,
      'GET',
      null,
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function retrieveProjects(id) {
  try {
    return await makeApiRequest(
      `${API_BASE_URL}/inserted-projects/${id}`,
      'GET',
      null,
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addProjects(customerdata) {
  try {
    const response = await makeApiRequest(
      `${API_BASE_URL}/projects-table/add`,
      'POST',
      customerdata,
    );
    fetchDataAndStoreLocal();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addAssignees(userProjectData) {
  try {
    return await makeApiRequest(
      `${API_BASE_URL}/project_assignees/add`,
      'POST',
      userProjectData,
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addCustomers(custProjectData) {
  try {
    return await makeApiRequest(
      `${API_BASE_URL}/project_customers/add`,
      'POST',
      custProjectData,
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateStatus(id, status) {
  try {
    const response = await makeApiRequest(
      `${API_BASE_URL}/projects-table/update-status/${id}`,
      'PUT',
      [status],
    );
    fetchDataAndStoreLocal();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateProjects(id, taskData) {
  try {
    return await makeApiRequest(
      `${API_BASE_URL}/projects-table/update/${id}`,
      'PUT',
      taskData,
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
