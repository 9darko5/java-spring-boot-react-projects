import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:443/api/auth/register', { email, password, firstName, lastName });
      navigate('/login');
    } catch (error) {
      console.error('Register error', error);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>First name</label>
          <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Last name</label>
          <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Register</button><br/>
        <span>Have an account? </span><a href='login'>Log in</a>
      </form>
    </div>
  );
};

export default RegisterComponent;
