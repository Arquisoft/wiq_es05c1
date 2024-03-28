// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Center, Text, Input, Button, FormControl, FormLabel, Alert, Link } from '@chakra-ui/react';
import { QuestionArea } from './QuestionArea';

const apiEndpoint = process.env.REACT_APP_API_URI || 'http://localhost:8000';

const AddUser = ({showLoginForm}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const addUser = async () => {
    try {
      if(password.length < 6){
        setError("Password must have at least 6 characters");
        return;
      }
      if(password !== repPassword){
        setError("Passwords don't match");
        return;
      }

      await axios.post(`${apiEndpoint}/adduser`, { username, password });
      setOpenSnackbar(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
      } else {
          setError("An unexpected error occurred");
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Center h="100vh" w="100vw" bgGradient="linear(to-t, #08313A, #107869)">
      <Box p="6" w="100%" maxW="md" bg="white" rounded="md" boxShadow="md">
        <Text as="h1" fontSize="3xl" fontWeight="bold" mb="4" textAlign="center" color="#107869">
          Create Account
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
          <FormLabel>Repeat Password</FormLabel>
          <Input
            name="repeat password"
            type="password"
            value={repPassword}
            onChange={(e) => setRepPassword(e.target.value)}
          />
        </FormControl>
        <Button
          mt="4"
          colorScheme="teal"
          variant="solid"
          onClick={addUser}
          size="lg"
          width="100%"
          _hover={{ bg: '#107869' }}
        >
          Add User
        </Button>
        <Link
          name="gotologin"
          component="button"
          variant="body2"
          onClick={showLoginForm}
          sx={{
            textDecoration: 'underline',
            cursor: 'pointer',
            color: 'blue',
            '&:hover': {
              color: 'darkblue',
            },
          }}
        >
          Already have an account? Login here.
        </Link>
        {openSnackbar && (
          <Alert status="success" mt="4" borderRadius="md" onClose={handleCloseSnackbar}>
            User added successfully
          </Alert>
        )}
        {/* Error Alert */}
        {error && (
          <Alert status="error" mt="4" borderRadius="md" onClose={() => setError('')}>
            Error: {error}
          </Alert>
        )}
      </Box>
      </Center>
  );
};

export default AddUser;
