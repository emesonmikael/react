import React from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers';


const LoginPage = ({ connectWallet }) => {
  const navigate = useNavigate();
  

  const handleLogin = async () => {
    await connectWallet();
    const savedAccount = localStorage.getItem("walletAddress");
    if (savedAccount) {
      const contractAddress = '0x2EF17eE49CC5205A2B6f3672dABEbadEDDCcDeD5';
      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
    await connectWallet();
    navigate("/Conteudo"); // Redireciona para a página protegida após a conexão
  };

  return (
    <div>
      <h2>Conectar Carteira</h2>
      <p>Por favor, conecte sua carteira para acessar o conteúdo protegido.</p>
      <button onClick={handleLogin}>Conectar MetaMask</button>
    </div>
  );
};

export default LoginPage;