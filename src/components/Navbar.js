import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { logoutUser } from '../actions'
import { connect } from 'react-redux'

const styleBar = {
  overflow: 'hidden',
  backgroundColor: '#5400E8'
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


class Navbar extends React.Component {

  handleLogout = () => {
    this.props.logoutUser()
    localStorage.removeItem('token')
    this.props.history.push('/')
    // redirect to login page
  }

  render() {
  return (
    <div className="navbar" style={styleBar}>
      <NavLink style={styleLink} onClick={() => this.handleLogout()}>Logout</NavLink>
      <NavLink style={styleLink} to="/leadlists">Dashboard</NavLink>
      <NavLink style={styleLink} to="/results">Results</NavLink>
      <NavLink style={styleLink} to="/profile">My Profile</NavLink>
      <NavLink style={styleLink} to="/search">Home</NavLink>
    </div>
  );
  }
};


function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default connect(null, mapDispatchToProps)(Navbar);