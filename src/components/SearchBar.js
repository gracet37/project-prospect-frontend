import React, { Component } from "react";
import { Form, Loader, Button } from "semantic-ui-react";
import { thunkFetchLeads, fetchError } from "../actions";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Loading from "./Loading";
import "../App.css";
/////////////////////// STYLING /////////////////////////

const styleSearchBar = {
  marginLeft: "30px",
  marginTop: "10px",
  width: "500px",
  borderRadius: "50px",
  borderColor: "#6200EE",
  borderWidth: "3px",
  height: "60px",
  fontSize: "large"
};

/////////////////////// STYLING /////////////////////////

class SearchBar extends Component {
  state = {
    searchParam: "",
    leadsResults: [],
    searchClicked: false
  };

  handleChange = e => {
    const targetValue = e.target.value;
    const targetName = e.target.name;
    this.setState({ [targetName]: targetValue });
  };

  handleSubmit = () => {
    if (this.state.searchParam) {
      if (this.props.auth.user) {
        this.setState({ searchClicked: true });
        this.props.thunkFetchLeads(this.state.searchParam, this.props.history);
      } else {
        this.props.fetchError("Oops! You need to be logged in to do that.");
        this.props.history.push("/login");
      }
    }
  };

  render() {
    return (
      <div style={{ verticalAlign: "center", textAlign: "center" }}>
        {/* {this.state.searchClicked ? <Loading /> : null} */}
        {/* <Form>  */}
        <Form>
          <Form.Group>
            <Form.Input
              onChange={this.handleChange}
              name="searchParam"
              placeholder="Enter domain name..."
              // loading={this.state.searchClicked ? true : false}
            >
              <input style={styleSearchBar} required />
            </Form.Input>
            <Button
              type="submit"
              loading={this.state.searchClicked ? true : false}
              onClick={this.handleSubmit}
              style={{
                borderRadius: "50px",
                marginLeft: "10px",
                backgroundColor: "#6200EE",
                color: "white",
                marginTop: "10px",
                width: "130px",
                height: "60px",
                fontSize: "large",
                textAlign: "center"
              }}
            >
              Search
            </Button>
          </Form.Group>
        </Form>
        {/* </Form> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    thunkFetchLeads: (domainName, history) => {
      dispatch(thunkFetchLeads(domainName, history));
    },
    fetchError: error => {
      dispatch(fetchError(error));
    }
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    categories: state.categories,
    leads: state.leads
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchBar));
