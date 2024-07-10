import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../helpers/axiosConfig';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


      try {
        const response = await axiosInstance.getUserRoles(username);
        const roles = response.data;
        debugger

        // Redirect based on the roles
        if (roles.contains('ADMIN')) {
          navigate('/runners');
        } else if (roles.includes('USER')) {
          navigate('/runner-details');
        } else {
          navigate('/login');
        }
      } catch (error) {
        setError('Failed to fetch user roles. Please try again later.');
        navigate('/login');
      } 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:443/api/auth/login', { username, password });
      localStorage.setItem('accessToken', response.data.accessToken);

      const userRoles = await axios.post('https://localhost:443/api/auth/getUserRoles', { username });
      debugger
      if (userRoles.contains('ADMIN')) {
        navigate('/runners');
      } else if (roles.contains('USER')) {
        navigate('/runner-details');
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
          <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
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
