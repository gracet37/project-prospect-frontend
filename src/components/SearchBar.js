import React, { Component } from "react";
import { Form, Dropdown, Button } from "semantic-ui-react";
import { thunkFetchCategories, thunkFetchLeads } from "../actions";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';

var HunterSDK = require("hunterio");

var KEY = "7ca084937e5e049696b7bb64c10366c3d077c650";

var hunter = new HunterSDK(KEY);

/////////////////////// STYLING /////////////////////////
const searchOptions = [
  { key: "industry", text: "Industry", value: "industry" },
  { key: "domain", text: "Company Domain", value: "domain" }
];

const styleDropdown = {
  width: "20%"
};

const CATEGORY_URL = "http://localhost:3000/api/v1/categories";
const LEADS_URL =  "http://localhost:3000/api/v1/leads"

/////////////////////// STYLING /////////////////////////

class SearchBar extends Component {
  state = {
    selectionParam: "",
    searchParam: "",
    locationParam: "",
    leadsResults: []
  };

  handleDropdown = (e, data) => {
    const targetValue = data.value;
    const targetName = data.name;
    this.setState({ [targetName]: targetValue });
  };

  handleChange = e => {
    const targetValue = e.target.value;
    const targetName = e.target.name;
    this.setState({ [targetName]: targetValue });
  };

  handleSubmit = () => {
    this.props.thunkFetchLeads(this.state.searchParam, this.props.history)
  };


  render() {
    console.log(this.state);
    return (
      <div>
        <Form>
          <Dropdown
            onChange={this.handleDropdown}
            name="selectionParam"
            style={styleDropdown}
            placeholder="Search by..."
            fluid
            selection
            options={searchOptions}
          />
          {this.state.selectionParam === "industry" ? (
            <Form>
              <Form.Input
                onChange={this.handleChange}
                name="searchParam"
                fluid
                placeholder="Industry"
              />
              <Form.Input
                onChange={this.handleChange}
                name="locationParam"
                fluid
                placeholder="Enter city name..."
              />
              <Button type="submit">Search</Button>
            </Form>
          ) : (
            <Form>
              <Form.Input
                onChange={this.handleChange}
                name="searchParam"
                fluid
                placeholder="Enter domain name..."
              />
              <Button type="submit" onClick={this.handleSubmit}>
                Search D
              </Button>
            </Form>
          )}
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    thunkFetchCategories: () => {
      dispatch(thunkFetchCategories());
    },
    thunkFetchLeads: (domainName, history) => {
      dispatch(thunkFetchLeads(domainName, history))
    }
  };
};

const mapStateToProps = state => {
  return {
    categories: state.categories,
    leads: state.leads
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchBar));
