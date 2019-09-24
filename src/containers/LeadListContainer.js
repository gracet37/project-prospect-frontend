import React, { Component } from 'react';
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import EnhancedTable from '../components/LeadsList'
import {connect} from 'react-redux'

class LeadListContainer extends Component {

  render() {
    return (
      <div>
        <Dashboard />
        {/* <EnhancedTable allLeads={this.props.leads}/> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    leads: state.leads
  }
}

export default connect(mapStateToProps, null)(LeadListContainer);