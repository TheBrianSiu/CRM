const API_BASE_URL = "http://localhost:8080";

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
      }
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

// Function to remove customers linkage for a project
export async function removeCustomer(project_id) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/project-customer/delete/${project_id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
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
