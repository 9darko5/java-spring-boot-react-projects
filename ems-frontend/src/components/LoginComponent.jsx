import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginComponent = () => {

  const [data, setData] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:8443/api/auth/login', { username, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      const rolesResponse = await axios.get('https://localhost:8443/api/auth/getUserRoles?email='+ username);
      var userRoles = rolesResponse.data.rolesCSV;
      var runnerId = rolesResponse.data.runnerId;
        
      if (userRoles.includes('ROLE_ADMIN')) {
        navigate('/runners');
      } else if (userRoles.includes('ROLE_USER')) {
        navigate('/runner-details/' + runnerId);
      } else {
        navigate('/login');
       } 
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input type="email" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button><br/>
        <span>Don't have an account? </span><a href='register'>Register</a>
      </form>
    </div>
  );
};

export default LoginComponent;
