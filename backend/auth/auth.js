const axios = require("axios");
const cache = {};


//retreive token
async function retrieveToken() {
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

// retrieve user permission
async function retreieve_user_permission(userid, permission) {
  try {
    const cacheKey = `${userid}_${permission}`;
    const accessToken = await retrieveToken();
    const apiEndpoint = `${process.env.AUTH0DOMAIN}/api/v2/users/${userid}/permissions`;
    let apiResponse;

    if (
      cache[cacheKey] &&
      cache[cacheKey].timestamp + parseInt(process.env.CACHE_EXPIRATION_TIME) >
        Date.now()
    ) {
      return cache[cacheKey].data;
    } else {
      apiResponse = await axios.get(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    const permissions = apiResponse.data;
    const permissionToCheck = permission;
    const hasPermission = permissions.some(
      (permission) => permission.permission_name === permissionToCheck
    );

    cache[cacheKey] = {
      data: hasPermission,
      timestamp: Date.now(),
    };

    return hasPermission;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

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
        console.log(
          "User created successfully && User ID:",
          response.data.user_id
        );
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
    };

    const apiResponse = await axios.patch(apiEndpoint, userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (apiResponse.status === 200) {
      return true;
    } else {
      throw new Error(
        `Auth0 user deletion failed with status code ${apiResponse.status}`
      );
    }
  } catch (error) {
    throw new Error(`Error deleting Auth0 user: ${error.message}`);
  }
};

module.exports = {
  retrieveToken,
  retreieve_user_permission,
  insertAuth0User,
  deleteAuthUser,
};
