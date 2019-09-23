import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import LeadListContainer from "../containers/LeadListContainer";
import SearchContainer from "../containers/SearchContainer";
import UserProfile from "./UserProfile";
import SearchResults from "./SearchResults";
import SearchResultsTest from "./SearchResultsTest";
import LoginForm from "./LoginForm";
import NewUserForm from "./NewUserForm";
import LandingPage from "./LandingPage";
import { connect } from "react-redux";
import { currentUser } from "../actions";

// const LEADS_URL = 'http://localhost:3000/api/v1/leads'

class App extends React.Component {
  componentDidMount() {
    this.props.currentUser(this.props.history);
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/login" component={LoginForm}/>
          <Route exact path="/results" component={SearchResults} />
          <Route exact path="/leadlists" component={LeadListContainer} />
          <Route exact path="/profile" component={UserProfile} />
          <Route exact path="/search" component={SearchContainer} />
          <Route exact path="/signup" component={NewUserForm} />
        </Switch>
        {/* <Route exact path="/logout" component={} /> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    currentUser: history => dispatch(currentUser(history))
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
)(withRouter(App));
