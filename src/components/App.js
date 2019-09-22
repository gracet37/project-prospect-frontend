import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import LeadListContainer from "../containers/LeadListContainer";
import SearchContainer from "../containers/SearchContainer";
import UserProfile from "./UserProfile";
import SearchResults from "./SearchResults";
import SearchResultsTest from "./SearchResultsTest";
import LoginForm from "./LoginForm";
import NewUserForm from "./NewUserForm";
import {connect} from "react-redux";

// const LEADS_URL = 'http://localhost:3000/api/v1/leads'

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <LoginForm />
      <Route exact path="/" component={SearchContainer} />
      <Route exact path="/results" component={SearchResults} />
      <Route exact path="/leadlists" component={LeadListContainer} />
      <Route exact path="/profile" component={UserProfile} />
      {/* <Route exact path="/logout" component={} /> */}
      {/* {this.props.leads.length > 0 ? <Redirect to='/' /> : null} */}
    </div>
  );
};

const mapStateToProps = state => {
  return {leads: state.leads}
}

export default connect(mapStateToProps, null)(App);
