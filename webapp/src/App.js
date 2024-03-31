import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import Menu from './components/GameMenu';
import Game from './components/Game';
// import Record './components/Record';

const App = () => {
  const config = {}; // Definir tu configuración
  const swapConfig = () => {}; // Definir la función para cambiar la configuración
  const auth = {}; // Definir tu autenticación
  // <Route path="*" element={<Error />} />
  // <Route path="/record" element={<Record />} />

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<AddUser />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;