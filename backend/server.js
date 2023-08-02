const usersroute = require('./users/usersroutes');
const custroute = require('./customers/custroutes');
const projectroute = require('./projects/projectroutes');
const {app,db} = require('./dbConfig');

app.get('/', (req, res) => {
    return res.json("from backend");
  });

// users table
app.use('/', usersroute);

//Customer
app.use('/', custroute);

//project
app.use('/', projectroute);


app.listen(8080),(()=> {
    console.log("listening");
})

