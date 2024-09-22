import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import ContentPage from './ContentPage';
import AnotherPrivatePage from './AnotherPrivatePage';  // Exemplo de outra rota privada
import { useState } from 'react';
import PrivateRoute from './PrivateRoute';  // Componente de rota privada

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
              <ContentPage />
            </PrivateRoute>
          }
        />

        {/* Outra rota privada */}
        <Route
          path="/another-private"
          element={
            <PrivateRoute isRegistered={isRegistered}>
              <AnotherPrivatePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;