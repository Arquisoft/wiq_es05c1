//gateway-service.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const promBundle = require('express-prom-bundle');

const app = express();
const port = 8000;

const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:8002';
const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:8001';
const questionServiceUrl = process.env.QUESTION_SERVICE_URL || 'http://localhost:8003';
const historyServiceUrl = process.env.HISTORY_SERVICE_URL || 'http://localhost:8004';

app.use(cors());
app.use(express.json());

//Prometheus configuration
const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});

app.post('/login', async (req, res) => {
  try {
    // Forward the login request to the authentication service
    const authResponse = await axios.post(authServiceUrl+'/login', req.body);
    res.json(authResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.post('/adduser', async (req, res) => {
  try {
    // Forward the add user request to the user service
    const userResponse = await axios.post(userServiceUrl+'/adduser', req.body);
    res.json(userResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/getQuestion', async (req, res) => {
  try {
    // llamamos al servicio de preguntas
    const questionResponse = await axios.get(questionServiceUrl+'/getQuestion', req.body);
    
    res.json(questionResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/generateQuestions', async (req, res) => {
  try {
    // llamamos al servicio de preguntas
    await axios.get(questionServiceUrl+'/generateQuestions', req.body);
    
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/correct/:username', async (req, res) => {
  try {
    // llamamos al servicio de preguntas
    const historyResponse = await axios.get(historyServiceUrl+`/correct/${req.params.username}`, req.body);
    res.json(historyResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/failed/:username', async (req, res) => {
  try {
    // llamamos al servicio de preguntas
    const historyResponse = await axios.get(historyServiceUrl+`/failed/${req.params.username}`, req.body);
    res.json(historyResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/games/:username', async (req, res) => {
  try {
    // llamamos al servicio de preguntas
    const historyResponse = await axios.get(historyServiceUrl+`/games/${req.params.username}`, req.body);
    res.json(historyResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.post('/addhistory', async (req, res) => {
  try {
    // Forward the add user request to the user service
    const historyResponse = await axios.post(historyServiceUrl+'/addhistory', req.body);
    res.json(historyResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});



// Start the gateway service
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});

module.exports = server
