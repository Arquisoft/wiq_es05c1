// user-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const repository = require('./repository/repository')

const app = express();
const port = 8001;

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';

// Middleware to parse JSON in request body
app.use(bodyParser.json());

const middleware = require('./middleware/middleware')
app.use("/adduser", middleware)

repository.init(mongoose, mongoUri);
require('./rutas/rutas')(app, repository)

const server = app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});

module.exports = server