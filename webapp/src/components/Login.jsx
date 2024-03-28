import React, { useState } from 'react';
import axios from 'axios';
import { Box, Center, Text, Input, Button, FormControl, FormLabel, Alert, Link } from '@chakra-ui/react';

const apiEndpoint = process.env.REACT_APP_API_URI || 'http://localhost:8000';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const loginUser = async () => {
    try {
      const response = await axios.post(`${apiEndpoint}/login`, { username, password });

      // Extraer datos de la respuesta
      const { createdAt: userCreatedAt } = response.data;

      setCreatedAt(userCreatedAt);
      setLoginSuccess(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Center h="100vh" w="100vw" alignItems="center" bgGradient="linear(to-t, #08313A, #107869)">
      <Box p="6" bg="white" rounded="md" boxShadow="md" justifyContent="center">
        <Text as="h1" fontSize="3xl" fontWeight="bold" mb="4" textAlign="center" color="#107869">
          Login
        </Text>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          mt="4"
          colorScheme="teal"
          variant="solid"
          onClick={loginUser}
          size="lg"
          width="100%"
          _hover={{ bg: '#107869' }}
        >
          Login
        </Button>
        {error && (
          <Alert status="error" mt="4" borderRadius="md" onClose={() => setError('')}>
            Error: {error}
          </Alert>
        )}
        <Button
          mt="4"
          colorScheme="teal"
          variant="solid"
          size="lg"
          width="100%"
          _hover={{ bg: '#107869' }}
        >
          Start the game
        </Button>
        <Link
          to = "/register"
          name="gotoregister"
          component="button"
          variant="body2"
          sx={{
            textDecoration: 'underline',
            cursor: 'pointer',
            color: 'blue',
            '&:hover': {
              color: 'darkblue',
            },
          }}
        >
          Don't have an account? Register here.
        </Link>

      </Box>
    </Center>
  );
};

export default Login;