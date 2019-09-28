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
      <div style={{backgroundImage: `url(${"https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/s2048x2048/71093458_463527317706998_6857018496128122880_n.png?_nc_cat=101&_nc_oc=AQl2gDIEaIvqJ9nlneGMjfaDHtgfbFjLjkXKrF1ATz_lG8I8Qq2SYVjDCYwbysjSCwM&_nc_ht=scontent-ort2-2.xx&oh=644556da3c91d328452fcb67714c1c7d&oe=5E3A8CD8"})`}}>
       <Navbar />
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
