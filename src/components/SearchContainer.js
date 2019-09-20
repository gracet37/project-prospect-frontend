import React, { Component } from 'react';
import { Form, Dropdown } from 'semantic-ui-react'

const searchOptions = [{key: "industry", text: "Industry", value: "industry"},{key: "domain", text: "Company Domain", value: "domain"}]

const styleDropdown = {
  width: '20%'
}

class SearchContainer extends Component {
  state = {
    selectionParam: "",
    searchParam: ""
  }

  handleDropdown = (e, data) => {
    const targetValue = data.value 
    const targetName = data.name
    this.setState({[targetName]: targetValue})
  }

  handleChange = (e) => {
    const targetValue = e.target.value 
    const targetName = e.target.name 
    this.setState({[targetName]: targetValue})
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <Form>
          <Form.Group widths='equal'>
            <Dropdown onChange={this.handleDropdown} name="selectionParam" style={styleDropdown} placeholder="Search by..." fluid selection options={searchOptions} />
            <Form.Input onChange={this.handleChange} name="searchParam" fluid placeholder="Industry or Domain Name"/>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default SearchContainer;