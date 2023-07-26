const express = require('express');
const mysql = require('mysql')
const cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const db = mysql.createConnection(
    {
        host: "localhost",
        user:'root',
        password: '',
        database: 'crm',

    }
)

app.get('/',(req,res)=> {
    return res.json("from backend");
})

// users table
app.get('/users', (req, res)=>{
    const sql = "SELECT * FROM USERS";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.get('/users-table', (req, res)=>{
    const sql = "SELECT img,first_name, last_name,role,status,date_of_joining,user_id FROM USERS";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/user-table/:id', (req, res) => {
    const userid = req.params.id;
    const sql = `SELECT img,first_name, last_name,role,status,date_of_joining,user_id FROM USERS WHERE user_id = ?`;
    db.query(sql,[userid], (err,data)=>{
        if(err){ return res.status(404).json( { message :  'user not found'});}
        return res.json(data);
    })
})

app.get('/user-projects-table', (req, res) => {
    const userid = req.params.id;
    const sql = `SELECT user_id, img,first_name, last_name FROM USERS`;
    db.query(sql,[userid], (err,data)=>{
        if(err){ return res.status(404).json( { message :  'no user are found'});}
        return res.json(data);
    })
})

// customers table
app.get('/customers-table', (req, res)=>{
    const sql = "SELECT* FROM CUSTOMERS";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/csutomer-table/:id', (req, res)=>{
    const userid = req.params.id;
    const sql = `SELECT * FROM CUSTOMERS WHERE ID = ${userid}`;
    db.query(sql,(err,data)=>{
        if(err){ return res.status(404).json( { message :  'user not found'});}
        return res.json(data);
    })
})

app.put('/customer-table/update/:id', async (req, res) => {
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
  

// projects

app.get('/projects-table',(req, res)=>{
    const sql = `select img, name, budget, completion, end_date, user_id from projects`;
    db.query(sql,(err,data)=>{
        if(err){return res.status(404).json({message: 'no projects'});}
        return res.json(data);
    })
})

app.listen(8080),(()=> {
    console.log("listening");
})

