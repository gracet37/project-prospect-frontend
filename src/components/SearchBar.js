import React, { Component } from "react";
import { Form, Dropdown, Button } from "semantic-ui-react";
import { thunkFetchCategories, thunkFetchLeads } from "../actions";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import Loading from './Loading'
/////////////////////// STYLING /////////////////////////
const searchOptions = [
  { key: "industry", text: "Industry", value: "industry" },
  { key: "domain", text: "Company Domain", value: "domain" }
];

const styleDropdown = {
  width: "20%"
};

const styleDiv = {
  backgroundImage: "https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/s2048x2048/70590332_836756946718765_3473765009224368128_n.png?_nc_cat=111&_nc_oc=AQnqWP4HyrAi7q61EL8yVFptltQa3xI5h09a4-BztmyG9-4Dby2fVE1e_IVK7Rn_WHg&_nc_ht=scontent-ort2-2.xx&oh=1a1fd9abc2dba4016521fba11ffaa3b6&oe=5E3DD369"
}
/////////////////////// STYLING /////////////////////////

class SearchBar extends Component {
  state = {
    selectionParam: "",
    searchParam: "",
    locationParam: "",
    leadsResults: [],
    searchClicked: false
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
    this.setState({searchClicked: true})
    this.props.thunkFetchLeads(this.state.searchParam, this.props.history)
  };

  render() {
    console.log(this.state);
    return (
      <div style={styleDiv}>
        {/* {this.state.searchClicked ? <Loading /> : null} */}
        <Form style={styleDiv}> 
          {/* <Dropdown
            onChange={this.handleDropdown}
            name="selectionParam"
            style={styleDropdown}
            placeholder="Search by..."
            fluid
            selection
            options={searchOptions}
          /> */}
          {/* {this.state.selectionParam === "industry" ? ( */}
            {/* <Form>
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
          ) :  */}
          
            <Form centered>
              <Form.Group>
              <Form.Input
                onChange={this.handleChange}
                name="searchParam"
                placeholder="Enter domain name..."
                loading={this.state.searchClicked ? true : false }
              />
              <Button type="submit" onClick={this.handleSubmit}>
                Search
              </Button>
            </Form.Group>
            </Form>
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
