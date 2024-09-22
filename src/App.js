import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import ContentPage from './ContentPage';
//import AnotherPrivatePage from './AnotherPrivatePage';  // Exemplo de outra rota privada
import { useState } from 'react';
import PrivateRoute from './PrivateRoute';  // Componente de rota privada
import Conteudo from './conteudo';
import M3UPlayerGloboplay from './Globoplay';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleLoginSuccess = () => {
    setIsRegistered(true);
  };

  return (
    <Router>
      <Routes>
        {/* Rota pública de login */}
        <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />

        {/* Rota privada para /content */}
        <Route
          path="/content"
          element={
            <PrivateRoute isRegistered={isRegistered}>
              <Conteudo />
            </PrivateRoute>
          }
        />

        {/* Outra rota privada */}
        <Route path="/Globo" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerGloboplay /></PrivateRoute>} />
        
      </Routes>
    </Router>
  );
}

export default App;