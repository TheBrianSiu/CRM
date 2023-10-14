import { openDB } from "idb";
import { fetchProjects } from "@/data/projects-data";


export const fetchDataAndStoreLocal = async () => {

    const data = await fetchProjects();
  
    const db = await openDB("projects", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("tasks")) {
          db.createObjectStore("tasks", { keyPath: "project_id" });
        }
      }
    });
  
    try {
      const transaction = db.transaction("tasks", "readwrite");
      const objectStore = transaction.objectStore("tasks");

      objectStore.clear();
  
      for (const project of data) {
        const eachTask = {
          project_id: project.project_id,
          task_name: project.task_name,
          description: project.description,
          due_date: project.due_date,
          est_value: project.est_value,
          lead_status: project.lead_status,
          priority: project.priority,
          assignees : project.assignees
        };
        
        await objectStore.put(eachTask);
      }
  
      await transaction.done;
    } catch (error) {
      console.error("Error while storing data:", error);
    } finally {
      db.close();
    }
  };


  export const RetreiveDataLocal = async (setTasks) =>{
    const db = await openDB("projects", 1);
    const tasks = await db.getAll("tasks");
    setTasks(tasks);
}


  