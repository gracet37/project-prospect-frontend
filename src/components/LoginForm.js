import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment
} from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login, clearMessage } from "../actions";
import "../App.css";

const styleForm = {
  // float: "right",
  width: "500px",
  height: "400px",
  padding: "30px",
  margin: "40px",
  textAlign: 'center',
  marginTop: '120px'
  // paddingLeft: "20px"
};

const style = {
  backgroundImage: `url(${"https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/s2048x2048/70590332_836756946718765_3473765009224368128_n.png?_nc_cat=111&_nc_oc=AQnI8TKKO2F4LqO-fZDRyZuRDWWLWhMONIpEB2mHf1QEmAP04HdNNIq8JU0QUq5LYwE&_nc_ht=scontent-ort2-2.xx&oh=e9db466921239dad5b5ae5b132f1f40f&oe=5E3DD369"})`,
  backgroundSize: "cover",
  minHeight: '1000px'
}

class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.state, this.props.history);
  };

  handleClearMessage() {
    this.props.clearMessage()
  }

  render() {
    console.log(this.state);
    return (
      <div style={style} className="login-form">
          <Grid textAlign="center" verticalAlign="middle">
            <Form.Group>
              <Form style={styleForm} size="large" onSubmit={this.handleSubmit}>
                {this.props.message ?  <Header as="h3" style={{ color: "#E57373" }} textAlign="center">
                  {this.props.message}
                  </Header> : null}
             
                <Header as="h1" style={{ color: "#03DAC6" }} textAlign="center">
                  Log-in
                </Header>
                <Segment>
                  <Form.Input
                    onChange={this.handleChange}
                    name="email"
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    name="password"
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                  />
                  <Button
                    style={{ backgroundColor: "#03DAC6", color: "white", marginBottom: '10px' }}
                    fluid
                    size="large"
                  >
                    Login
                  </Button>
                  <NavLink
                    style={{color: '#43425D'}}
                    to="/signup"
                    activeClassName="hurray"
                    onClick={() => this.handleClearMessage()}
                  >
                    New User
                  </NavLink>
                  <br/>
                  <NavLink
                   style={{color: '#43425D'}}
                    to="/"
                    activeClassName="hurray"
                    onClick={() => this.handleClearMessage()}
                  >
                    Home
                  </NavLink>
                </Segment>
              </Form>
            </Form.Group>
            {/* </Grid.Column> */}
          </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    message: state.message
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     login: (formData, history) => {
//       dispatch(login(formData, history));
//     }
//   };
// };

export default connect(
  mapStateToProps,
  {login, clearMessage}
)(withRouter(LoginForm));
