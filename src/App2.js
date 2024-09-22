import React from 'react';
import { ethers } from "ethers";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import M3UPlayer from './M3UPlayer';
import PlayerPage from './PlayerPage';
import HomePage from "./Home1";
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
import LoginPage from "./Login";
import Conteudo from './conteudo';
import Cadastro from './cadastro';
import EditarPerfil from './EditatPerfil';

const App = () => {
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
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cadastro" element={<PrivateRoute><Cadastro /> </PrivateRoute>} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/netfli" element={<PrivateRoute><M3UPlayer /> </PrivateRoute>} />
        <Route path="/Globo" element={<M3UPlayerGloboplay />} />
        <Route path="/Hbo" element={<M3UPlayerHbo />} />
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
        <Route path="/Max" element={<M3UPlayerMax />} />
        <Route path="/Max" element={<M3UPlayerMax />} />
        <Route path="/Max" element={<M3UPlayerMax />} />
        <Route path="/Max" element={<M3UPlayerMax />} />
        <Route path="/Max" element={<M3UPlayerMax />} />

        <Route path="/netfli/player/:channelName" element={<PlayerPage />} />
        <Route path="/Hbo/player/:channelName" element={<PlayerPage />} />
        <Route path="/Globo/player/:channelName" element={<PlayerPage />} />
        <Route path="/DisneyPlus/player/:channelName" element={<PlayerPage />} />
        <Route path="/AmazonPrime/player/:channelName" element={<PlayerPage />} />

        <Route path="/ParamountPlus/player/:channelName" element={<PlayerPage />} />
        <Route path="/Max/player/:channelName" element={<PlayerPage />} />
        <Route path="/Clarovideo/player/:channelName" element={<PlayerPage />} />
        <Route path="/GooglePlayMovies/player/:channelName" element={<PlayerPage/>} />

        <Route path="/MGMChannel/player/:channelName" element={<PlayerPage />} />
        <Route path="/Oldflix/player/:channelName" element={<PlayerPage  />} />

        <Route path="/NOW/player/:channelName" element={<PlayerPage  />} />
        <Route path="/Vudu/player/:channelName" element={<PlayerPage />} />
        <Route path="/AMConDemand/player/:channelName" element={<PlayerPage />} />
        <Route path="/ParamountPlusAppleTVChannel/player/:channelName" element={<PlayerPage  />} />
        <Route path="/UniverVideo/player/:channelName" element={<PlayerPage  />} />
        
        <Route path="/NetflixbasicwithAds/player/:channelName" element={<PlayerPage/>} />
        <Route path="/OiPlay/player/:channelName" element={<PlayerPage />} />
        <Route path="/Looke/player/:channelName" element={<PlayerPage />} />
        <Route path="/Filmicca/player/:channelName" element={<PlayerPage />} />
        <Route path="/Lancamentos2024/player/:channelName" element={<PlayerPage />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
        <Route path="/AmazonPrime/player/:channelName" element={<M3UPlayerAmazonPrime />} />
      </Routes>
    </Router>
  );
};

export default App;