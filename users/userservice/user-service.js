// user-service.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./user-model')
const repository = require('./repository/repository')

const app = express();
const port = 8001;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';

repository.init(mongoose, mongoUri);

const middleware = require('./middleware/middleware')
app.use("/adduser", middleware)
require('./rutas/rutas')(app, repository)
repository.addUser("admin", "admin");

const server = app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});

module.exports = server