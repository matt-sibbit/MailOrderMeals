import React, { useState } from 'react';

const Login = ({ onAuthChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    const loginData = { email, password };

    fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem('isAuthenticated', 'true');
      onAuthChange(true); 
    })
    .catch(error => {
      console.error('Error during login:', error);
      localStorage.setItem('isAuthenticated', 'false');
      onAuthChange(false); 
    });
  };

  return (
    <div>
      <input 
        type="email"
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary" onClick={login}>Login</button>
    </div>
  );
};

export default Login;
