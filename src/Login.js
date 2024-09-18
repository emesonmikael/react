import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionamento

function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Usado para navegação entre páginas

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Buscar os usuários armazenados no LocalStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar se o usuário existe
    const user = storedUsers.find((u) => u.login === login && u.senha === senha);

    if (user) {
      // Se o login e senha estão corretos, salvar informação de autenticação no LocalStorage
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      // Redirecionar para a página de conteúdo
      navigate('/home');
    } else {
      // Se os dados estiverem incorretos, exibir uma mensagem de erro
      setError('Login ou senha incorretos');
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;