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
  try {
    let provider;
    // Configurando WalletConnect com o Infura


    // Tenta usar MetaMask primeiro
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Solicita ao usuário que conecte a carteira
    } else {
      // Se não houver MetaMask, tenta conectar com WalletConnect
      //const YOUR_INFURA_PROJECT_ID = '4f2cf2bc50c8496bb379695691632d3d'; // Coloque o seu Project ID aqui
     

      //const instance = await web3Modal.connect();
      //const web3Provider = new ethers.providers.Web3Provider(instance);
     // setProvider(web3Provider);

     // const signer = web3Provider.getSigner();
     // const address = await signer.getAddress();
      //setWalletAddress(address);

     // provider = new ethers.providers.Web3Provider(await walletConnect.getProvider());
    }

    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWalletAddress(address); // Define o endereço da carteira conectada
  } catch (error) {
    console.error("Erro ao conectar a carteira:", error);
    alert("Não foi possível conectar a carteira. Verifique se você possui uma carteira instalada.");
  }

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