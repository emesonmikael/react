import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <div>
      <h2>Bem-vindo à Página Inicial</h2>
      <p>Esta é uma página pública. Conecte sua carteira para acessar conteúdo exclusivo.</p>
      <a href="https://streamer-liard.vercel.app/netfli">
      Netflix Filme  
<p>

</p>
</a>
      <button onClick={goToLogin}>Conectar Carteira</button>
    </div>
  );
};

export default HomePage;