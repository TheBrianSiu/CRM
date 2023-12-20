import { API_URL } from '@/settings';
import { makeApiRequest } from './main-api';

const API_BASE_URL = API_URL;


export function fetchProjectTable(setProjectsTableData) {
  try {
    makeApiRequest(`${API_BASE_URL}/projects-with-assignees`).then((data) => {
      setProjectsTableData(data);
    });
  } catch (error) {
    console.error(error);
  }
}

export function fetchProjectCompletion(
  formattedStartOfMonth,
  formattedEndOfMonth,
  setCompletedProject,
  userid,
) {
  try {
    makeApiRequest(
      `${API_BASE_URL}/closed-project-records?start=${formattedStartOfMonth}&end=${formattedEndOfMonth}&userid=${userid}`,
    ).then((data) => {
      setCompletedProject(data);
    });
  } catch (error) {
    console.error(error);
  }
}
