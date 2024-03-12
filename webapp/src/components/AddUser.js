// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Text, Input, Button, FormControl, FormLabel, Alert } from '@chakra-ui/react';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const AddUser = () => {
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
    <Box minH="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={10} bgGradient="linear(to-t, #08313A, #107869)">
      <Text as="h1" variant="h5" textAlign ="center" marginBottom={4}>
        Create account
      </Text>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          name="username"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormLabel>Repeat Password</FormLabel>
        <Input
          name="repeat password"
          margin="normal"
          type="password"
          value={repPassword}
          onChange={(e) => setRepPassword(e.target.value)}
        />
      </FormControl>
      <Button variant="contained" colorScheme="blue" onClick={addUser} textAlign="center">
        Register user
      </Button>
      {openSnackbar && (
        <Alert status="success" marginTop={2} onClose={handleCloseSnackbar}>
          User added successfully
        </Alert>
      )}
      {/* Alerta para errores */}
      {error && (
        <Alert status="error" marginTop={2} onClose={() => setError('')}>
          Error: {error}
        </Alert>
      )}
    </Box>
  );
};

export default AddUser;
