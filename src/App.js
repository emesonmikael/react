import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import ContentPage from './ContentPage';
//import AnotherPrivatePage from './AnotherPrivatePage';  // Exemplo de outra rota privada
import { useState } from 'react';
import PrivateRoute from './PrivateRoute';  // Componente de rota privada
import Conteudo from './conteudo';
import M3UPlayer from './M3UPlayer';
import PlayerPage from './PlayerPage';
import HomePage from "./Home";
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