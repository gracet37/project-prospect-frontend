import React, { Component } from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class UserProfile extends Component {
  render() {
    return (
      <div>
        <Navbar />
        This is {this.props.auth.user.first_name} profile page
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(withRouter(UserProfile))
