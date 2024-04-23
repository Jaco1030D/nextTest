import React from 'react';
import './style.css'; 
import logo from './logo.png'
import { useMainContext } from '../../../context/MainContext';
import { useAuthentication } from '../../../hooks/useAuthentication'
import { useNavigate } from 'react-router-dom';

const Sidebar = ({name, text}) => {
    const [state, actions] = useMainContext()
    const navigate = useNavigate('/')
    const {logout} = useAuthentication()
    const handleClick = () => {
        logout()
        actions.setAccountInfo(null)
    }
  return (
    <div className="sidebar">
      <img src={logo} onClick={() => navigate('/')} alt="Logo" className="logo-sideBar pointer" />
      <div className="menu-item">
        <p className="helo">{text.text}</p>
        <p className="name">{state.user?.displayName ? state.user?.displayName : name}</p>
      </div>
      <div className="menu-item" onClick={() => navigate('/')}>Home</div>
      <div className="menu-item" onClick={handleClick}>Logout</div>
      <div className="menu-item" onClick={() => navigate('/')}>{text.button}</div>
    </div>
  );
};

export default Sidebar;