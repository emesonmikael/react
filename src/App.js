import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import ProtectedPage from "./ProtectedPage";
import LoginPage from "./LoginPage";
import M3UPlayer from './M3UPlayer';
import PlayerPage from './PlayerPage';
import Conteudo from './conteudo';
import M3UPlayerHbo from './M3UPlayer copy';
import M3UPlayerGloboplay from './Globoplay';
import M3UPlayerAmazonPrime from './ amazon';
import M3UPlayerDisneyPlus from './DisneyPlus';
import M3UPlayerParamountPlus from './ParamountPlus';
import M3UPlayerMax from './Max';
import M3UPlayerClarovideo from './Clarovideo';
import M3UPlayerGooglePlayMovies from './GooglePlayMovies';
import M3UPlayerMGMChannel from './MGMChannel';
import M3UPlayerOldflix from './Oldflix';
import M3UPlayerNOW from './NOW';
import M3UPlayerVudu from './Vudu';
import M3UPlayerAMConDemand from './AMConDemand';
import M3UPlayerParamountPlusAppleTVChannel from './ParamountPlusAppleTVChannel';
import M3UPlayerUniverVideo from './UniverVideo';
import M3UPlayerNetflixbasicwithAds from './NetflixbasicwithAds';
import M3UPlayerOiPlay from './OiPlay';
import M3UPlayerLooke from './Looke';
import M3UPlayerFilmicca from './Filmicca';
import M3UPlayerLancamentos2024 from './Lancamentos2024';
import SubscriberSystem from './SubscriberSystem';
import { ethers } from 'ethers';
import SubscriberManagerABI from './SubscriberManagerABI.json'; // ABI do contrato

function App() {
  const [account, setAccount] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);

  const checkSubscriberStatus = async () => {
    try {
        // Endereço do contrato (substituir pelo seu contrato)
        const contractAddress = '0xSeuContratoAqui';
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Conecta-se ao contrato usando a ABI e o endereço
        const contract = new ethers.Contract(contractAddress, SubscriberManagerABI, signer);

        // Chama a função isSubscriberActive do contrato
        const status = await contract.isSubscriberActive(address);
        setIsActive(status);
    }
  };

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
              
                <M3UPlayer />
              
            }
          />
          <Route path="/Subscriber" element={<SubscriberSystem />} />
           <Route path="/Hbo" element={<M3UPlayerHbo />} />
           <Route path="/Globo" element={<M3UPlayerGloboplay />} />
           <Route path="/DisneyPlus" element={<M3UPlayerDisneyPlus />} />
          <Route path="/AmazonPrime" element={<M3UPlayerAmazonPrime />} />
          <Route path="/ParamountPlus" element={<M3UPlayerParamountPlus />} />
          <Route path="/Max" element={<M3UPlayerMax />} />
          <Route path="/Clarovideo" element={<M3UPlayerClarovideo />} />
          <Route path="/GooglePlayMovies" element={<M3UPlayerGooglePlayMovies />} />
          <Route path="/MGMChannel" element={<M3UPlayerMGMChannel />} />
          <Route path="/Oldflix" element={<M3UPlayerOldflix />} />
          <Route path="/NOW" element={<M3UPlayerNOW />} />
          <Route path="/Vudu" element={<M3UPlayerVudu />} />
          <Route path="/AMConDemand" element={<M3UPlayerAMConDemand />} />
          <Route path="/ParamountPlusAppleTVChannel" element={<M3UPlayerParamountPlusAppleTVChannel />} />
          <Route path="/UniverVideo" element={<M3UPlayerUniverVideo />} />
          <Route path="/NetflixbasicwithAds" element={<M3UPlayerNetflixbasicwithAds />} />
          <Route path="/OiPlay" element={<M3UPlayerOiPlay />} />
          <Route path="/Looke" element={<M3UPlayerLooke />} />
          <Route path="/Filmicca" element={<M3UPlayerFilmicca />} />
          <Route path="/Lancamentos2024" element={<M3UPlayerLancamentos2024 />} />

           <Route path="/Hbo/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
          <Route path="/netfli/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
          <Route path="/Globo/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
        <Route path="/DisneyPlus/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
        <Route path="/AmazonPrime/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />

        <Route path="/ParamountPlus/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
        <Route path="/Max/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
        <Route path="/Clarovideo/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
        <Route path="/GooglePlayMovies/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />

        <Route path="/MGMChannel/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
        <Route path="/Oldflix/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />

        <Route path="/NOW/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
        <Route path="/Vudu/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
        <Route path="/AMConDemand/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
        <Route path="/ParamountPlusAppleTVChannel/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
        <Route path="/UniverVideo/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
        
        <Route path="/NetflixbasicwithAds/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
        <Route path="/OiPlay/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
        <Route path="/Looke/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
        <Route path="/Filmicca/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
        <Route path="/Lancamentos2024/player/:channelName" element={<PrivateRoute><PlayerPage /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage connectWallet={connectWallet} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;