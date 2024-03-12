// HistoryArea.jsx

import React, { useEffect, useState } from 'react';
import { Box, Center, Text } from "@chakra-ui/react";
import { HistoryUtils } from 'wiq_es05c/users/historyservice/history-utils';

function HistoryArea({ userName }) {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [failedAnswers, setFailedAnswers] = useState(0);
  const [totalGames, setTotalGames] = useState(0);

  useEffect(() => {
    const baseUrl = 'http://localhost:8004/historydb/history';

    const fetchHistoryData = async () => {
      try {
        const correctAnswers = await getCorrectAnswers(baseUrl, userName);
        setCorrectAnswers(correctAnswers);

        const failedAnswers = await getFailedAnswers(baseUrl, userName);
        setFailedAnswers(failedAnswers);

        const totalGames = await getTotalGames(baseUrl, userName);
        setTotalGames(totalGames);
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

export default HistoryArea;
