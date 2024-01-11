const usersroute = require('./users/usersroutes');
const custroute = require('./customers/custroutes');
const projectroute = require('./projects/projectroutes');
const dashboardroute = require('./dashbaord/dashboardroutes');
const authroute = require('./auth/authroutes')
const cors = require('cors');
const { app } = require('./dbConfig');
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const authConfig = {
  domain: process.env.AUTH0DOMAIN,
  audience: process.env.AUDIENCE,
};

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

// Auth0 access token checker
const authCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${authConfig.domain}/.well-known/jwks.json`,
  }),
  audience: authConfig.audience,
  issuer: `${authConfig.domain}/`,
  algorithms: ['RS256'],
});

app.get('/', (res) => {
  return res.json("from backend");
});

// Define routes
app.use(authCheck);
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
