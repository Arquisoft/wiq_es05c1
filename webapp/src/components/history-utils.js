const axios = require('axios');

// Incrementar respuestas correctas en 1
async function incrementCorrectAnswers(baseUrl, username) {
  try {
    await axios.patch(`${baseUrl}/correct/${username}`);
    console.log(`Se ha incrementado el número de preguntas correctas para ${username}`);
  } catch (error) {
    console.error('Error al incrementar el número de preguntas correctas:', error);
  }
}

// Incrementar respuestas incorrectas en 1
async function incrementFailedAnswers(baseUrl, username) {
  try {
    await axios.patch(`${baseUrl}/failed/${username}`);
    console.log(`Se ha incrementado el número de preguntas fallidas para ${username}`);
  } catch (error) {
    console.error('Error al incrementar el número de preguntas fallidas:', error);
  }
}

// Incrementar número total de partidas jugadas en 1
async function incrementTotalGames(baseUrl, username) {
  try {
    await axios.patch(`${baseUrl}/games/${username}`);
    console.log(`Se ha incrementado el número total de partidas jugadas para ${username}`);
  } catch (error) {
    console.error('Error al incrementar el número total de partidas jugadas:', error);
  }
}

// Obtener el número de preguntas acertadas de un usuario
async function getCorrectAnswers(baseUrl, username) {
  try {
    const response = await axios.get(`${baseUrl}/correct/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching correct answers:', error);
    throw error;
  }
}

// Obtener el número de preguntas fallidas de un usuario
async function getFailedAnswers(baseUrl, username) {
  try {
    const response = await axios.get(`${baseUrl}/failed/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching failed answers:', error);
    throw error;
  }
}

// Obtener el número de partidas jugadas de un usuario
async function getTotalGames(baseUrl, username) {
  try {
    const response = await axios.get(`${baseUrl}/games/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching total games:', error);
    throw error;
  }
}

module.exports = {
  incrementCorrectAnswers,
  incrementFailedAnswers,
  incrementTotalGames,
  getCorrectAnswers,
  getFailedAnswers,
  getTotalGames
};
