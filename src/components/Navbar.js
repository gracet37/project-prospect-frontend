import React from "react";
import { Link, withRouter } from "react-router-dom";
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

  componentDidMount() {
    this.props.currentUser();
  }

  handleLogout = () => {
    this.props.logoutUser();
    localStorage.removeItem("token");
    this.props.history.push("/");
    // redirect to landing page
  };

  handleClearMessage = () => {
    this.props.clearMessage();
  };

  renderNavBar() {
    const { fixed } = this.state;
    if (this.props.auth.user) {
      return (
        <Menu
          fixed={fixed ? "top" : null}
          secondary={true}
          size="large"
          style={{ backgroundColor: "white" }}
        >
          <Container>
            <Menu.Item
              style={menuStyle}
              as={Link}
              to="/"
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
            <Menu.Item
              position="right"
              style={menuStyleRight}
              as={Link}
              to={this.props.auth.user ? "/profile" : "/login"}
              onClick={this.props.clearMessage}
            >
              {/* <Image
                circular
                size="mini"
                // src={this.props.auth.user.img_url}
                src="https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=3e378252a934e660f231666b51bd269a"
              ></Image> */}
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
              onClick={() => this.handleLogout()}
            >
              Logout
            </Menu.Item>
          </Container>
        </Menu>
      );
    } else {
      return null
    }
  }

  render() {
    // const { fixed } = this.state;
    return <div>{this.renderNavBar()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logoutUser, clearMessage, currentUser }
)(withRouter(Navbar));
