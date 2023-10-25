const axios = require('axios');
const { db } = require("../dbConfig");

async function retrieveAuth0Users() {
  try {
    const auth0ApiUrl = `${process.env.AUTH0DOMAIN}/oauth/token`;

    // Request an access token using the client credentials grant flow
    const response = await axios.post(auth0ApiUrl, {
      audience: `${process.env.audience}`,
      grant_type: 'client_credentials',
      client_id: `${process.env.clientId}`,
      client_secret: `${process.env.clientSecret}`,
    });

    const accessToken = response.data.access_token;

    const apiEndpoint = `${process.env.AUTH0DOMAIN}/api/v2/users`;
    const apiResponse = await axios.get(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return apiResponse.data;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}


//Auth0
const auth_user_update = async (USER_ID, EMAIL) => {
  const sql = "INSERT INTO USERS (USER_ID, EMAIL, status) VALUES (?, ?, 'active')";
  try {
    await db.query(sql, [USER_ID, EMAIL]);
    console.log("Data successfully inserted into USERS table");
  } catch (error) {
    console.error("Error while inserting data into USERS table:", error);
  }
};

const retrieve_user_id = async (res) => {
  const sql = "SELECT user_id FROM USERS WHERE IS_DELETED = 0";
  try {
    const data = await new Promise((resolve, reject) => {
      db.query(sql, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    return data
  } catch (error) {
    console.log("Error while retrieving user data", error);
    res.status(500).json({ error: "Error while retrieving user data" });
  }
};


const retrieve_and_insert_newuser = async () => {
  const user_set = new Set();
  try {
    const user_data = await retrieve_user_id();
    const auth_user_data = await retrieveAuth0Users(); 

    user_data.forEach(user => {
      user_set.add(user.user_id);
    });

    auth_user_data.forEach(user => {
      if (!user_set.has(user.user_id)) {
        auth_user_update(user.user_id, user.name);
      }
    });
  } catch (error) {
    console.error("Error in retrieve_and_insert_newuser:", error);
  }
};

module.exports = {
  retrieve_and_insert_newuser
};