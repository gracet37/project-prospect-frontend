import React, { Component } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import SearchResultsTest from "../components/SearchResultsTest";
import NavBar from "../components/Navbar";
import LoginForm from "../components/LoginForm";
import { thunkFetchLeads, thunkFetchLists } from "../actions";
import { connect } from "react-redux";

const CATEGORY_URL = "http://localhost:3000/api/v1/categories";
const LEADS_URL = "http://localhost:3000/api/v1/leads";

class SearchContainer extends Component {
  componentDidMount() {
    this.props.thunkFetchLists();
  }

  render() {
    // console.log(this.state)
    return (
      <div>
        {this.props.auth.id ? (
          <div>
            <NavBar />
            <SearchBar />
          </div>
        ) : (
          <LoginForm />
        )}
        {/* <SearchResultsTest />} */}
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {leads: state.leads}
// }

const mapDispatchToProps = dispatch => {
  return {
    thunkFetchLeads: () => {
      dispatch(thunkFetchLeads());
    },
    thunkFetchLists: () => {
      dispatch(thunkFetchLists());
    }
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);
