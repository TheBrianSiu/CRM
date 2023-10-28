const usersroute = require('./users/usersroutes');
const custroute = require('./customers/custroutes');
const projectroute = require('./projects/projectroutes');
const dashboardroute = require('./dashbaord/dashboardroutes');
const authroute = require('./auth/authroutes')
const { app, db } = require('./dbConfig');
const { retrieve_and_insert_newuser} = require('./auth/auth');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  return res.json("from backend");
});

// Schedule periodic task to retrieve and insert new users
setInterval(retrieve_and_insert_newuser, 60000);

// Logging middleware (if needed)
// app.use((req, res, next) => {
//   const timestamp = new Date().toISOString();
//   console.log(`${timestamp} - API Request: ${req.method} ${req.url}`);
//   console.log(`Headers: ${JSON.stringify(req.headers)}`);
//   console.log(`Parameters: ${JSON.stringify(req.query)}`);
//   next();
// });

// Define routes
app.use('/', authroute);
app.use('/', usersroute);     
app.use('/', custroute);      
app.use('/', projectroute);   
app.use('/', dashboardroute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
