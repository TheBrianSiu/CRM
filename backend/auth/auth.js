const express = require('express');
const router = express.Router();
const { db } = require('../dbConfig');
var request = require("request");


var options = { method: 'GET',
  url: 'https://dev-8dixmhiwz587kgpl.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"bFeSJqETMT1AZ5BZ9MmNaUGs9Mw9S34U","client_secret":"3TqM7qVIxynaeKff_PhxMdpXIX-avlpV2lGvEBP2u1T25_ZQ7rjxXLefQN6bGXE3","audience":"https://dev-8dixmhiwz587kgpl.us.auth0.com/api/v2/","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});