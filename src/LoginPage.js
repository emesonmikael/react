import React from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers';
import SubscriberManagerABI from './SubscriberManagerABI.json'; // ABI do contrato


const LoginPage = ({ connectWallet }) => {
  const navigate = useNavigate();
  

  const handleLogin = async () => {
    await connectWallet();
    const savedAccount = localStorage.getItem("walletAddress");
    if (savedAccount) {
      const contractAddress = '0x2EF17eE49CC5205A2B6f3672dABEbadEDDCcDeD5';
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
       // Conecta-se ao contrato usando a ABI e o endereço
       const contract = new ethers.Contract(contractAddress, SubscriberManagerABI, signer);
       // Chama a função isSubscriberActive do contrato
       const status = await contract.isSubscriberActive(savedAccount);
       console.log(status);
       if(status == true){
        navigate("/Conteudo"); // Redireciona para a página protegida após a conexão
       }
       else 
       {alert('regitre para ter acesso aos onteudos');}
    }
    await connectWallet();
   
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