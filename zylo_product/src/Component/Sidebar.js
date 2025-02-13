import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Zylo Tech</h3>
      <ul>
        <li><Link to="/dashboard"><FaHome /> Dashboard</Link></li>
        <li><Link to="/profile"><FaUser /> Profile</Link></li>
        <li onClick={logout}><FaSignOutAlt /> Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
