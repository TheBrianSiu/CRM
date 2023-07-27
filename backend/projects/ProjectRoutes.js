const express = require('express');
const router = express.Router();
const { db } = require('../dbConfig');

// projects

router.get('/projects-table',(req, res)=>{
    const sql = `select img, name, budget, completion, end_date, user_id from projects`;
    db.query(sql,(err,data)=>{
        if(err){return res.status(404).json({message: 'no projects'});}
        return res.json(data);
    })
})

module.exports = router;