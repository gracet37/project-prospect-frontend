import React, { Component } from "react";
import { Form, Loader, Button } from "semantic-ui-react";
import { thunkFetchCategories, thunkFetchLeads } from "../actions";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Loading from "./Loading";
import "../App.css";
/////////////////////// STYLING /////////////////////////
const searchOptions = [
  { key: "industry", text: "Industry", value: "industry" },
  { key: "domain", text: "Company Domain", value: "domain" }
];

const styleSearchBar = {
  marginLeft: '30px',
  marginTop: '10px',
  width: "490px",
  borderRadius: "70px",
  borderColor: "#6200EE",
  borderWidth: "3px",
  height: "60px",
  fontSize: "large"
};

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
    this.setState({ searchClicked: true });
    this.props.thunkFetchLeads(this.state.searchParam, this.props.history);
  };

  render() {
    return (
      <div>
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
              <input style={styleSearchBar} />
            </Form.Input>
            <Button
              type="submit"
              loading={this.state.searchClicked ? true : false}
              onClick={this.handleSubmit}
              style={{borderRadius: "100px", marginLeft: '10px', backgroundColor: '#6200EE', color: 'white', marginTop: '10px', width: '130px',height: '60px', fontSize: 'large', textAlign: 'center' }}
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
    thunkFetchCategories: () => {
      dispatch(thunkFetchCategories());
    },
    thunkFetchLeads: (domainName, history) => {
      dispatch(thunkFetchLeads(domainName, history));
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
