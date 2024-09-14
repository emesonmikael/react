import React, { useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';

const App = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      // Configuração para o Web3Modal com suporte ao WalletConnect 2.0
      const web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              rpc: {
                1: "https://mainnet.infura.io/v3/94ccd8f7f0ee41678d5a0590e5692762", // Alterar para seu Infura ID
              },
            },
          },
        },
      });

      const instance = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(instance);
      setProvider(web3Provider);

      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } catch (err) {
      console.error('Erro ao conectar:', err);
    }
  };

  return (
    <div>
      <h1>WalletConnect 2.0 com Web3Modal</h1>
      {account ? (
        <p>Conectado: {account}</p>
      ) : (
        <button onClick={connectWallet}>Conectar com WalletConnect</button>
      )}
    </div>
  );
};

export default App;