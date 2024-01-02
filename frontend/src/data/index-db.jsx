import { openDB } from 'idb';
import { fetchProjects } from '@/data/projects-data';
import { retrieveData } from './users-data';
import { retrieveCustomers } from './customers-data';

// projects
export const fetchDataAndStoreLocal = async () => {
  const data = await fetchProjects();

  // regenerate the DB if it doesn't have, but it doesn't work in Neltify for initalize DB
  const db = await openDB('projects', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('tasks')) {
        db.createObjectStore('tasks', { keyPath: 'projectId' });
      }
    },
  });

  try {
    const transaction = db.transaction('tasks', 'readwrite');
    const objectStore = transaction.objectStore('tasks');

    objectStore.clear();

    for (const project of data) {
      const eachTask = {
        projectId: project.project_id,
        taskname: project.task_name,
        description: project.description,
        duedate: project.due_date,
        estValue: project.est_value,
        leadStatus: project.lead_status,
        priority: project.priority,
        assignees: project.assignees,
      };

      await objectStore.put(eachTask);
    }

    await transaction.done;
  } catch (error) {
    console.error('Error while storing data:', error);
  } finally {
    db.close();
  }
};

export const retreiveDataLocal = async (setTasks) => {
  const db = await openDB('projects', 1);
  const tasks = await db.getAll('tasks');
  setTasks(tasks);
};

// users
export const fetchUserDataAndStoreLocal = async (userid) => {
  const data = await retrieveData(userid);

  // regenerate the DB if it doesn't have, but it doesn't work in Neltify for initalize DB
  const db = await openDB('users', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('user')) {
        db.createObjectStore('user', { keyPath: 'userId' });
      }
    },
  });

  try {
    const transaction = db.transaction('user', 'readwrite');
    const objectStore = transaction.objectStore('user');

    objectStore.clear();

    for (const user of data) {
      const eachUser = {
        userId: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phoneNumber: user.phone_number,
        jobTitle: user.job_title,
        department: user.department,
        status: user.status,
        password: user.password,
        lastLogin: user.last_login,
      };

      await objectStore.put(eachUser);
    }

    await transaction.done;
  } catch (error) {
    console.error('Error while storing user data:', error);
  } finally {
    db.close();
  }
};

export const retreiveUserDataLocal = async (setUserdata) => {
  const db = await openDB('users', 1);
  const users = await db.getAll('user');
  setUserdata(users);
};

// Customers
export const fetchCustDataAndStoreLocal = async (userid) => {
  const data = await retrieveCustomers(userid);

  // regenerate the DB if it doesn't have, but it doesn't work in Neltify for initalize DB
  const db = await openDB('customers', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('cust')) {
        db.createObjectStore('cust', { keyPath: 'id' });
      }
    },
  });

  try {
    const transaction = db.transaction('cust', 'readwrite');
    const objectStore = transaction.objectStore('cust');

    objectStore.clear();

    for (const cust of data) {
      const eachCust = {
        id: cust.id,
        firstName: cust.first_name,
        lastName: cust.last_name,
        phoneNumber: cust.phone_number,
        email: cust.email,
        propertyType: cust.property_type,
        locationPreference: cust.location_preference,
        bedrooms: cust.bedrooms,
        bathrooms: cust.bathrooms,
        budget: cust.budget,
        financingOption: cust.financing_option,
        timeline: cust.timeline,
        notes: cust.notes,
        leadSource: cust.lead_source,
        status: cust.status,
        assignedAgent: cust.assigned_agent,
        img: cust.img,
        addressCountry: cust.address_country,
        addressStreet: cust.address_street,
        addressZipCode: cust.address_zip_code,
        addressCity: cust.address_city,
        addressState: cust.address_state,
        isDeleted: cust.is_deleted,
        createdtime: cust.created_time,
      };
      await objectStore.put(eachCust);
    }

    await transaction.done;
  } catch (error) {
    console.error('Error while storing customer data:', error);
  } finally {
    db.close();
  }
};

export const retreiveCustDataLocal = async (setUserdata) => {
  const db = await openDB('customers', 1);
  const cust = await db.getAll('cust');
  setUserdata(cust);
};
