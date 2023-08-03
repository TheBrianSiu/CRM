const express = require('express');
const router = express.Router();
const { db } = require('../dbConfig');
const { validateCustomer } = require('../validation/validation');


// customers table
router.get('/customers-table', (req, res)=>{
    const sql = "SELECT* FROM CUSTOMERS WHERE IS_DELETED = 0";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

// retrieve each user
router.get('/customers-table/:id', (req, res)=>{
    const userid = req.params.id;
    const sql = `SELECT * FROM CUSTOMERS WHERE ID = ${userid} AND IS_DELETED = 0`;
    db.query(sql,(err,data)=>{
        if(err){ return res.status(404).json( { message :  'user not found'});}
        return res.json(data);
    })
})

//update each user 
router.put('/customers-table/update/:id', async (req, res) => {
    const userid = req.params.id;
    const updatedData = req.body;

    const validation = validateCustomer(updatedData);
    if (!validation.isValid) {
     return res.status(400).json( validation.errors );
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
      values.push(userid);

      await db.query(sql, values);
      return res.json({ message: 'Customer data updated successfully' });
    } catch (error) {
      console.error('Error updating customer data:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });


// insert a user


router.post('/customers-table/add', async (req, res) => {
  const data = req.body;

  const validation = validateCustomer(data);
  if (!validation.isValid) {
   return res.status(400).json( validation.errors );
  }

  try {
    const dataArray = [Object.values(data)];
    const sql = 'INSERT INTO CUSTOMERS (first_name, last_name, phone_number, email, property_type, location_preference, bedrooms, bathrooms, budget, financing_option, timeline, notes, lead_source, status, assigned_agent, img, address_country, address_street, address_zip_code, address_city, address_state) VALUES ?';
    await db.query(sql, [dataArray]);
    return res.json({ message: 'Customer data added successfully' });
  } catch (error) {
    console.error('Error adding customer data:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


// delete a customer

router.put('/customers-table/delete/:id', async (req, res) => {
  const id = req.params.id;
  
  try {
    const sql = 'UPDATE CUSTOMERS SET IS_DELETED = 1 WHERE ID = ?';

    const data = await new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          reject(err);
        } else {
          resolve(result); // result data
        }
      });
    });
    return res.json(data); // Send the result data in the response
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

  module.exports = router;