import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment
} from "semantic-ui-react";
import { Link, withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/auth";
import { clearMessage } from "../actions";

const styleColumn = {
  float: "left",
  width: "50%",
  padding: "14px"
};

const styleForm = {
  width: "500px",
  height: "400px",
  padding: "30px",
  margin: "40px",
  textAlign: 'center',
  marginTop: '150px'
};

const style = {
  backgroundImage: `url(${"https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/s2048x2048/70590332_836756946718765_3473765009224368128_n.png?_nc_cat=111&_nc_oc=AQnI8TKKO2F4LqO-fZDRyZuRDWWLWhMONIpEB2mHf1QEmAP04HdNNIq8JU0QUq5LYwE&_nc_ht=scontent-ort2-2.xx&oh=e9db466921239dad5b5ae5b132f1f40f&oe=5E3DD369"})`,
  backgroundSize: "cover",
  minHeight: '800px'
}

class NewUserForm extends Component {
  state = {
    firstName: "",
    lastName: "",
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
    this.props.registerUser(this.state, this.props.history);
  };

  handleError = () => {
    console.log(this.props.message)
    if (this.props.message) {
        return <Header as="h3" style={{ color: "#F44336" }} textAlign="center">
        {this.props.message[0]}
        </Header>
      } 
    }

    handleClearMessage() {
      this.props.clearMessage()
    }
  

  render() {
    console.log("new user form", this.state);
    console.log(this.props.message)
    return (
      <div className="new-user-form" style={style}>
        <Grid textAlign="center" verticalAlign="middle">
          <Form.Group>
            <Form style={styleForm} size="large" onSubmit={this.handleSubmit}>
              {this.handleError()}
              <Header as="h1" style={{ color: "#03DAC6" }} textAlign="center">
                Create A New Account
              </Header>
              <Segment>
                <Form.Input
                  onChange={this.handleChange}
                  name="firstName"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="First Name"
                />
                <Form.Input
                  onChange={this.handleChange}
                  name="lastName"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Last Name"
                />
                <Form.Input
                  onChange={this.handleChange}
                  name="email"
                  fluid
                  icon="envelope open icon"
                  iconPosition="left"
                  placeholder="Email"
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
                  Create Account
                </Button>
                <NavLink to="/login" activeClassName="hurray" onClick={() => this.handleClearMessage()} style={{color: '#43425D'}}>
                  Back to Login
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
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.message
  }
}

export default connect(
  mapStateToProps,
  {registerUser, clearMessage}
)(withRouter(NewUserForm));
