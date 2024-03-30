import axios from 'axios';

// Incrementar respuestas correctas en 1
export async function incrementCorrectAnswers(baseUrl, username) {
  try {
    await axios.patch(`${baseUrl}/correctinc/${username}`);
    console.log(`Se ha incrementado el número de preguntas correctas para ${username}`);
  } catch (error) {
    console.error('Error al incrementar el número de preguntas correctas:', error);
  }
}

// Incrementar respuestas incorrectas en 1
export async function incrementFailedAnswers(baseUrl, username) {
  try {
    await axios.patch(`${baseUrl}/failedinc/${username}`);
    console.log(`Se ha incrementado el número de preguntas fallidas para ${username}`);
  } catch (error) {
    console.error('Error al incrementar el número de preguntas fallidas:', error);
  }
}

// Incrementar número total de partidas jugadas en 1
export async function incrementTotalGames(baseUrl, username) {
  try {
    await axios.patch(`${baseUrl}/gamesinc/${username}`);
    console.log(`Se ha incrementado el número total de partidas jugadas para ${username}`);
  } catch (error) {
    console.error('Error al incrementar el número total de partidas jugadas:', error);
  }
}

// Obtener el número de preguntas acertadas de un usuario
export async function getCorrectAnswers(baseUrl, username) {
  try {
    const response = await axios.get(`${baseUrl}/correct/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching correct answers:', error);
    throw error;
  }
}

// Obtener el número de preguntas fallidas de un usuario
export async function getFailedAnswers(baseUrl, username) {
  try {
    const response = await axios.get(`${baseUrl}/failed/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching failed answers:', error);
    throw error;
  }
}

// Obtener el número de partidas jugadas de un usuario
export async function getTotalGames(baseUrl, username) {
  try {
    const response = await axios.get(`${baseUrl}/games/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching total games:', error);
    throw error;
  }
}

