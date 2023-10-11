const usersroute = require('./users/usersroutes');
const custroute = require('./customers/custroutes');
const projectroute = require('./projects/projectroutes');
const dashboardroute = require('./dashbaord/dashboardroutes');
const {app,db} = require('./dbConfig');

const PORT = 3000;

app.get('/', (req, res) => {
    return res.json("from backend");
  });


// check any repeating calls 
  // app.use((req, res, next) => {
  //   const timestamp = new Date().toISOString();
  //   console.log(`${timestamp} - API Request: ${req.method} ${req.url}`);
  //   console.log(`Headers: ${JSON.stringify(req.headers)}`);
  //   console.log(`Parameters: ${JSON.stringify(req.query)}`);
  
  //   next();
  // });
  

// users table
app.use('/', usersroute);

//Customer
app.use('/', custroute);

//project
app.use('/', projectroute);

//dashboard
app.use('/', dashboardroute);


app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
