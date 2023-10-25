const usersroute = require('./users/usersroutes');
const custroute = require('./customers/custroutes');
const projectroute = require('./projects/projectroutes');
const dashboardroute = require('./dashbaord/dashboardroutes');
const { app, db } = require('./dbConfig');
const { retrieve_and_insert_newuser } = require('./auth/auth');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  return res.json("from backend");
});

// Schedule periodic task to retrieve and insert new users
setInterval(retrieve_and_insert_newuser, 6000);

// Logging middleware (if needed)
// app.use((req, res, next) => {
//   const timestamp = new Date().toISOString();
//   console.log(`${timestamp} - API Request: ${req.method} ${req.url}`);
//   console.log(`Headers: ${JSON.stringify(req.headers)}`);
//   console.log(`Parameters: ${JSON.stringify(req.query)}`);
//   next();
// });

// Define routes
app.use('/', usersroute);      // Users table routes
app.use('/', custroute);      // Customer routes
app.use('/', projectroute);   // Project routes
app.use('/', dashboardroute);  // Dashboard routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
