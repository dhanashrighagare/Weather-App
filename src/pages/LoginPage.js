import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    const userData = { name: username };
    login(userData);
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
