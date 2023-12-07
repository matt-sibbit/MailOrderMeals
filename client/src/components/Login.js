import React, { useState } from 'react';

const Login = ({ onAuthChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    //make some call to backend/mongo
    onAuthChange(true);
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
