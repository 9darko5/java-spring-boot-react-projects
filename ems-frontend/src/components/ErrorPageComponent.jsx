import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPageComponent = () => {
  const navigate = useNavigate();

  return (
    <div className='container text-center'>
      <h1>401 - Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

export default ErrorPageComponent;
