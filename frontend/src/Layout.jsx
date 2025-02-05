import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar.jsx';
import Navbar from './Navbar/Navbar.jsx';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content-area">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default Layout;
