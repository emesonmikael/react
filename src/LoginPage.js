import React from "react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const LoginPage = ({ connectWallet }) => {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);

  const handleLogin = async () => {
    await connectWallet();
    const savedAccount = localStorage.getItem("walletAddress");
    if (savedAccount) {
      setAccount(savedAccount);
    }
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