import React, { Component } from 'react'
import {
  Header, Button
} from "semantic-ui-react";
import "../App.css";
import { Link } from 'react-router-dom'

const style = { 
    height: "10em",
    position: "relative",
    marginTop: '300px'
 }

export default class LandingPage extends Component {



  render() {
    return (
      <div className="landing-page-container">
        <div className="landing-page" style={style}>
          <Header as='h1'> Search For Prospects Instantly </Header>
          <Button as='h1' as={Link} to='/login'> Login </Button>
          <Button as='h1' as={Link} to='/signup'> New User </Button>
        </div>
      </div>
    )
  }
}
