import React from 'react'
import { NavLink } from 'react-router-dom'

const styleBar = {
  overflow: 'hidden',
  backgroundColor: '#7E39FB'
  // position: 'fixed',
  // top: '0',
  // width: '100%'
}

const styleLink = {
  float: 'right',
  display: 'block',
  color: '#f2f2f2',
  textAlign: 'center',
  padding: '14px 16px',
  fontSize: '17px',
  textDecoration: 'none'
}

// ! Need to fix up logout
const Navbar = () => {
  return (
    <div className="navbar" style={styleBar}>
      <NavLink style={styleLink} to="/logout">Logout</NavLink>
      <NavLink style={styleLink} to="/leadlists">Dashboard</NavLink>
      <NavLink style={styleLink} to="/profile">My Profile</NavLink>
      <NavLink style={styleLink} to="/">Home</NavLink>
    </div>
  );
};

export default Navbar;