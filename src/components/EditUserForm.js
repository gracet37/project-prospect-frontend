// ! This is an unfinished Component


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
import { updateUser} from "../actions";

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

class EditUserForm extends Component {
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
    this.props.updateUser(this.state, this.props.history);
  };

  render() {
    return (
      <div className="edit-user-form">
        <Grid textAlign="center" verticalAlign="middle">
          <Form.Group>
            <Form style={styleForm} size="large" onSubmit={this.handleSubmit}>
              <Header as="h2" style={{ color: "#03DAC6" }} textAlign="center">
                Edit Account
              </Header>
              <Segment>
                <Form.Input
                  onChange={this.handleChange}
                  name="firstName"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder={this.props.auth.user.first_name}
                />
                <Form.Input
                  onChange={this.handleChange}
                  name="lastName"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder={this.props.auth.user.last_name}
                />
                <Form.Input
                  onChange={this.handleChange}
                  name="email"
                  fluid
                  icon="envelope open icon"
                  iconPosition="left"
                  placeholder={this.props.auth.user.email}
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
                  Update Account
                </Button>
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
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  {updateUser}
)(withRouter(EditUserForm));
