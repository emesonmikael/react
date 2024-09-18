import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Buscar os usuários armazenados no LocalStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar se o login já existe
    const userExists = storedUsers.find((u) => u.login === login);

    if (userExists) {
      setError('Usuário já existe.');
    } else {
      // Adicionar novo usuário
      const newUser = { login, senha, estadoConexao: false };
      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Exibir mensagem de sucesso e redirecionar para login
      setSuccess('Cadastro realizado com sucesso! Redirecionando para login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default Cadastro;