const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Model = require('./question-model')

const Question = require("./obtenerPreguntasBaseDatos");
const question = new Question();

const NewQuestion = require("./questionGeneration");
const newquestion = new NewQuestion();

const app = express();
const port = 8003; 

// Middleware to parse JSON in request body
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questionsdb';
mongoose.connect(mongoUri);

app.get('/getQuestion', async(req,res)=> {
  try{  
    //coger pregunta bd
    const questions = await question.obtenerPregunta();
    //para devolver la pregunta
    res.json(questions);
    
  } catch(error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
    
});

app.get('/generateQuestions', async(req,res)=> {
    try{  
      console.log("Generando preguntas en el question-service");  
      const instancia =  newquestion.ejecutarOperaciones();
      console.log(`Ejecutado correctamente`);
     
    } catch(error) {
      res.status(error.response.status).json({ error: error.response.data.error });
    }
      
  });

// Start the server
const server = app.listen(port, () => {
  console.log(`Generate Service listening at http://localhost:${port}`);
});

server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server
