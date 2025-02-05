import React, { useEffect } from 'react'
import logo from '../assets/aakar-logo.svg'
import './Navbar.css'
import { FiUser } from 'react-icons/fi'

const Navbar = () => {
  return (
    <nav id="navbar">
      <img src={logo} alt="Aakar Dies & Moulds" />
      <div className="navDiv">
        <FiUser className="user-icon" color="white" size={18} />
      </div>
    </nav>
  )
}

export default Navbar
