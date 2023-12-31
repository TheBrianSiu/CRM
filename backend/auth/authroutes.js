const express = require("express");
const router = express.Router();
const axios = require("axios");
const { retrieveToken, retreieve_user_permission } = require("./auth");

//change password
router.put("/changepassword/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;
    const apiEndpoint = `${process.env.AUTH0DOMAIN}/dbconnections/change_password`;

    const apiResponse = await axios.request(apiEndpoint, {
      headers: {
        client_id: process.env.CRMCLIENTID,
        email: userEmail,
        connection: "Username-Password-Authentication",
      },
    });

    res.status(200).json(apiResponse.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while changing the password" });
  }
});

// user role check
router.get("/userrolesrequest/:userid", async (req, res) => {
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
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while locating user roles" });
  }
});

//check permission
router.get("/userpermission", async (req, res) => {
  const userid = req.query.userid;
  const permission = req.query.permission;

  if (!permission) {
    return res.json(true);
  } else {
    const hasPermission = await retreieve_user_permission(userid, permission);
    if (hasPermission) {
      return res.json(true);
    } else {
      return res.json(false);
    }
  }
});

//retrieve roles options
router.get("/rolesoptions", async (req, res) => {
  try {
    const accessToken = await retrieveToken();

    const apiEndpoint = `${process.env.AUTH0DOMAIN}/api/v2/roles`;

    const apiResponse = await axios.get(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.status(200).json(apiResponse.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "An error occurred while locating roles" });
  }
});

module.exports = router;
