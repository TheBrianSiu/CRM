const express = require('express');
const router = express.Router();
const { db } = require('../dbConfig');
const { validateUser } = require('../validation/validation');
const { hashPassword } = require('../encryption/Encryption');



router.get('/users-table', (req, res)=>{
    const sql = "SELECT user_id,first_name, last_name,email,phone_number,job_title, department,status,last_login FROM USERS";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

router.get('/users-table/supervisor', (req, res)=>{
    const sql = "SELECT user_id,first_name, last_name FROM USERS";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

router.get('/users-table/:id', (req, res) => {
    const userid = req.params.id;
    const sql = `SELECT username,first_name, last_name,email,phone_number,job_title, department,status,address,IS_ADMIN,supervisor_id FROM USERS WHERE user_id = ?`;
    db.query(sql,[userid], (err,data)=>{
        if(err){ return res.status(404).json( { message :  'user not found'});}
        return res.json(data);
    })
})


router.post('/users-table/add', async (req, res) => {
    const data = req.body;

    const validation = validateUser(data);
    if (!validation.isValid) {
     return res.status(400).json( validation.errors );
    }

    try{
        const hashedPassword = await hashPassword(data.password);
        data.password = hashedPassword;
        const dataarray = [Object.values(data)];
        const sql = `INSERT INTO USERS ( username,first_name, last_name,email,phone_number,job_title, department,status,address,IS_ADMIN,password,supervisor_id) VALUES ?`;
        await db.query(sql,[dataarray]);
        return res.json({message: 'Users data added sucessfully'});
    }
    catch{
        console.error('Error adding customer data:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})


router.delete('/users-table/delete/:id', async (req,res) =>{
    const id = req.params.id;

    try{
    const sql = 'DELETE FROM USERS WHERE USER_ID = ?';
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


  // update users
  router.put('/users-table/update/:id', async (req, res) =>{
    const userid = req.params.id;
    const updatedData = req.body;

    const validation = validateUser(updatedData);
    if(!validation.isValid){
        return res.status(400).json(validation.errors);
    }

    if(updatedData.password !=null){
        try {
            const hashedPassword = await hashPassword(updatedData.password);
            updatedData.password = hashedPassword;
          } catch (error) {
            return res.status(500).json({ message: 'Hashing password failed' });
          }
    }

    try {
      let sql = 'UPDATE USERS SET';
      const values = [];
  
      // Iterate over the updatedData object to generate the SQL query
      Object.keys(updatedData).forEach((key, index) => {
        if (index > 0) sql += ',';
        sql += ` ${key} = ?`;
        values.push(updatedData[key]);
      });
  
      sql += ' WHERE user_ID = ?';
      values.push(userid);

      await db.query(sql, values);
      return res.json({ message: 'Customer data updated successfully' });
    } catch (error) {
      console.error('Error updating customer data:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });



module.exports = router;