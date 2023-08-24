

export function FetchProjectTable(setProjectsTableData){
    fetch("http://localhost:8080/projects-with-assignees")
      .then((response) => response.json())
      .then((data) => {
        setProjectsTableData(data);
      })
      .catch((error) => console.error(error));

}

export function FetchProjectCompletion(formattedStartOfMonth, formattedEndOfMonth,setCompletedProject){
  fetch(`http://localhost:8080/closed-project-records?start=${formattedStartOfMonth}&end=${formattedEndOfMonth}`)
  .then((response) => response.json())
  .then((data) => {
    setCompletedProject(data);
  })
  .catch((error) => console.error(error));
}

