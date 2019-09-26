import React, { Component } from 'react';
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import {connect} from 'react-redux'
import { thunkFetchLists } from "../actions";
import { withRouter} from "react-router-dom";




class LeadListContainer extends Component {

  componentDidMount() {
    // // this.props.thunkFetchLists(17)
    // if (this.props.auth.user.id) {
    // this.thunkFetchLists(this.props.auth.user.id)
    } 

  render() {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }
}



const mapDispatchToProps = dispatch => {
  return {
    thunkFetchLists: (id) => {
      dispatch(thunkFetchLists(id));
    }
  };
};

const mapStateToProps = state => {
  return {
    leads: state.leads,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LeadListContainer));
