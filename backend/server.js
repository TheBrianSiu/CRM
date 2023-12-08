const usersroute = require('./users/usersroutes');
const custroute = require('./customers/custroutes');
const projectroute = require('./projects/projectroutes');
const dashboardroute = require('./dashbaord/dashboardroutes');
const authroute = require('./auth/authroutes')
const cors = require('cors');
const jwt = require('jsonwebtoken')
const { app } = require('./dbConfig');
const { retrieve_and_insert_newuser, retreiveLoginRecord} = require('./auth/auth');
const express = require('express');

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: function (origin, callback) {
      if (process.env.ALLOWEDORIGINS.includes(origin)) {
          callback(null, true);
      } 
      else if(!origin){
        callback(new Error('Its origin is undisclosed, and access is prohibited.'))
      } 
      else {
          callback(new Error('Not allowed by CORS'));
      }
  },
};

//JWT token generation
app.post('/generate-token', (req, res) => {
  const clientID = req.body.clientID; 
  const clientSecret = req.body.clientSecret; 

  if (clientID === process.env.SERVERID && clientSecret === process.env.SERVERSECRET) {

    const payload = {
      user_id: 65748, 
      role: 'frontend_user', 
      exp: Math.floor(Date.now() / 1000) + 86400,
    };

    const token = jwt.sign(payload, process.env.SECRETKEY);

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Unauthorized client' });
  }
});


//JWT token verfication
app.use(express.json());

app.use((req, res,next)=>{

  const token = req.header('Authorization');

  if (req.path === '/generate-token') {
    return next();
  }

  if(!token){
    res.status(401).json({message: 'Authentication required'})
  }

  jwt.verify(token, process.env.SECRETKEY, (err, user) =>{

    if(err){
      return res.status(403).json({message: "Invalid token"})
    }
    req.user = user;
    next();
  })

})

app.get('/', (req, res) => {
  return res.json("from backend");
});

// Schedule periodic task
setInterval(retrieve_and_insert_newuser, 60000); // every min
setInterval(retreiveLoginRecord,900000); // every 15 mins


// Define routes
app.use('/', cors(corsOptions), authroute);
app.use('/', cors(corsOptions), usersroute);     
app.use('/', cors(corsOptions), custroute);      
app.use('/', cors(corsOptions), projectroute);   
app.use('/', cors(corsOptions), dashboardroute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Logging middleware (if needed)
// app.use((req, res, next) => {
//   const timestamp = new Date().toISOString();
//   console.log(`${timestamp} - API Request: ${req.method} ${req.url}`);
//   console.log(`Headers: ${JSON.stringify(req.headers)}`);
//   console.log(`Parameters: ${JSON.stringify(req.query)}`);
//   next();
// });