import React from 'react';
import { Box, Center, Text, Button } from '@chakra-ui/react';

const MainMenu = () => {
  return (
    <Center h="100vh" w="100vw" bgGradient="linear(to-t, #08313A, #107869)">
      <Box p="6" w="100%" maxW="md" bg="white" rounded="md" boxShadow="md">
        <Text as="h1" fontSize="3xl" fontWeight="bold" mb="4" textAlign="center" color="#107869">
          Welcome to QuestionGuess!
        </Text>
        <Button
          mt="4"
          colorScheme="teal"
          variant="solid"
          onClick="/game"
          size="lg"
          width="100%"
          _hover={{ bg: '#107869' }}
        >
          Play New Game
        </Button>
        <Button
          to="/record"
          mt="4"
          colorScheme="teal"
          variant="solid"
          size="lg"
          width="100%"
          _hover={{ bg: '#107869' }}
        >
          View Record
        </Button>
      </Box>
      </Center>
  );
};

export default MainMenu;