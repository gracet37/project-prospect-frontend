import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import { connect } from "react-redux";
import { thunkFetchLists } from "../actions/lists";
import { withRouter } from "react-router-dom";

class LeadListContainer extends Component {
  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${"https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/s2048x2048/70590332_836756946718765_3473765009224368128_n.png?_nc_cat=111&_nc_oc=AQnI8TKKO2F4LqO-fZDRyZuRDWWLWhMONIpEB2mHf1QEmAP04HdNNIq8JU0QUq5LYwE&_nc_ht=scontent-ort2-2.xx&oh=e9db466921239dad5b5ae5b132f1f40f&oe=5E3DD369"})`,
          backgroundSize: "cover",
          minHeight: "1000px"
        }}
      >
        <Navbar />
        <Dashboard />
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     thunkFetchLists: id => {
//       dispatch(thunkFetchLists(id));
//     }
//   };
// };

const mapStateToProps = state => {
  return {
    leads: state.leads,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { thunkFetchLists }
)(withRouter(LeadListContainer));
