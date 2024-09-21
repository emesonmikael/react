import React from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers';
import SubscriberManagerABI from './SubscriberManagerABI.json'; // ABI do contrato
import  { useState, useEffect } from 'react';

const HomePage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <div>
      <h2>Bem-vindo à Página Inicial</h2>
      <p>Esta é uma página pública. Conecte sua carteira para acessar conteúdo exclusivo.</p>
      <button onClick={goToLogin}>Conectar Carteira</button>
    </div>
  );
};

export default HomePage;