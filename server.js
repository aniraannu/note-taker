// Import Express.js
const express = require('express');
// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');
// Specify on which port the Express.js server will run
const PORT = 3001;
// Initialize an instance of Express.js
const app = express();
// Static middleware pointing to the public folder
app.use(express.static('public'));
// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);