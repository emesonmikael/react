import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ABI from './ABI.json'
//import SubscriberManagerABI from './SubscriberManagerABI.json'; // ABI do contrato
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [account, setAccount] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const contractAddress = '0x2EF17eE49CC5205A2B6f3672dABEbadEDDCcDeD5';  // Endereço do contrato

  // Conectar MetaMask diretamente usando ethers.js
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Solicitar acesso à MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (err) {
        console.error('Erro ao conectar a carteira', err);
      }
    } else {
      alert('MetaMask não está instalada');
    }
  };

  // Verificar se o usuário está registrado no contrato
  const checkRegistration = async () => {
    if (!account) return;

    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress,ABI , signer);

      const subscriberInfo = await contract.subscribers(account);

      if (subscriberInfo.isRegistered) {
        setIsRegistered(true);
       // onLoginSuccess();
        navigate("/Conteudo") ;
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
    if (account) {
      checkRegistration();
    }
  }, [account]);

  return (
    <div>
      <h2>Login</h2>
      {!account ? (
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