> Mor:
// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Home from './Home';
import Dashboard from './Dashboard';

const App = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(user ? 'dashboard' : 'home');

  return (
    <AuthProvider>
      <Router>
        {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === 'dashboard' && <Dashboard setCurrentPage={setCurrentPage} />}
      </Router>
    </AuthProvider>
  );
};

export default App;
