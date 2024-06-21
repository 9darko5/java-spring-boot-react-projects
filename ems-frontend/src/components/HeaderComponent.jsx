import React from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../helpers/axiosConfig'

export const HeaderComponent = () => {
  
  const navigator = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("https://localhost:443/api/auth/logout", {});

      localStorage.removeItem('accessToken');
      navigator('/login');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  const isAuthenticated = !!localStorage.getItem('accessToken');

  return (
    <div>
        <header>
           <nav className='navbar navbar-dark bg-dark'>
                <a className="navbar-brand" href="http://localhost:3000">Employee Management System</a>
                {isAuthenticated && (
                  <form className="form my-2 my-lg-0" onSubmit={handleLogout}>
                    <button className="btn btn-primary my-2 my-sm-0" type="submit">Logout</button>
                  </form>
                )}
           </nav> 
        </header>
    </div>
  )
}

export default HeaderComponent;