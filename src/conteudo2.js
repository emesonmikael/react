import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import M3UPlayer from './M3UPlayer';
import PlayerPage from './PlayerPage';
import LoginPage from './LoginPage';
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
import SubscriberSystem from './SubscriberSystem';


function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleLoginSuccess = () => {
    setIsRegistered(true);
    localStorage.setItem('isRegistered', 'true');  // Salva no localStorage
  };
  useEffect(() => {
    const registered = localStorage.getItem('isRegistered') === 'true';
    setIsRegistered(registered);  // Restaura o estado de login do localStorage
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/Home" element={ <PrivateRoute isRegistered={isRegistered}><Home /></PrivateRoute>} />
        <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        {/* Crie rotas dinâmicas baseadas no nome do canal */}
        
        <Route
            path="/Netflix"
            element={
              <PrivateRoute isRegistered={isRegistered}>
                <M3UPlayer />
                </PrivateRoute>
            }
          />
        <Route path="/OiPlay" element={<M3UPlayerOiPlay />} />
        <Route path="/Subscriber" element={<SubscriberSystem />} />
        
        <Route path="/Netflix/player/:channelName" element={<PlayerPage />} />
        <Route path="/OiPlay/player/:channelName" element={<PlayerPage />} />
        {/* Adicione mais rotas conforme necessário */}
      </Routes>
    </Router>
  );
}

function Home() {
  const [channels, setChannels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Carrega e processa o arquivo .m3u
    fetch('/listaFilmes.m3u') // Certifique-se de que o arquivo .m3u está na pasta public
      .then(response => response.text())
      .then(data => {
        const lines = data.split('\n');
        const parsedChannels = [];

        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('#EXTINF')) {
            const logoMatch = lines[i].match(/tvg-logo="(.*?)"/);
            const nameMatch = lines[i].split(',')[1];

            if (logoMatch && nameMatch) {
              const tvgLogo = logoMatch[1];
              const name = nameMatch.trim().replace(/\s/g, ''); // Remove espaços para formar a rota
              const streamUrl = lines[i + 2]?.trim(); // O URL está duas linhas abaixo
              
              parsedChannels.push({ name, tvgLogo, streamUrl });
            }
          }
        }

        setChannels(parsedChannels);
      })
      .catch(error => console.error('Erro ao carregar o arquivo .m3u', error));
  }, []);

  const handleImageClick = (name) => {
    navigate(`/${name}`); // Redireciona para a rota com base no nome do canal
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {channels.map((channel, index) => (
        <div key={index} style={{ margin: '10px', textAlign: 'center' }}>
          <img
            src={channel.tvgLogo}
            alt={channel.name}
            onClick={() => handleImageClick(channel.name)} // Ao clicar, usa o navigate para a rota com o nome do canal
            style={{ cursor: 'pointer', width: '150px', height: '150px', borderRadius: '10px' }}
          />
          <p>{channel.name}</p>
        </div>
      ))}
    </div>
  );
}

function ChannelPage({ name }) {
  return <h1>Bem-vindo ao canal {name}</h1>;
}

export default App;