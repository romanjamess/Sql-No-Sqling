const express = require("express"); //requiring express and pointing to db route
const db = require("./config/connection");
//returns the value of directory where we run the node process
const cwd = process.cwd();
//port
const PORT = process.env.PORT || 3001;
//initializing express
const app = express();

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
const activity = cwd.includes('01-Activities')
  ? cwd.split('/01-Activities/')[1]
  : cwd;

  app.use(express.urlencoded({ extended: true }));// express middleware
  app.use(express.json());
