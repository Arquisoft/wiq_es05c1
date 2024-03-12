import React, { useState } from 'react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


import Game from './components/Game';
import History from './components/History';
import { ChakraProvider } from '@chakra-ui/react';


function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showGame, setShowGame] = useState(false); // Nuevo estado para controlar si se muestra el juego
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true); // Estado para controlar la visibilidad del mensaje de bienvenida y los enlaces
  const [showHistory, setShowHistory] = useState(false); // Estado para controlar el visionado del historial
  const [userName, setUserName] = useState(''); //Tratar con el nombre de usuario


  const handleToggleView = () => {
    setShowLogin(!showLogin);
    setShowWelcomeMessage(true);
  };

  // Función para activar el juego y ocultar el resto de la interfaz
  const startGame = () => {
    setShowLogin(false);
    setShowGame(true);
    setShowWelcomeMessage(false);
    setShowHistory(false);
  };

  // Función para mostrar el historial
  const mostrarHistorial = (username) => {
    setShowLogin(false);
    setShowGame(false);
    setShowWelcomeMessage(false);
    setShowHistory(true);
    setUserName(username);
  }
 
  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CssBaseline />
      {/* Mostrar el mensaje de bienvenida y los enlaces solo si showWelcomeMessage es true */}
      {showWelcomeMessage && (
        <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
          Welcome to the 2024 edition of the Software Architecture course
          <Typography component="div" align="center" sx={{ marginTop: 2 }}>
            {showLogin ? (
              <Link name="gotoregister" component="button" variant="body2" onClick={handleToggleView}>
                Don't have an account? Register here.
              </Link>
            ) : (
              <Link component="button" variant="body2" onClick={handleToggleView}>
                Already have an account? Login here.
              </Link>
            )}
          </Typography>
        </Typography>
      )}

      {showLogin && <Login startGame={startGame} mostrarHistorial={mostrarHistorial} />}
      {!showLogin && !showGame && !showHistory && <AddUser />}
      {showGame && (
        <ChakraProvider>
          <Game />
        </ChakraProvider>
      )}
      {showHistory && (
        <ChakraProvider>
          <History userName={userName}/>
        </ChakraProvider>
      )}
    </Container>
  );
  
}

export default App;
