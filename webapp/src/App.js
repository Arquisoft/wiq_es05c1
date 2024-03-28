import React from 'react';
import { Route, Routes } from "react-router";
import { ChakraProvider, theme } from '@chakra-ui/react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import Menu from './components/GameMenu';
import Game from './components/Game';

function App() {
  const config = {}; // Definir tu configuración
  const swapConfig = () => {}; // Definir la función para cambiar la configuración
  const auth = {}; // Definir tu autenticación
  // <Route path="*" element={<Error />} />

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<AddUser />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;