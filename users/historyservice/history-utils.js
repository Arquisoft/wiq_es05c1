const axios = require('axios');

class HistoryUtils {
  constructor(baseUrl) {
    this.baseUrl = baseUrl; // http://localhost:8004/historydb/history
  }

  // incrementar respuestas correctas en 1
  async incrementCorrectAnswers(username) {
    try {
      await axios.patch(`${this.baseUrl}/correct/${username}`);
      console.log(`Se ha incrementado el número de preguntas correctas para ${username}`);
    } catch (error) {
      console.error('Error al incrementar el número de preguntas correctas:', error);
    }
  } 

  // incrementar respuestas incorrectas en 1
  async incrementFailedAnswers(username) {
    try {
      await axios.patch(`${this.baseUrl}/failed/${username}`);
      console.log(`Se ha incrementado el número de preguntas fallidas para ${username}`);
    } catch (error) {
      console.error('Error al incrementar el número de preguntas fallidas:', error);
    }
  }

  // incrementar número total de partidas jugadas en 1
  async incrementTotalGames(username) {
    try {
      await axios.patch(`${this.baseUrl}/games/${username}`);
      console.log(`Se ha incrementado el número total de partidas jugadas para ${username}`);
    } catch (error) {
      console.error('Error al incrementar el número total de partidas jugadas:', error);
    }
  }

  // obtener el número de preguntas acertadas de un usuario
  async getCorrectAnswers(username) {
    try {
      const response = await axios.get(`${this.baseUrl}/correct/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching correct answers:', error);
      throw error;
    }
  }

  // obtener el número de preguntas fallidas de un usuario
  async getFailedAnswers(username) {
    try {
      const response = await axios.get(`${this.baseUrl}/failed/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching failed answers:', error);
      throw error;
    }
  }

  // obtener el número de partidas jugadas de un usuario
  async getTotalGames(username) {
    try {
      const response = await axios.get(`${this.baseUrl}/games/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching total games:', error);
      throw error;
    }
  }
}

module.exports = HistoryUtils;
