import { API_URL } from "@/settings";
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

export function FetchProjectTable(setProjectsTableData) {
  try {
    makeApiRequest(`${API_BASE_URL}/projects-with-assignees`)
      .then((data) => {
        setProjectsTableData(data);
      });
  } catch (error) {
    console.error(error);
  }
}

export function FetchProjectCompletion(formattedStartOfMonth, formattedEndOfMonth, setCompletedProject) {
  try {
    makeApiRequest(`${API_BASE_URL}/closed-project-records?start=${formattedStartOfMonth}&end=${formattedEndOfMonth}`)
      .then((data) => {
        setCompletedProject(data);
      });
  } catch (error) {
    console.error(error);
  }
}
