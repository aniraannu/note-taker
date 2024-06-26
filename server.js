// Import Express.js
const express = require('express');
// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');
// Specify on which port the Express.js server will run
const PORT = 3001;
// Initialize an instance of Express.js
const app = express();
//
const api = require("./routes/index.js");
// Static middleware pointing to the public folder
app.use(express.static('public'));

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//API Routes
app.use("/api", api);
//HTML Routes
app.get('/', (req, res) =>
	res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get("/notes", (req, res) =>
	res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
	res.sendFile(path.join(__dirname, '/public/index.html'))
);
// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);