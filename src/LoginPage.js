import React from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers';
import SubscriberManagerABI from './SubscriberManagerABI.json'; // ABI do contrato


const LoginPage = ({ connectWallet }) => {
  const navigate = useNavigate();
  

  const handleLogin = async () => {
    //await connectWallet();
   // const savedAccount = localStorage.getItem("walletAddress");
   // if (savedAccount) {
     // const contractAddress = '0x2EF17eE49CC5205A2B6f3672dABEbadEDDCcDeD5';
      //const provider = new ethers.providers.Web3Provider(window.ethereum);
      //const signer = provider.getSigner();
       // Conecta-se ao contrato usando a ABI e o endereço
      // const contract = new ethers.Contract(contractAddress, SubscriberManagerABI, signer);
       // Chama a função isSubscriberActive do contrato
      // const status = await contract.isSubscriberActive(savedAccount);
      // console.log(status);
      // if(status == true){
      //  navigate("/Conteudo"); // Redireciona para a página protegida após a conexão
      // }
      // else 
     //  {alert('regitre para ter acesso aos onteudos');}
   // }
   if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]); // Guardar a conta conectada
      localStorage.setItem("walletAddress", accounts[0]); // Salvar a conta no localStorage
    } catch (err) {
      console.error("Erro ao conectar a carteira", err);
    }
  } else {
    console.error("MetaMask não encontrada");
  }
    
    const contractAddress = '0x2EF17eE49CC5205A2B6f3672dABEbadEDDCcDeD5';
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
       // Conecta-se ao contrato usando a ABI e o endereço
       const contract = new ethers.Contract(contractAddress, SubscriberManagerABI, signer);
       // Chama a função isSubscriberActive do contrato
       const status = await contract.isSubscriberActive();
       console.log(status);
       if(status == true){
        navigate("/Conteudo"); // Redireciona para a página protegida após a conexão
       }
       else 
       {alert('regitre para ter acesso aos onteudos');}
    
   
  };
  const registra = async () => {
    navigate("/Subscriber?ref=0x842249350ec82e6347fee77cb29ece9131dd828b");
  };

  return (
    <div>
      <h2>Conectar Carteira</h2>
      <p>Por favor, conecte sua carteira para acessar o conteúdo protegido.</p>
      <button onClick={registra}> registra</button>
      <button onClick={handleLogin}>Conectar</button>
    </div>
  );
};

export default LoginPage;