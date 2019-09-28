import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import { Link, withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions";

const styleColumn = {
  float: "left",
  width: "50%",
  padding: "14px"
  // margin: '10px'
};

const styleForm = {
  // float: "right",
  width: "500px",
  height: "400px",
  padding: "30px",
  margin: "40px",
  textAlign: 'center',
  marginTop: '150px'
  // paddingLeft: "20px"
};

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

  render() {
    return (
      <div className="new-user-form">
        <Grid textAlign="center" verticalAlign="middle">
          <Form.Group>
            <Form style={styleForm} size="large" onSubmit={this.handleSubmit}>
              <Header as="h2" style={{ color: "#03DAC6" }} textAlign="center">
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
                  style={{ backgroundColor: "#03DAC6", color: "white" }}
                  fluid
                  size="large"
                >
                  Create Account
                </Button>
                <NavLink to="/" activeClassName="hurray">
                  Back to Login
                </NavLink>
              </Segment>
            </Form>
          </Form.Group>
        </Grid>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    registerUser: (formData, history) =>
      dispatch(registerUser(formData, history))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(NewUserForm));
