import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import M3UPlayer from './M3UPlayer';
import PlayerPage from './PlayerPage';
import Home from './Home';
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

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/netfli" element={<M3UPlayer />} />
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
        <Route path="/AmazonPrime/player/:channelName" element={<PlayerPage />} />
        <Route path="/AmazonPrime/player/:channelName" element={<PlayerPage  />} />
        <Route path="/AmazonPrime/player/:channelName" element={<PlayerPage  />} />
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