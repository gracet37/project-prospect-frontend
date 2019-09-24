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
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SearchContainer from "../containers/SearchContainer";
import { login } from "../actions";
import "../App.css";

// const styleColumn = {
//   float: "left",
//   width: "50%",
//   padding: "14px"
//   // margin: '10px'
// };

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

  render() {
    console.log(this.state);
    return (
      <div className="login-form">
          <Grid textAlign="center" verticalAlign="middle">
            <Form.Group>
              <Form style={styleForm} size="large" onSubmit={this.handleSubmit}>
                <Header as="h2" style={{ color: "#03DAC6" }} textAlign="center">
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
                    style={{ backgroundColor: "#03DAC6", color: "white" }}
                    fluid
                    size="large"
                  >
                    Login
                  </Button>
                  <NavLink
                    style={{marginTop: '20px'}}
                    to="/signup"
                    activeClassName="hurray"
                  >
                    New User
                  </NavLink>
                </Segment>
              </Form>
            </Form.Group>
            {/* </Grid.Column> */}
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (formData, history) => {
      dispatch(login(formData, history));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginForm));
