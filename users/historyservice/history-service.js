// history-service.js

const express = require('express');
const mongoose = require('mongoose');
const History = require('./history-model');

const app = express();
const port = 8004;

// Middleware to parse JSON in request body
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/historydb';
mongoose.connect(mongoUri);

// Route to increment correct answers for a user
app.patch('/history/correct/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Increment total_correct_answers for the specified user
    await History.findOneAndUpdate({ username }, { $inc: { total_correct_answers: 1 } });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to increment failed answers for a user
app.patch('/history/failed/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Increment total_failed_answers for the specified user
    await History.findOneAndUpdate({ username }, { $inc: { total_failed_answers: 1 } });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to increment total games for a user
app.patch('/history/games/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Increment total_games for the specified user
    await History.findOneAndUpdate({ username }, { $inc: { total_games: 1 } });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get correct answers for a user
app.get('/history/correct/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const history = await History.findOne({ username });
    res.json({ correctAnswers: history ? history.total_correct_answers : 0 });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get failed answers for a user
app.get('/history/failed/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const history = await History.findOne({ username });
    res.json({ failedAnswers: history ? history.total_failed_answers : 0 });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get total games for a user
app.get('/history/games/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const history = await History.findOne({ username });
    res.json({ totalGames: history ? history.total_games : 0 });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const server = app.listen(port, () => {
  console.log(`History Service listening at http://localhost:${port}`);
});

server.on('close', () => {
  // Close the Mongoose connection
  mongoose.connection.close();
});

module.exports = server;
