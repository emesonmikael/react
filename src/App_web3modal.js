
import React, { useState } from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';

const App = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  // Função para conectar usando o Web3Modal
  const connectWallet = async () => {
    // Configuração do Web3Modal com o provedor WalletConnect
    const web3Modal = new Web3Modal({
      cacheProvider: false, // opcional
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider, // Importação do provider
          options: {
            infuraId: 'YOUR_INFURA_ID', // Coloque seu Infura ID ou outro RPC aqui
          },
        },
      },
    });

    // Abre o modal para selecionar a carteira
    const instance = await web3Modal.connect();

    // Conecta o ethers.js ao provedor selecionado
    const web3Provider = new ethers.providers.Web3Provider(instance);
    setProvider(web3Provider);

    // Pega as contas conectadas
    const signer = web3Provider.getSigner();
    const account = await signer.getAddress();
    setAccount(account);
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
