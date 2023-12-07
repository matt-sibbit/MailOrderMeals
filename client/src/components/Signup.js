import React, { useState } from 'react';

const SignUp = ({ onAuthChange }) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = () => {
    // make some call to backend/mongo
    onAuthChange(true);
  };

  return (
    <div>
      <input 
        type="text"
        className="form-control mb-2"
        placeholder="First Name"
        value={fname}
        onChange={(e) => setFname(e.target.value)}
      />
      <input 
        type="text"
        className="form-control mb-2"
        placeholder="Last Name"
        value={lname}
        onChange={(e) => setLname(e.target.value)}
      />
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
      <button className="btn btn-primary" onClick={signUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
