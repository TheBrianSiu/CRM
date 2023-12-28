const express = require('express');
const router = express.Router();
const { db } = require('../dbConfig');
const { validateCustomer } = require('../validation/validation');
const { retreieve_user_permission } = require('../auth/auth');


// customers table
router.get('/customers-table/:userid', async (req, res) => {
  const userid = req.params.userid;
  const sql = "SELECT * FROM CUSTOMERS WHERE IS_DELETED = 0";

  try {
    const hasPermission = await retreieve_user_permission(userid, "read:customers");

    if (!hasPermission) {
      return res.status(401).json({ message: 'You don\'t have permission' });
    }

    const data = await new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          reject(err);
        } else {
          resolve(result); 
        }
      });
    });

    return res.json(data);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

//customers-basic info
router.get('/customers-basicinfo', (req, res)=>{
  const sql = "SELECT id, first_name, last_name FROM CUSTOMERS WHERE IS_DELETED = 0";
  db.query(sql,(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })
})

// retrieve each user
router.get('/customer/:id', (req, res)=>{
    const userid = req.params.id;

    const sql = `SELECT * FROM CUSTOMERS WHERE ID = ${userid} AND IS_DELETED = 0`;
    db.query(sql,(err,data)=>{
        if(err){ return res.status(404).json( { message :  'user not found'});}
        return res.json(data);
    })
})

//update each user 
router.put('/customers-table/update/:id/:userid', async (req, res) => {
    const id = req.params.id;
    const userid = req.params.userid;
    const updatedData = req.body;

    const hasPermission = await retreieve_user_permission(userid, "update:customers");

    if (!hasPermission) {
      return res.status(401).json({ message: 'You don\'t have permission' });
    }

    const validation = validateCustomer(updatedData);

    if (!validation.isValid) {
     return res.status(403).json({ message: validation.errors });
    }
    
    try {
      let sql = 'UPDATE CUSTOMERS SET';
      const values = [];
      
      // Iterate over the updatedData object to generate the SQL query
      Object.keys(updatedData).forEach((key, index) => {
        if (index > 0) sql += ',';
        sql += ` ${key} = ?`;
        values.push(updatedData[key]);
      });
  
      sql += ' WHERE ID = ?';
      values.push(id);

      await db.query(sql, values);
      return res.json({ message: 'Customer data updated successfully' });
    } catch (error) {
      console.error('Error updating customer data:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });

//add new customer
router.post('/customers-table/add/:userid', async (req, res) => {
  const data = req.body;
  const userid = req.params.userid;
  const hasPermission = await retreieve_user_permission(userid, "create:customers");

  if (!hasPermission) {
    return res.status(401).json({ message: 'You don\'t have permission' });
  }

  const validation = validateCustomer(data);

  console.log(validation)

  if (!validation.isValid) {
    return res.status(403).json({ message: validation.errors });
  }

  try {
    const dataArray = [Object.values(data)];
    const sql = 'INSERT INTO CUSTOMERS (first_name, last_name, phone_number, email, property_type, location_preference, bedrooms, bathrooms, budget, financing_option, timeline, notes, lead_source, status, assigned_agent, img, address_country, address_street, address_zip_code, address_city, address_state,is_deleted) VALUES ?';
    await db.query(sql, [dataArray]);
    return res.json({ message: 'Customer data added successfully' });
  } catch (error) {
    console.error('Error adding customer data:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// delete a customer
router.put('/customers-table/delete/:id/:userid', async (req, res) => {
  const id = req.params.id;
  const userid = req.params.userid;
  
  try {
    const sql = 'UPDATE CUSTOMERS SET IS_DELETED = 1 WHERE ID = ?';

    const hasPermission = await retreieve_user_permission(userid, "delete:customers");

    if (!hasPermission) {
      return res.status(401).json({ message: 'You don\'t have permission' });
    }

    const data = await new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

  module.exports = router;