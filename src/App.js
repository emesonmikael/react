import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Conteudo from './conteudo';
import LoginPage from './LoginPage';
import ContentPage from './ContentPage';
import M3UPlayer from './M3UPlayer';
import PlayerPage from './PlayerPage';
import PrivateRoute from './PrivateRoute';  // Componente de rota privada
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

function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  // Função para salvar o estado de login quando o login for bem-sucedido
  const handleLoginSuccess = () => {
    setIsRegistered(true);
    localStorage.setItem('isRegistered', 'true');  // Salva no localStorage
  };

  // Quando o aplicativo é carregado, verificar o localStorage
  useEffect(() => {
    const registered = localStorage.getItem('isRegistered') === 'true';
    setIsRegistered(registered);  // Restaura o estado de login do localStorage
  }, []);

  return (
    <Router>
      <Routes>
        {/* Rota pública de login */}
        <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />

        {/* Rota privada para /content */}
        <Route
          path="/conteudo"
          element={
            <PrivateRoute isRegistered={isRegistered}>
              <Conteudo />
            </PrivateRoute>
          }
        />
        <Route path="/Hbo" element={<M3UPlayerHbo />} />

        {/* Outra rota privada */}
        <Route
          path="/netfli"
          element={
            
              <M3UPlayer />
              
          }
        />
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
      </Routes>
    </Router>
  );
}

export default App;