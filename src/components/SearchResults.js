import React, { Component } from "react";
import {
  Table,
  Menu,
  Form,
  Icon,
  Modal,
  Header,
  Button,
  Dropdown,
  Input,
  Checkbox
} from "semantic-ui-react";
import { connect } from "react-redux";
import { addList, addLead } from "../actions";
import Navbar from "./Navbar";

const uuidv1 = require("uuid/v1");

const styleDropdown = {
  width: "40%"
};

class SearchResults extends Component {
  state = {
    listId: "",
    leadSelection: "",
    company: "",
    website: "",
    newListName: "",
    leadsArray: []
  };

  componentDidMount() {
    const array = this.props.leads[0];
    this.setState({ company: array.organization, website: array.domain });
  }

  handleDropdown = (e, data) => {
    const targetValue = data.value;
    this.setState({ listId: targetValue });
  };

  handleChange = e => {
    const targetValue = e.target.value;
    const targetName = e.target.name;
    this.setState({ [targetName]: targetValue });
  };

  handleLeadChange = lead => {
    this.setState({ leadSelection: lead });
  };

  handleSubmit = () => {
    const { leadSelection, company, website, listId, newListName } = this.state;
    const userId = this.props.auth.id
    this.props.addLead(leadSelection, company, website, listId, newListName, userId);
    // this.props.addList(this.state.listId)
  };

  handleLeadClick = (lead, checked) => {
    console.log(lead)
    console.log(checked)
    if (checked) { 
    this.setState({leadsArray: [...this.state.leadsArray, lead]})
    } else {
      const newArray = this.state.leadsArray.filter(l => l.value !== lead.value) 
      this.setState({ leadsArray: newArray })
    }
  }

  handleTest = () => {
    console.log("TEST");
  };

  render() {
    console.log("state", this.state);
    console.log("list props", this.props.lists);
    let listArray = [];
    let lists = this.props.lists[0];
    // Object.keys(lists).forEach(function(i) {
    //   listArray.push({
    //     key: lists[i].id,
    //     text: lists[i].name,
    //     value: lists[i].id
    //   });
    // });
    // console.log("searchoptions", searchOptions)
    const dataArray = this.props.leads[0];
    console.log(dataArray);
    const tableRow = dataArray.emails.map(lead => {
      return (
        <Table.Row>
          <Table.Cell>{lead.first_name}</Table.Cell>
          <Table.Cell>{lead.last_name}</Table.Cell>
          <Table.Cell>{lead.value}</Table.Cell>
          <Table.Cell>{lead.position}</Table.Cell>
          <Table.Cell>{dataArray.organization}</Table.Cell>
          <Table.Cell>{lead.confidence}</Table.Cell>
          <Table.Cell><Checkbox onClick={(event, { checked }) => this.handleLeadClick(lead, checked)}/></Table.Cell>
          {/* <Table.Cell>
            <Modal
              centered
              trigger={
                <Button onClick={() => this.handleLeadChange(lead)}>Add</Button>
              }
              basic
              size="small"
            >
              {Object.keys(lists).length > 1 ? (
                <div>
                  <Modal.Header as='h2'>Select an Existing List:</Modal.Header>
                  <Modal.Actions>
                    <Dropdown
                      onChange={this.handleDropdown}
                      name="listId"
                      style={styleDropdown}
                      placeholder="Select list..."
                      fluid
                      selection
                      options={listArray}
                    />
                    <Form.Input
                      placeholder="Create new list..."
                      onChange={this.handleChange}
                      name="newListName"
                    />
                    <Button
                      onClick={this.handleSubmit}
                      basic
                      color="red"
                      inverted
                    >
                      <Icon name="add" /> Add Lead to List
                    </Button>
                  </Modal.Actions>{" "}
                </div>
              ) : (
                <div>
                  <Modal.Header as='h2'>
                    You have no existing lists. 
                    Create a new list:
                  </Modal.Header>
                  <Modal.Actions>
                    <Form.Input
                      placeholder="Create new list..."
                      onChange={this.handleChange}
                      name="newListName"
                    />
                    <Button
                      onClick={this.handleSubmit}
                      basic
                      color="red"
                      inverted
                    >
                      <Icon name="add" /> Add Lead to List
                    </Button>
                  </Modal.Actions>
                </div>
              )}
            </Modal>
          </Table.Cell> */}
        </Table.Row>
      );
    });
    return (
      <div>
        <Navbar />
        <Table singleLine>
          <Table.Header>
            {this.state.leadsArray.length > 0 ? 
          <Table.Row>
              <Table.HeaderCell>{this.state.leadsArray.length} leads selected</Table.HeaderCell>
              <Table.HeaderCell><Button>Save</Button></Table.HeaderCell>
            </Table.Row> : null }
            <Table.Row>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Position</Table.HeaderCell>
              <Table.HeaderCell>Company</Table.HeaderCell>
              <Table.HeaderCell>Confidence</Table.HeaderCell>
              <Table.HeaderCell>Save Lead</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{tableRow}</Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    leads: state.leads,
    lists: state.lists,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addList: listName => {
      dispatch(addList(listName));
    },
    addLead: (leadObj, company, website, listId) => {
      dispatch(addLead(leadObj, company, website, listId));
    }
  };
};

// Connect this component to all returns for the company search
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
