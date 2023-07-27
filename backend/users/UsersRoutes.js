const express = require('express');
const router = express.Router();
const { db } = require('../dbConfig');


router.get('/users', (req, res)=>{
    const sql = "SELECT * FROM USERS";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

router.get('/users-table', (req, res)=>{
    const sql = "SELECT img,first_name, last_name,role,status,date_of_joining,user_id FROM USERS";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

router.get('/user-table/:id', (req, res) => {
    const userid = req.params.id;
    const sql = `SELECT img,first_name, last_name,role,status,date_of_joining,user_id FROM USERS WHERE user_id = ?`;
    db.query(sql,[userid], (err,data)=>{
        if(err){ return res.status(404).json( { message :  'user not found'});}
        return res.json(data);
    })
})

router.get('/user-projects-table', (req, res) => {
    const userid = req.params.id;
    const sql = `SELECT user_id, img,first_name, last_name FROM USERS`;
    db.query(sql,[userid], (err,data)=>{
        if(err){ return res.status(404).json( { message :  'no user are found'});}
        return res.json(data);
    })
})

module.exports = router;