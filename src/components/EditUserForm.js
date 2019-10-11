// ! This is an unfinished Component


import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment
} from "semantic-ui-react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser} from "../actions/user";

const styleForm = {
  width: "500px",
  height: "400px",
  padding: "30px",
  margin: "40px",
  textAlign: 'center',
  marginTop: '100px'
};

const style = {
  backgroundImage: `url(${"https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/s2048x2048/70590332_836756946718765_3473765009224368128_n.png?_nc_cat=111&_nc_oc=AQnI8TKKO2F4LqO-fZDRyZuRDWWLWhMONIpEB2mHf1QEmAP04HdNNIq8JU0QUq5LYwE&_nc_ht=scontent-ort2-2.xx&oh=e9db466921239dad5b5ae5b132f1f40f&oe=5E3DD369"})`,
  backgroundSize: "cover",
  minHeight: '800px'
}

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
      <div className="edit-user-form" style={style}>
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
                  style={{ backgroundColor: "#03DAC6", color: "white", marginBottom: '10px'  }}
                  fluid
                  size="large"
                >
                  Update Account
                </Button>
                <NavLink
                   style={{color: '#43425D'}}
                    to="/profile"
                    activeClassName="hurray"
                  >
                    Back to My Profile
                  </NavLink>
                  <br/>
                  <NavLink
                   style={{color: '#43425D'}}
                    to="/"
                    activeClassName="hurray"
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
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  {updateUser}
)(withRouter(EditUserForm));
