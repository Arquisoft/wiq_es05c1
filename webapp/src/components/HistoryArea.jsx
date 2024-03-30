// HistoryArea.jsx

import React, { useEffect, useState } from 'react';
import { Box, Center, Text } from "@chakra-ui/react";
import axios from 'axios';

export function HistoryArea({ userName }) {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [failedAnswers, setFailedAnswers] = useState(0);
  const [totalGames, setTotalGames] = useState(0);

  useEffect(() => {
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

    const fetchHistoryData = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}/correct/${userName}`);
        console.log(response.data);
        const correctAnswers = response.data;
        setCorrectAnswers(correctAnswers);

        response = await axios.get(`${apiEndpoint}/failed/${userName}`);
        const failedAnswers = response.data;
        setFailedAnswers(failedAnswers);

        response = await axios.get(`${apiEndpoint}/games/${userName}`);
        const playedGames = response.data;
        setTotalGames(playedGames);
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    };

    fetchHistoryData();
  }, [userName]);

  return (
    <Center h="100vh" bgGradient="linear(to-t, #08313A, #107869)">
      <Box p="4" maxW="md" borderWidth="1px" borderRadius="lg" bg="white" boxShadow="lg">
        <Text fontSize="xl" mb="4">Historial de {userName}</Text>
        <Box bg="teal.100" p="4" mb="4" borderRadius="lg">
          <Text fontSize="2xl">Respuestas Correctas</Text>
          <Text fontSize="4xl">{correctAnswers}</Text>
        </Box>
        <Box bg="red.100" p="4" mb="4" borderRadius="lg">
          <Text fontSize="2xl">Respuestas Fallidas</Text>
          <Text fontSize="4xl">{failedAnswers}</Text>
        </Box>
        <Box bg="blue.100" p="4" borderRadius="lg">
          <Text fontSize="2xl">Partidas Jugadas</Text>
          <Text fontSize="4xl">{totalGames}</Text>
        </Box>
      </Box>
    </Center>
  );
}
