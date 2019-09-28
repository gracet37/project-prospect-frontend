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

const styleSearchBar = {

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
      <div>
        {/* {this.state.searchClicked ? <Loading /> : null} */}
        {/* <Form>  */}
            <Form >
              <Form.Group >
              <Form.Input
                onChange={this.handleChange}
                name="searchParam"
                placeholder="Enter domain name..."
                loading={this.state.searchClicked ? true : false }
                style={{fontSize:"large", marginLeft:"40px", marginTop:"20px", height:"50px", borderColor:"#6200EE", borderWidth:"medium", width:"490px"}}
              />
              <Button style={{fontSize:"large", backgroundColor:"#6200EE", marginTop:"20px",color: 'white', width:"120px"}} type="submit" onClick={this.handleSubmit}>
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
