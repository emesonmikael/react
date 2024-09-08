import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import M3UPlayer from './M3UPlayer';
import PlayerPage from './PlayerPage';
import Home from './Home';
import M3UPlayerHbo from './M3UPlayer copy';
import M3UPlayerGloboplay from './Globoplay';
import M3UPlayerAmazonPrime from './ amazon';
import M3UPlayerDisneyPlus from './DisneyPlus';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/netfli" element={<M3UPlayer />} />
        <Route path="/Globo" element={<M3UPlayerGloboplay />} />
        <Route path="/Hbo" element={<M3UPlayerHbo />} />
        <Route path="/DisneyPlus" element={<M3UPlayerDisneyPlus />} />
        <Route path="/netfli/player/:channelName" element={<PlayerPage />} />
        <Route path="/Hbo/player/:channelName" element={<PlayerPage />} />
        <Route path="/Globo/player/:channelName" element={<PlayerPage />} />
        <Route path="/DisneyPlus/player/:channelName" element={<PlayerPage />} />
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