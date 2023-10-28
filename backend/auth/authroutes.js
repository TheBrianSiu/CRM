const express = require("express");
const router = express.Router();
const axios = require('axios');


//change password
router.put("/changepassword/:email", async (req, res) => {
    try {
        const userEmail = req.params.email;
      const options = {
        method: 'POST',
        url: 'https://dev-8dixmhiwz587kgpl.us.auth0.com/dbconnections/change_password',
        headers: {'content-type': 'application/json'},
        data: {
          client_id: '15lDMYMAdGAyqLxUhX5tPjWaLJAI2y1q',
          email: userEmail,
          connection: 'Username-Password-Authentication'
        }
      };
      const response = await axios.request(options);
      console.log(response.data);
      res.status(200).json({ message: 'Password change request sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while changing the password' });
    }
  });

  module.exports = router;