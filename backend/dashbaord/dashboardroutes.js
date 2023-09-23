const express = require('express');
const router = express.Router();
const { db } = require('../dbConfig');

// find sale vlaue
router.get('/sales-records', (req, res) => {
    const start = req.query.start;
    const end = req.query.end;
    const sql = `
      SELECT SUM(est_value) AS total_sales
      FROM PROJECTS
      WHERE is_deleted = 0 AND lead_status = 'won' AND due_date BETWEEN ? AND ?`;
  
    db.query(sql, [start, end], (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Error retrieving sales data' });
      }
  
      const totalSales = data[0]?.total_sales || 0;
  
      return res.json(totalSales);
    });
  });
  

router.get('/est-sales-records',(req, res)=>{
    const sql = `SELECT SUM(est_value) AS est_value FROM PROJECTS WHERE is_deleted = 0 AND NOT lead_status = 'won' AND NOT lead_status = 'lost' AND due_date BETWEEN ? AND ?`;
    const start = req.query.start;
    const end = req.query.end;
    db.query(sql, [start,end],(err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Error retrieving est sales value data' });
      }
      const totalEstSales = data[0]?.est_value|| 0;
      return res.json(totalEstSales);
    });
  });

//count project number
router.get('/project-records', (req, res) => {
  const start = req.query.start;
  const end = req.query.end;
  const sql = `
  SELECT COUNT(project_id) AS total_project
  FROM PROJECTS
  WHERE is_deleted = 0 AND created_time BETWEEN ? AND ?`;

  db.query(sql, [start, end], (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving project data' });
    }
    const totalProject = data[0]?.total_project|| 0;
    return res.json(totalProject);
  });
});

//count project number
router.get('/closed-project-records', (req, res) => {
  const start = req.query.start;
  const end = req.query.end;
  const sql = `SELECT COUNT(project_id) AS total_project
  FROM PROJECTS
  WHERE is_deleted = 0
    AND lead_status IN ('WON', 'LOST')
    AND edited_time BETWEEN ? AND ?;
  `;

  db.query(sql, [start, end], (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving project data' });
    }
    const totalProject = data[0]?.total_project|| 0;
    return res.json(totalProject);
  });
});

//count completed project number
router.get('/project-records', (req, res) => {
  const start = req.query.start;
  const end = req.query.end;
  const sql = `
  SELECT COUNT(project_id) AS total_project
  FROM PROJECTS
  WHERE is_deleted = 0 AND created_time BETWEEN ? AND ?`;

  db.query(sql, [start, end], (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving project data' });
    }
    const totalProject = data[0]?.total_project|| 0;
    return res.json(totalProject);
  });
});

//count customer
router.get('/customers-records', (req, res) => {
  const start = req.query.start;
  const end = req.query.end;
  const sql = `
  SELECT COUNT(id) AS total_customers
  FROM customers
  WHERE is_deleted = 0 AND created_time BETWEEN ? AND ?`;

  db.query(sql, [start, end], (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving customer data' });
    }
    const totalCust = data[0]?.total_customers|| 0;
    return res.json(totalCust);
  });
});


// count monthly project
router.get('/monthly-project', (req, res) => {
  const sql = `
  SELECT
    YEAR(created_time) AS year,
    MONTH(created_time) AS month,
    COUNT(project_id) AS projects_created
FROM
    projects
WHERE
    YEAR(created_time) = YEAR(CURRENT_DATE()) AND is_deleted = 0
GROUP BY
    YEAR(created_time),
    MONTH(created_time)
ORDER BY
    YEAR(created_time),
    MONTH(created_time);
`;

  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving project data' });
    }
    return res.json(data);
  });
});

// count monthly sales_revenue project
router.get('/monthly-sales', (req, res) => {
  const sql = `SELECT YEAR(edited_time) AS year, MONTH(edited_time) AS month, COUNT(est_value) AS sales_revenue FROM projects WHERE YEAR(edited_time) = YEAR(CURRENT_DATE()) AND is_deleted = 0 AND lead_status = 'won' GROUP BY YEAR(edited_time), MONTH(edited_time) ORDER BY YEAR(edited_time), MONTH(edited_time)`;

  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving project data' });
    }
    return res.json(data);
  });
});


// count monthly new client project
router.get('/monthly-clients', (req, res) => {
  const sql = `SELECT YEAR(created_time) AS year, MONTH(created_time) AS month, COUNT(id) AS new_client FROM customers WHERE YEAR(created_time) = YEAR(CURRENT_DATE()) AND is_deleted = 0 GROUP BY YEAR(created_time), MONTH(created_time) ORDER BY YEAR(created_time), MONTH(created_time)`;

  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving project data' });
    }
    return res.json(data);
  });
});

module.exports = router;