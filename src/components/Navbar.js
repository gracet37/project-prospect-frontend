import React from "react";
import PropTypes from "prop-types";
import { NavLink, Redirect, Link, withRouter } from "react-router-dom";
import { logoutUser, clearMessage } from "../actions";
import { connect } from "react-redux";
import { Header, Image, Menu, Button, Container } from "semantic-ui-react";

const styleBar = {
  overflow: "hidden",
  // backgroundColor: '#5400E8',
  margin: "10px",
  height: "50px",
  textAlign: "center",
  verticalAlign: "middle",
  position: "fixed",
  opacity: "0",
  zIndex: "1",
  top: "0",
  width: "100%"
};

const styleLinkLeft = {
  marginLeft: "10px",
  float: "left",
  display: "block",
  color: "#6206EE",
  textAlign: "center",
  padding: "14px 16px",
  fontSize: "17px",
  textDecoration: "none",
  marginLeft: "20px"
};

const styleLinkRight = {
  float: "right",
  display: "block",
  color: "#6206EE",
  textAlign: "center",
  padding: "14px 16px",
  fontSize: "17px",
  textDecoration: "none"
};

const menuStyle = {
  fontSize: "large",
  color: "#6200EE"
};

const menuStyleRight = {
  fontSize: "large",
  color: "#6200EE",
  float: "right",
  margin: 0
};

class Navbar extends React.Component {
  state = {
    fixed: true
  };
  handleLogout = () => {
    this.props.logoutUser();
    localStorage.removeItem("token");
    this.props.history.push("/");
    // redirect to landing page
  };

  handleClearMessage = () => {
    this.props.clearMessage();
  };

  render() {
    const { fixed } = this.state;
    return (
      <div>
        <Menu
          fixed={fixed ? "top" : null}
          // inverted={!fixed}
          // pointing={!fixed}
          secondary={true}
          size="large"
          // borderless
          style={{ backgroundColor: "white" }}
        >
          <Container>
            <Menu.Item
              style={menuStyle}
              as={Link}
              to="/"
              // active
              onClick={this.props.clearMessage}
            >
              Home
            </Menu.Item>
            <Menu.Item
              style={menuStyle}
              as={Link}
              to={this.props.auth.user ? "/dashboard" : "/login"}
              onClick={this.props.clearMessage}
            >
              Dashboard
            </Menu.Item>
            {/* <Menu.Item
              style={menuStyle}
              as={Link}
              to={this.props.auth.user ? "/profile" : "/login"}
              onClick={this.props.clearMessage}
            >
              My Account
            </Menu.Item> */}
            <Menu.Item
              position="right"
              style={menuStyleRight}
              as={Link}
              to={this.props.auth.user ? "/profile" : "/login"}
              onClick={this.props.clearMessage}
            >
              <Image
                circular
                size="mini"
                src={this.props.auth.user.img_url}
              ></Image>
            </Menu.Item>
            <Menu.Item
              style={menuStyleRight}
              as={Link}
              to={this.props.auth.user ? "/profile" : "/login"}
              onClick={this.props.clearMessage}
            >
              {this.props.auth.user.first_name}
            </Menu.Item>
            <Menu.Item
              style={menuStyleRight}
              as={Link}
              // to={this.props.auth.user ? "/profile" : "/login"}
              onClick={() => this.handleLogout()}
            >
              Logout
            </Menu.Item>
          </Container>
        </Menu>
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
  { logoutUser, clearMessage }
)(withRouter(Navbar));

// <div className="style-links" style={{ marginRight: "50px" }}>
// <NavLink
//   onClick={this.handleClearMessage}
//   style={styleLinkLeft}
//   to="/"
// >
//   Home
// </NavLink>
// <NavLink
//   onClick={this.handleClearMessage}
//   style={styleLinkLeft}
//   to="/dashboard"
// >
//   Dashboard
// </NavLink>
// {/* <NavLink onClick={this.handleClearMessage} style={styleLinkLeft} to="/profile">
// My Profile
// </NavLink> */}
// {/* <Image style={{display: 'inline-block', float: 'right', margin: '10px', right: 140}} circular size='mini' src={this.props.auth.user.img_url}></Image> */}
// <NavLink style={styleLinkRight} onClick={() => this.handleLogout()}>
//   Logout
// </NavLink>
// <NavLink
//   onClick={this.handleClearMessage}
//   style={styleLinkRight}
//   to="/profile"
// >
//   {this.props.auth.user.first_name}
// </NavLink>
// <NavLink>
//   {" "}
//   <Image
//     style={{
//       display: "inline-block",
//       float: "right",
//       margin: "10px",
//       marginRight: '10px'
//       // right: 140
//     }}
//     circular
//     size="mini"
//     src={this.props.auth.user.img_url}
//   ></Image>
// </NavLink>
// </div>
