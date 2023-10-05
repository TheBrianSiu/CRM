import { API_URL } from "@/settings";

const API_BASE_URL = API_URL;

export function FetchProjectTable(setProjectsTableData) {
  fetch(`${API_BASE_URL}/projects-with-assignees`)
    .then((response) => response.json())
    .then((data) => {
      setProjectsTableData(data);
    })
    .catch((error) => console.error(error));
}

export function FetchProjectCompletion(
  formattedStartOfMonth,
  formattedEndOfMonth,
  setCompletedProject,
) {
  fetch(
    `${API_BASE_URL}/closed-project-records?start=${formattedStartOfMonth}&end=${formattedEndOfMonth}`,
  )
    .then((response) => response.json())
    .then((data) => {
      setCompletedProject(data);
    })
    .catch((error) => console.error(error));
}
