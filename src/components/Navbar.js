import React from "react";
import PropTypes from "prop-types";
import { NavLink, Redirect, Link, withRouter } from "react-router-dom";
import { logoutUser } from "../actions";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

const styleBar = {
  overflow: 'hidden',
  backgroundColor: '#5400E8',
  height: '50px',
  textAlign: 'center',
  verticalAlign: 'middle'
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
      <div style={styleBar}>
        <NavLink style={styleLink} onClick={() => this.handleLogout()}>
          Logout
        </NavLink>
        <NavLink style={styleLink} to="/leadlists">
          Dashboard
        </NavLink>
        {/* <NavLink style={styleLink} to="/results">
          Results
        </NavLink> */}
        <NavLink style={styleLink} to="/profile">
          My Profile
        </NavLink>
        <NavLink style={styleLink} to="/">
          Home
        </NavLink>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Navbar));
