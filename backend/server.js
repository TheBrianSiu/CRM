const usersRoute = require('./users/UsersRoutes');
const custRoute = require('./customers/CustRoutes');
const projectRoute = require('./projects/ProjectRoutes');
const {db,app} = require('./dbConfig');

app.get('/', (req, res) => {
    return res.json("from backend");
  });

// users table
app.use('/', usersRoute);

//Customer
app.use('/', custRoute);

//project
app.use('/', projectRoute);


app.listen(8080),(()=> {
    console.log("listening");
})

