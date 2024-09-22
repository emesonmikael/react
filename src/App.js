import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import ContentPage from './ContentPage';  // Página de conteúdo (rota privada)

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route 
          path="/content" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ContentPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;