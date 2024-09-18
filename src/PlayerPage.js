import React from 'react';
import ReactPlayer from 'react-player';
import { useParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';


const PlayerPage = () => {
  const { channelName } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const url = params.get('url');
  const [walletAddress, setWalletAddress] = useState(null);
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // Solicita ao usuário que conecte a carteira
  } 
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  setWalletAddress(address); // Define o endereço da carteira conectada

  return (
    <div>
      <h2>M3U Player - Conectado: {walletAddress}</h2>

      <h2>Playing: {channelName}</h2>
      {url ? (
        <div className="player-wrapper" style={{ marginTop: '20px' }}>
          <ReactPlayer url={url} controls width="100%" height="100%" />
        </div>
      ) : (
        <p>URL não encontrada.</p>
      )}
    </div>
  );
};

export default PlayerPage;