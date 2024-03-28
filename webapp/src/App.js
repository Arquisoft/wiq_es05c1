import React, { useState } from 'react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


import Game from './components/Game';
import { ChakraProvider } from '@chakra-ui/react';


function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showGame, setShowGame] = useState(false); // Nuevo estado para controlar si se muestra el juego
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true); // Estado para controlar la visibilidad del mensaje de bienvenida y los enlaces
  const [showAddUser, setShowAddUser] = useState(false);

  // Función para activar el juego y ocultar el resto de la interfaz
  const startGame = () => {
    setShowLogin(false);
    setShowGame(true);
    setShowWelcomeMessage(false);
    setShowAddUser(false);
  };

  const showAddUserForm = () => {
    setShowLogin(false);
    setShowAddUser(true);
    setShowWelcomeMessage(false);
  };

  const showLoginForm = () => {
    setShowLogin(true);
    setShowAddUser(false);
    setShowWelcomeMessage(false);
  };
 
  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CssBaseline />

    {showLogin && (
      <ChakraProvider>
        <Login startGame={startGame} showAddUserForm={showAddUserForm}/>
      </ChakraProvider>
    )}

    {!showLogin && !showGame && (
      <ChakraProvider>
        <AddUser showLoginForm={showLoginForm} />
      </ChakraProvider>
    )}

      {showGame && (
        <ChakraProvider>
          <Game />
        </ChakraProvider>
      )}
    </Container>
  );

}

export default App;