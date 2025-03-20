import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import PRAM from '../../assets/images/PRAM.png';
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); 

  const handleLogin = (dashboardType) => {
    navigate(`/dashboard/${dashboardType}`);
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
        <img src={PRAM} alt="PRAM" className='PRAM-img'/>
      </div>

      <div className="buttons-container">
        <button className="login-button" onClick={() => handleLogin('employee')}>
          Absence Portal
        </button>
        <button className="login-button" onClick={() => handleLogin('manager')}>
          Manager Portal
        </button>
        <button className="login-button" onClick={() => handleLogin('hr')}>
          HR Portal
        </button>
      </div>
    </div>
  );
};

export default Login;
