import React from "react";
import PropTypes from "prop-types";
import { NavLink, Redirect, Link } from "react-router-dom";
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

const styleLink = {
  float: "right",
  display: "block",
  color: "#f2f2f2",
  textAlign: "center",
  padding: "14px 16px",
  fontSize: "17px",
  textDecoration: "none"
};

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <NavLink style={styleLink} onClick={() => this.handleLogout()}>
          Logout
        </NavLink>
        <NavLink style={styleLink} to="/leadlists">
          Dashboard
        </NavLink>
        <NavLink style={styleLink} to="/results">
          Results
        </NavLink>
        <NavLink style={styleLink} to="/profile">
          My Profile
        </NavLink>
        <NavLink style={styleLink} to="/search">
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
)(Navbar);
