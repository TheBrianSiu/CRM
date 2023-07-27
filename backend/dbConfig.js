const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: '',
  database: 'crm',
});

module.exports = { app, db };
