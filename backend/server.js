const usersroute = require('./users/usersroutes');
const custroute = require('./customers/custroutes');
const projectroute = require('./projects/projectroutes');
const dashboardroute = require('./dashbaord/dashboardroutes');
const {app,db} = require('./dbConfig');

const PORT = 3000;

app.get('/', (req, res) => {
    return res.json("from backend");
  });

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
