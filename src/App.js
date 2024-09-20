import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ethers } from "ethers";
import HomePage from "./HomePage";
import ProtectedPage from "./ProtectedPage";
import LoginPage from "./LoginPage";

function App() {
  const [account, setAccount] = useState(null);

  // Função para conectar a MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]); // Guardar a conta conectada
      } catch (err) {
        console.error("Erro ao conectar a carteira", err);
      }
    } else {
      console.error("MetaMask não encontrada");
    }
  };

  // Rota protegida
  const PrivateRoute = ({ children }) => {
    return account ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div>
        <h1>Meu Projeto com Conexão de Carteira</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <ProtectedPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage connectWallet={connectWallet} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;