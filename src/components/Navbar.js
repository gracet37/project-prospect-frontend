import React from "react";
import { Link, withRouter } from "react-router-dom";
<<<<<<< HEAD
import { clearMessage } from "../actions";
import { logoutUser, currentUser } from "../actions/auth";
import { connect } from "react-redux";
import { Image, Menu, Container } from "semantic-ui-react";

// const styleBar = {
//   overflow: "hidden",
//   margin: "10px",
//   height: "50px",
//   textAlign: "center",
//   verticalAlign: "middle",
//   position: "fixed",
//   opacity: "0",
//   zIndex: "1",
//   top: "0",
//   width: "100%"
// };

// const styleLinkLeft = {
//   marginLeft: "10px",
//   float: "left",
//   display: "block",
//   color: "#6206EE",
//   textAlign: "center",
//   padding: "14px 16px",
//   fontSize: "17px",
//   textDecoration: "none",
//   marginLeft: "20px"
// };

// const styleLinkRight = {
//   float: "right",
//   display: "block",
//   color: "#6206EE",
//   textAlign: "center",
//   padding: "14px 16px",
//   fontSize: "17px",
//   textDecoration: "none"
// };
=======
import { logoutUser, clearMessage } from "../actions";
import { connect } from "react-redux";
import { Image, Menu, Container } from "semantic-ui-react";

const styleBar = {
  overflow: "hidden",
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
>>>>>>> b722cbf115b1d614d934d8c54f5ab2e5ba3426bb

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
<<<<<<< HEAD

  componentDidMount() {
    this.props.currentUser();
  }

=======
>>>>>>> b722cbf115b1d614d934d8c54f5ab2e5ba3426bb
  handleLogout = () => {
    this.props.logoutUser();
    localStorage.removeItem("token");
    this.props.history.push("/");
    // redirect to landing page
  };

  handleClearMessage = () => {
    this.props.clearMessage();
  };

<<<<<<< HEAD
  renderNavBar() {
    const { fixed } = this.state;
    if (this.props.auth.user) {
      return (
        <Menu
          fixed={fixed ? "top" : null}
          secondary={true}
          size="large"
=======
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
>>>>>>> b722cbf115b1d614d934d8c54f5ab2e5ba3426bb
          style={{ backgroundColor: "white" }}
        >
          <Container>
            <Menu.Item
              style={menuStyle}
              as={Link}
              to="/"
<<<<<<< HEAD
=======
              // active
>>>>>>> b722cbf115b1d614d934d8c54f5ab2e5ba3426bb
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
<<<<<<< HEAD
=======
            {/* <Menu.Item
              style={menuStyle}
              as={Link}
              to={this.props.auth.user ? "/profile" : "/login"}
              onClick={this.props.clearMessage}
            >
              My Account
            </Menu.Item> */}
>>>>>>> b722cbf115b1d614d934d8c54f5ab2e5ba3426bb
            <Menu.Item
              position="right"
              style={menuStyleRight}
              as={Link}
              to={this.props.auth.user ? "/profile" : "/login"}
              onClick={this.props.clearMessage}
            >
<<<<<<< HEAD
              {/* <Image
                circular
                size="mini"
                // src={this.props.auth.user.img_url}
                src="https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=3e378252a934e660f231666b51bd269a"
              ></Image> */}
=======
              <Image
                circular
                size="mini"
                src={this.props.auth.user.img_url}
              ></Image>
>>>>>>> b722cbf115b1d614d934d8c54f5ab2e5ba3426bb
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
<<<<<<< HEAD
=======
              // to={this.props.auth.user ? "/profile" : "/login"}
>>>>>>> b722cbf115b1d614d934d8c54f5ab2e5ba3426bb
              onClick={() => this.handleLogout()}
            >
              Logout
            </Menu.Item>
          </Container>
        </Menu>
<<<<<<< HEAD
      );
    } else {
      return null
    }
  }

  render() {
    // const { fixed } = this.state;
    return <div>{this.renderNavBar()}</div>;
=======
      </div>
    );
>>>>>>> b722cbf115b1d614d934d8c54f5ab2e5ba3426bb
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
<<<<<<< HEAD
  { logoutUser, clearMessage, currentUser }
)(withRouter(Navbar));
=======
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
>>>>>>> b722cbf115b1d614d934d8c54f5ab2e5ba3426bb
