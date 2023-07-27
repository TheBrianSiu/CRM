const express = require('express');
const router = express.Router();
const { db } = require('../dbConfig');


// customers table
router.get('/customers-table', (req, res)=>{
    const sql = "SELECT* FROM CUSTOMERS";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

router.get('/csutomer-table/:id', (req, res)=>{
    const userid = req.params.id;
    const sql = `SELECT * FROM CUSTOMERS WHERE ID = ${userid}`;
    db.query(sql,(err,data)=>{
        if(err){ return res.status(404).json( { message :  'user not found'});}
        return res.json(data);
    })
})

router.put('/customer-table/update/:id', async (req, res) => {
    const userid = req.params.id;
    const updatedData = req.body;
    // console.log(updatedData);
  
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

  module.exports = router;