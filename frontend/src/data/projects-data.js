import { API_URL } from "@/settings";

const API_BASE_URL = API_URL;

// Function to fetch projects with assignees
export async function fetchProjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/projects-with-assignees`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Function to delete a project and its related data (customers and assignees)
export async function deleteProjectWithRelatedData(id) {
  try {
    const projectDeletionResponse = await deleteProject(id);
    const assigneesRemovalResponse = await removeAssignees(id);
    const customersRemovalResponse = await removeCustomer(id);

    return {
      projectDeletionResponse,
      assigneesRemovalResponse,
      customersRemovalResponse,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

// Function to delete a project by ID
export async function deleteProject(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/delete/${id}`, {
      method: "PUT",
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Function to remove assignees linkage for a project
export async function removeAssignees(project_id) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/project-assignee/delete/${project_id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
    );
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Function to remove customers linkage for a project
export async function removeCustomer(project_id) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/project-customer/delete/${project_id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
    );
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function customer_basic_info() {
  try {
    const response = await fetch(`${API_BASE_URL}/customers-basicinfo`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function retrieveprojects(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/inserted-projects/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addprojects(customerdata) {
  try {
    const response = await fetch(`${API_BASE_URL}/projects-table/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerdata),
    });
    console.log(response)
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addassignees(userProjectData) {
  try {
    const response = await fetch(`${API_BASE_URL}/project_assignees/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userProjectData),
    });
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addcustomers(custProjectData) {
  try {
    const response = await fetch(`${API_BASE_URL}/project_customers/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(custProjectData),
    });
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updatestatus(id, status) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/projects-table/update-status/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([status]),
      },
    );
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateprojects(id, taskData) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/projects-table/update/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      },
    );
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
