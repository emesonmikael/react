
import React, { useState } from 'react';
import WalletConnectClient from '@walletconnect/client';
import { ethers } from 'ethers';

const App = () => {
  const [connector, setConnector] = useState(null);
  const [account, setAccount] = useState(null);

  // Função para conectar ao WalletConnect
  const connectWallet = async () => {
    // Inicializando o WalletConnect Client
    const wcConnector = new WalletConnectClient({
      bridge: 'https://bridge.walletconnect.org',
    });

    // Verificando se o WalletConnect já está conectado
    if (!wcConnector.connected) {
      // Criando uma nova sessão (conexão)
      await wcConnector.createSession();
    }

    // Listener para quando a conexão for estabelecida
    wcConnector.on('connect', (error, payload) => {
      if (error) {
        throw error;
      }

      // Pegando as contas conectadas
      const { accounts } = payload.params[0];
      setAccount(accounts[0]);
    });

    // Listener para desconectar
    wcConnector.on('disconnect', (error) => {
      if (error) {
        throw error;
      }

      setAccount(null);
      setConnector(null);
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
