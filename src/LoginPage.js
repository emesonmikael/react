import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from './wallet/Connectors'; // Conector MetaMask
import { ethers } from 'ethers';
import SubscriberManagerABI from './SubscriberManagerABI.json'; // ABI do contrato

const LoginPage = ({ onLoginSuccess }) => {
  const { active, account, activate, library } = useWeb3React();
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const contractAddress = '0x...';  // Endereço do contrato

  // Conectar carteira
  const connectWallet = async () => {
    try {
      await activate(injected);
    } catch (err) {
      console.error('Erro ao conectar carteira', err);
    }
  };

  // Verificar se o usuário está registrado no contrato
  const checkRegistration = async () => {
    setLoading(true);
    try {
      const signer = library.getSigner();
      const contract = new ethers.Contract(contractAddress, SubscriberManagerABI, signer);
      const subscriberInfo = await contract.subscribers(account);

      if (subscriberInfo.isRegistered) {
        setIsRegistered(true);
        onLoginSuccess();
      } else {
        setError('Usuário não registrado.');
      }
    } catch (err) {
      console.error('Erro ao verificar registro', err);
      setError('Erro ao verificar registro.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (active && account) {
      checkRegistration();
    }
  }, [active, account]);

  return (
    <div>
      <h2>Login</h2>
      {!active ? (
        <button onClick={connectWallet}>Conectar Carteira</button>
      ) : loading ? (
        <p>Verificando registro...</p>
      ) : isRegistered ? (
        <p>Login realizado com sucesso!</p>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default LoginPage;