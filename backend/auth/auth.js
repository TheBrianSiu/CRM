const axios = require("axios");
const { db } = require("../dbConfig");


//retreive token
async function retrieveToken(){
  try {
    const auth0ApiUrl = `${process.env.AUTH0DOMAIN}/oauth/token`;

    // Request an access token using the client credentials grant flow
    const response = await axios.post(auth0ApiUrl, {
      audience: `${process.env.AUDIENCE}`,
      grant_type: "client_credentials",
      client_id: `${process.env.CLIENTID}`,
      client_secret: `${process.env.CLIENTSECRET}`,
    });

    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

// retrieve users
async function retrieveAuth0Users() {
  try {
    const accessToken = await retrieveToken();

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
const auth_user_update = async (USER_ID, EMAIL, USERNAME) => {
  const sql =
    "INSERT INTO USERS (USER_ID, EMAIL, USERNAME, FIRST_NAME, LAST_NAME, status) VALUES (?, ?, ?, 'N/A','N/A', 'active')";
  try {
    await db.query(sql, [USER_ID, EMAIL, USERNAME]);
    console.log("Data successfully inserted into USERS table");
  } catch (error) {
    console.error("Error while inserting data into USERS table:", error);
  }
};

const retrieve_user_id = async (res) => {
  const sql = "SELECT user_id FROM USERS";
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
    return data;
  } catch (error) {
    console.log("Error while retrieving user data", error);
    res.status(500).json({ error: "Error while retrieving user data" });
  }
};
//insert user from auth0
const retrieve_and_insert_newuser = async () => {
  const user_set = new Set();
  try {
    const user_data = await retrieve_user_id();
    const auth_user_data = await retrieveAuth0Users();

    user_data.forEach((user) => {
      user_set.add(user.user_id);
    });

    auth_user_data.forEach((user) => {
      if (!user_set.has(user.user_id)) {
        auth_user_update(user.user_id, user.name, user.nickname);
      }
    });
  } catch (error) {
    console.error("Error in retrieve_and_insert_newuser:", error);
  }
};

//insert
const insertAuth0User = async (email, hashedPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = await retrieveToken();
      const apiUrl = `${process.env.AUTH0DOMAIN}/api/v2/users`;

      const userData = {
        connection: "Username-Password-Authentication",
        email: email,
        password: hashedPassword,
      };

      const response = await axios.post(apiUrl, userData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        console.log("User created successfully && User ID:", response.data.user_id);
        const id = response.data.user_id;
        resolve(id);
      } else {
        console.error("User creation failed. Response:", response.data);
        reject(new Error("User creation failed")); 
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      reject(error); 
    }
  });
};

//delete
const deleteAuthUser = async (id) => {
  try {
    const accessToken = await retrieveToken();
    const apiEndpoint = `${process.env.AUTH0DOMAIN}/api/v2/users/${id}`;

    const userData = {
      blocked: true,
    }
    
    const apiResponse = await axios.patch(apiEndpoint, userData,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (apiResponse.status === 200) {
      return true;
    } else {
      throw new Error(`Auth0 user deletion failed with status code ${apiResponse.status}`);
    }
  } catch (error) {
    throw new Error(`Error deleting Auth0 user: ${error.message}`);
  }
};


module.exports = {
  retrieve_and_insert_newuser,
  insertAuth0User,
  deleteAuthUser,
};
