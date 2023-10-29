import { openDB } from "idb";
import { fetchProjects } from "@/data/projects-data";
import { retrieveData } from "./users-data";
import { retrievecustomers } from "./customers-data";

// projects
export const fetchDataAndStoreLocal = async () => {

    const data = await fetchProjects();

  // regenerate the DB if it doesn't have, but it doesn't work in Neltify for initalize DB 
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

// users
export const fetchUserDataAndStoreLocal = async () => {

  const data = await retrieveData();

// regenerate the DB if it doesn't have, but it doesn't work in Neltify for initalize DB 
  const db = await openDB("users", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("user")) {
        db.createObjectStore("user", { keyPath: "user_id" });
      }
    }
  });

  try {
    const transaction = db.transaction("user", "readwrite");
    const objectStore = transaction.objectStore("user");

    objectStore.clear();

    for (const user of data) {
      const eachUser = {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        job_title: user.job_title,
        department: user.department,
        status: user.status,
        is_admin: user.is_admin,
        password: user.password,
        last_login: user.last_login,
      };
      
      await objectStore.put(eachUser);
    }

    await transaction.done;
  } catch (error) {
    console.error("Error while storing user data:", error);
  } finally {
    db.close();
  }
};

export const RetreiveUserDataLocal = async (setUserdata) =>{
  const db = await openDB("users", 1);
  const users = await db.getAll("user");
  setUserdata(users);
}

// Customers
export const fetchCustDataAndStoreLocal = async () => {

  const data = await retrievecustomers();

// regenerate the DB if it doesn't have, but it doesn't work in Neltify for initalize DB 
  const db = await openDB("customers", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("cust")) {
        db.createObjectStore("cust", { keyPath: "id" });
      }
    }
  });

  try {
    const transaction = db.transaction("cust", "readwrite");
    const objectStore = transaction.objectStore("cust");

    objectStore.clear();

    for (const cust of data) {
      const eachCust = {
        "id": cust.id,
        "first_name": cust.first_name,
        "last_name": cust.last_name,
        "phone_number": cust.phone_number,
        "email": cust.email,
        "property_type": cust.property_type,
        "location_preference": cust.location_preference,
        "bedrooms": cust.bedrooms,
        "bathrooms": cust.bathrooms,
        "budget": cust.budget,
        "financing_option": cust.financing_option,
        "timeline": cust.timeline,
        "notes": cust.notes,
        "lead_source": cust.lead_source,
        "status": cust.status,
        "assigned_agent": cust.assigned_agent,
        "img": cust.img,
        "address_country": cust.address_country,
        "address_street": cust.address_street,
        "address_zip_code": cust.address_zip_code,
        "address_city": cust.address_city,
        "address_state": cust.address_state,
        "is_deleted": cust.is_deleted,
        "created_time": cust.created_time
    }
      await objectStore.put(eachCust);
    }

    await transaction.done;
  } catch (error) {
    console.error("Error while storing customer data:", error);
  } finally {
    db.close();
  }
};

export const RetreiveCustDataLocal = async (setUserdata) =>{
  const db = await openDB("customers", 1);
  const cust = await db.getAll("cust");
  setUserdata(cust);
}