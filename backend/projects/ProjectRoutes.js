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
  
  

module.exports = router;