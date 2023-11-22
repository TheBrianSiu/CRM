const express = require("express");
const router = express.Router();
const axios = require('axios');
const { retrieveToken } = require("./auth");


//change password
router.put("/changepassword/:email", async (req, res) => {
    try {
      const userEmail = req.params.email;
      const apiEndpoint = `${process.env.AUTH0DOMAIN}/dbconnections/change_password`;
      
      const apiResponse = await axios.request(apiEndpoint, {
        headers: {
          client_id: process.env.CRMCLIENTID,
          email: userEmail,
          connection: 'Username-Password-Authentication',
        },
      });

      res.status(200).json(apiResponse.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while changing the password' });
    }
  });

  router.put("/userrolesrequest/:userid", async (req, res) => {
    try {
      const userId = req.params.userid;
      const accessToken = await retrieveToken();
      
      const apiEndpoint = `${process.env.AUTH0DOMAIN}/api/v2/users/${userId}/roles`;
      
      const apiResponse = await axios.get(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      res.status(200).json(apiResponse.data); 
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'An error occurred while locating user roles' }); 
    }
  });
  
  


  module.exports = router;