import React, { useState, onLogin } from 'react';
import axios from 'axios';
import { AppRoutes } from 'react-router-dom';

const API_URL= 'http://localhost:3001';

const LoginAccess = ({onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      onLogin(response.data);
      setError('');      
    } catch (err) {
      setError('Invalid credentials');
    }
  };  

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
  ); 
};

export default LoginAccess;


     