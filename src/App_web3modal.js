// src/App.js
import React, { useState } from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';

const App = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      // Configurando o Web3Modal
      const web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId: '4f2cf2bc50c8496bb379695691632d3d', // Coloque um Infura ID válido
            },
          },
        },
      });

      // Mostra o modal para selecionar a carteira
      const instance = await web3Modal.connect();

      // Conectando ao ethers.js
      const web3Provider = new ethers.providers.Web3Provider(instance);
      setProvider(web3Provider);

      // Pegando a conta conectada
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } catch (err) {
      console.error('Erro ao conectar:', err);
    }
  };

  return (
    <div>
      <h1>WalletConnect com Web3Modal</h1>
      {account ? (
        <p>Conectado: {account}</p>
      ) : (
        <button onClick={connectWallet}>Conectar com WalletConnect</button>
      )}
    </div>
  );
};

export default App;