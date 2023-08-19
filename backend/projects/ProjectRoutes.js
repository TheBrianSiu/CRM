const express = require('express');
const router = express.Router();
const { db } = require('../dbConfig');

// projects

router.get('/projects',(req, res)=>{
    const sql = `select project_id, Task_name, due_date,description,est_value,lead_status, priority from projects where is_deleted = 0`;
    db.query(sql,(err,data)=>{
        if(err){return res.status(404).json({message: 'no projects'});}
        return res.json(data);
    })
})


//  project with assignee first name and last name
router.get('/projects-with-assignees', (req, res) => {
    const sql = `
    SELECT
    p.project_id,
    p.task_name,
    p.due_date,
    p.description,
    p.est_value,
    p.lead_status,
    p.priority,
    pa.assignee_id,
    u.first_name AS assignee_first_name,
    u.last_name AS assignee_last_name
FROM
    projects p
LEFT JOIN
    project_assignees pa ON p.project_id = pa.project_id AND pa.is_deleted = 0
LEFT JOIN
    users u ON pa.assignee_id = u.user_id
WHERE
    p.is_deleted = 0;

    `;
  
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(404).json({ message: 'no projects' });
      }
  
      // Organize the data into projects with assignees
      const projectsWithAssignees = {};
  
      data.forEach(row => {
        const {
          project_id,
          task_name,
          due_date,
          description,
          est_value,
          lead_status,
          priority,
          assignee_id,
          assignee_first_name,
          assignee_last_name,
        } = row;
  
        if (!projectsWithAssignees[project_id]) {
          projectsWithAssignees[project_id] = {
            project_id,
            task_name,
            due_date,
            description,
            est_value,
            lead_status,
            priority,
            assignees: [],
          };
        }
  
        projectsWithAssignees[project_id].assignees.push({
          assignee_id,
          first_name: assignee_first_name,
          last_name: assignee_last_name,
        });
      });
  
      return res.json(Object.values(projectsWithAssignees)); // Convert to array for JSON response
    });
  });
  
  
  // add
router.post("/projects-table/add", async (req, res) => {
  const data = req.body;

  const dataArray = [Object.values(data)];

  // const validation = validateUser(data);
  // if (!validation.isValid) {
  //   return res.status(400).json(validation.errors);
  // }
  try {
    const sql = `INSERT INTO PROJECTS ( task_name, due_date, description, attachments, est_hours, est_value, lead_status, priority) VALUES ?`;
    await db.query(sql, [dataArray], (err, result) => {
      if (err) {
        console.error("Error adding new task", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      
      return res.json({
        message: "New task is added successfully",
        id: result.insertId,
      });
    });
  } catch(error) {
    console.error("Error adding new task", error);
    return res.status(500).json({ message: "Internal Server Error"});
  }
});


router.post("/project_assignees/add", async (req, res) => {
  try {
    const data = req.body;
    const dataArray = data.map(item => [item.project_id , item.assignee_id]);

    const sql = `INSERT INTO project_assignees (PROJECT_ID, ASSIGNEE_ID) VALUES?`;
    await db.query(sql, [dataArray]);
    return res.json({ message: "Assignees added successfully" });
  } catch (error) {
    console.error("Error adding assignees", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/project_customers/add", async (req, res) => {
  try {
    const data = req.body;
    const dataArray = data.map(item => [item.project_id , item.customer_id]);
    const sql = `INSERT INTO project_customers (PROJECT_ID, CUSTOMER_ID) VALUES?`;
    await db.query(sql, [dataArray]);
    return res.json({ message: "Assignees added successfully" });
  } catch (error) {
    console.error("Error adding assignees", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

