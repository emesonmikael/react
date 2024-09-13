// src/App.js
import React, { useState } from 'react';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { ethers } from 'ethers';

const App = () => {
  const [connector, setConnector] = useState(null);
  const [account, setAccount] = useState(null);

  // Função para conectar ao WalletConnect
  const connectWallet = async () => {
    // Inicializando o WalletConnect Client
    const wcConnector = new WalletConnect({
      bridge: 'https://walletconnect.com',
    });

    // Verifica se já existe uma conexão ativa
    if (!wcConnector.connected) {
      // Exibe o QR Code para a carteira escanear
      await wcConnector.createSession();
      QRCodeModal.open(wcConnector.uri, () => {
        console.log('QR Code Modal fechado');
      });
    }

    // Listener para quando a conexão for estabelecida
    wcConnector.on('connect', async (error, payload) => {
      if (error) {
        throw error;
      }

      // Fecha o modal QR code após conexão
      QRCodeModal.close();

      // Pegando a conta conectada
      const { accounts } = payload.params[0];
      setAccount(accounts[0]);

      // Conectando ao ethers.js com o provider WalletConnect
      const provider = new ethers.providers.Web3Provider(wcConnector);
      const signer = provider.getSigner();
      console.log('Signer:', await signer.getAddress());
    });

    setConnector(wcConnector);
  };

  return (
    <div>
      <h1>WalletConnect com @walletconnect/client</h1>
      {account ? (
        <p>Conectado: {account}</p>
      ) : (
        <button onClick={connectWallet}>Conectar com WalletConnect</button>
      )}
    </div>
  );
};

export default App;