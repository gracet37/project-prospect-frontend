import React from "react";
import PropTypes from "prop-types";
import { NavLink, Redirect, Link, withRouter } from "react-router-dom";
import { logoutUser, clearMessage } from "../actions";
import { connect } from "react-redux";
import {
  Header,
  Image
} from "semantic-ui-react";

const styleBar = {
  overflow: 'hidden',
  backgroundColor: '#5400E8',
  height: '50px',
  textAlign: 'center',
  verticalAlign: 'middle',
  position: 'fixed',
  opacity: '1',
  zIndex: '1',
  top: '0',
  width: '100%'
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

const styleLinkLeft = {
  float: 'left',
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
    // redirect to landing page
  }

  handleClearMessage = () => {
    this.props.clearMessage()
  }

  render() {
    return (
      <div style={styleBar}>
        <div className='style-links' style={{marginRight:'60px'}}>
          <Image style={{display: 'inline-block', float: 'left', margin: '10px', marginLeft: '70px'}} circular size='mini' src={this.props.auth.user.img_url}></Image>
          <NavLink style={styleLinkLeft} onClick={() => this.handleLogout()}>
          {this.props.auth.user.first_name}
        </NavLink>
        <NavLink style={styleLink} onClick={() => this.handleLogout()}>
          Logout
        </NavLink>
        <NavLink onClick={this.handleClearMessage} style={styleLink} to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink onClick={this.handleClearMessage} style={styleLink} to="/profile">
          My Profile
        </NavLink>
        <NavLink onClick={this.handleClearMessage} style={styleLink} to="/">
          Home
        </NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {logoutUser, clearMessage}
)(withRouter(Navbar));
