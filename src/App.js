import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import M3UPlayer from './M3UPlayer';
import PlayerPage from './PlayerPage';
import Home from './Home';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/netfli" element={<M3UPlayer />} />
        <Route path="/netfli/player/:channelName" element={<PlayerPage />} />
      </Routes>
    </Router>
  );
};

export default App;