import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import ProtectedPage from "./ProtectedPage";
import LoginPage from "./LoginPage";
import M3UPlayer from './M3UPlayer';
import PlayerPage from './PlayerPage';
import Conteudo from './conteudo';

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
        localStorage.setItem("walletAddress", accounts[0]); // Salvar a conta no localStorage
      } catch (err) {
        console.error("Erro ao conectar a carteira", err);
      }
    } else {
      console.error("MetaMask não encontrada");
    }
  };

  // Função para desconectar a carteira
  const disconnectWallet = () => {
    setAccount(null);
    localStorage.removeItem("walletAddress"); // Remove a conta do localStorage
  };

  // Verificar se há uma conta salva no localStorage ao carregar o app
  useEffect(() => {
    const savedAccount = localStorage.getItem("walletAddress");
    if (savedAccount) {
      setAccount(savedAccount);
    }
  }, []);

  // Rota protegida reutilizável
  const PrivateRoute = ({ children }) => {
    return account ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div>
        <h1>Meu Projeto com Conexão de Carteira</h1>
        {account ? (
          <div>
            <p>Carteira conectada: {account}</p>
            <button onClick={disconnectWallet}>Desconectar</button>
          </div>
        ) : (
          <p>Não conectado</p>
        )}

        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Múltiplas páginas protegidas */}
          <Route
            path="/Conteudo"
            element={
              <PrivateRoute>
                <Conteudo />
              </PrivateRoute>
            }
          />
          <Route
            path="/netfli"
            element={
              <PrivateRoute>
                <M3UPlayer />
              </PrivateRoute>
            }
          />
          <Route path="/netfli/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage connectWallet={connectWallet} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;