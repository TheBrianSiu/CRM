const express = require('express');
const mysql = require('mysql')
const cors = require('cors');

const app = express()
app.use(cors());

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
    const sql = "SELECT image,first_name, last_name,role,status,date_of_joining,user_id FROM USERS";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/user-table/:id', (req, res) => {
    const userid = req.params.id;
    const sql = `SELECT image,first_name, last_name,role,status,date_of_joining,user_id FROM USERS WHERE user_id = ?`;
    db.query(sql,[userid], (err,data)=>{
        if(err){ return res.status(404).json( { message :  'user not found'});}
        return res.json(data);
    })
})

// customers table
app.get('/customers-table', (req, res)=>{
    const sql = "SELECT first_name, last_name, phone_number, email, address, property_type, location_preference, status FROM CUSTOMERS";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/csutomer-table/:id', (req, res)=>{
    const userid = req.params.id;
    const sql = `SELECT first_name, last_name, phone_number, email, address, property_type, location_preference, bedrooms, bathrooms, budget, financing_option, timeline, notes, lead_source, status, assigned_agent FROM CUSTOMERS WHERE ID = ${userid}`;
    db.query(sql,(err,data)=>{
        if(err){ return res.status(404).json( { message :  'user not found'});}
        return res.json(data);
    })
})

app.listen(8080),(()=> {
    console.log("listening");
})

