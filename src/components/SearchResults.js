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
  Checkbox,
  Pagination
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
    leadsArray: [], 
    activePage: 1,
    leadsPagination: []
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

  handleSubmit = () => {
    const { leadsArray, company, website, listId, newListName } = this.state;
    console.log("SUBMIT", this.state);
    const userId = this.props.auth.user.id;
    this.props.addLead(
      leadsArray,
      company,
      website,
      listId,
      newListName,
      userId
    );
  };

  handleLeadClick = (lead, checked) => {
    console.log(lead);
    console.log(checked);
    if (checked) {
      this.setState({ leadsArray: [...this.state.leadsArray, lead] });
    } else {
      const newArray = this.state.leadsArray.filter(
        l => l.value !== lead.value
      );
      this.setState({ leadsArray: newArray });
    }
  };

  handlePageChange = (activePage) => {
    this.setState({activePage})
  }

  render() {
    const { activePage } = this.state
    const dataArray = this.props.leads[0];
    const dataArrayEmails = this.props.leads[0].emails;
    let dataSlice
    if (activePage === 1) {
      dataSlice = dataArrayEmails.slice(0,9)
    } else if (activePage === 2) {
      dataSlice = dataArrayEmails.slice(10,19)
    } else if (activePage === 3) {
      dataSlice = dataArrayEmails.slice(20,29)
    } else if (activePage === 4) {
      dataSlice = dataArrayEmails.slice(30,39)
    } else if (activePage === 5) {
      dataSlice = dataArrayEmails.slice(40,49)
    } else if (activePage === 6) {
      dataSlice = dataArrayEmails.slice(50,59)
    } else if (activePage === 7) {
      dataSlice = dataArrayEmails.slice(60,69)
    } else if (activePage === 8) {
      dataSlice = dataArrayEmails.slice(70,79)
    } else if (activePage === 9) {
      dataSlice = dataArrayEmails.slice(80,89)
    } else if (activePage === 10) {
      dataSlice = dataArrayEmails.slice(90,99)
    } else {
      dataSlice = []
    }


    // const dataArraySLICE = dataArrayTEST.slice(10,19);
    // console.log("data test", dataArrayTEST)
    // console.log("data sliced???", dataArraySLICE)
    // console.log(typeof dataArrayTEST)

    // const leadsPagination = [
    //   {
    //     activePage: 1,
    //     data: dataArray.slice(0,9)
    //   },
    //   {
    //     activePage: 2,
    //     data: dataArray.slice(10,19)
    //   },
    //   {
    //     activePage: 3,
    //     data: dataArray.slice(20,29)
    //   },
    //   {
    //     activePage: 4,
    //     data: dataArray.slice(30,39)
    //   },
    //   {
    //     activePage: 5,
    //     data: dataArray.slice(40,49)
    //   },
    //   {
    //     activePage: 6,
    //     data: dataArray.slice(50,59)
    //   },
    //   {
    //     activePage: 7,
    //     data: dataArray.slice(60,69)
    //   },
    //   {
    //     activePage: 8,
    //     data: dataArray.slice(70,79)
    //   },
    //   {
    //     activePage: 9,
    //     data: dataArray.slice(80,89)
    //   },
    //   {
    //     activePage: 10,
    //     data: dataArray.slice(90,99)
    //   }
    // ]

    console.log("state", this.state);
    console.log("list props", this.props.lists[0]);
    let listArray = [];
    let lists = this.props.lists[0];
    Object.keys(lists).forEach(function(i) {
      listArray.push({
        key: lists[i].id,
        text: lists[i].name,
        value: lists[i].id
      });
    });
    // console.log("searchoptions", searchOptions)
    // console.log("list array", this.);
    // const dataArray = this.props.leads[0];
    // console.log("leads pagination", leadsPagination);
    // const dataArray = 
    // const tableRow = dataArray.emails.map(lead => {
      const tableRow = dataSlice.map(lead => {
      return (
        <Table.Row>
          <Table.Cell>{lead.first_name}</Table.Cell>
          <Table.Cell>{lead.last_name}</Table.Cell>
          <Table.Cell>{lead.value}</Table.Cell>
          <Table.Cell>{lead.position}</Table.Cell>
          <Table.Cell>{dataArray.organization}</Table.Cell>
          <Table.Cell>{lead.confidence}</Table.Cell>
          <Table.Cell>
            <Checkbox
              onClick={(event, { checked }) =>
                this.handleLeadClick(lead, checked)
              }
            />
          </Table.Cell>
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
        <div>
          <h1>
            SEARCH RESULTS
          </h1>
        </div>
        <Table singleLine>
          <Table.Header>
            {this.state.leadsArray.length > 0 ? (
              <Table.Row>
                <Table.HeaderCell colSpan="6">
                  {this.state.leadsArray.length} leads selected
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Modal
                    centered
                    trigger={
                      <Button onClick={this.handleLeadChange}>
                        Save Leads
                      </Button>
                    }
                    basic
                    size="small"
                  >
                    {Object.keys(lists).length > 1 ? (
                      <div>
                        <Modal.Header as="h2">
                          Select an Existing List:
                        </Modal.Header>
                        <Modal.Actions>
                          <Dropdown
                            onChange={this.handleDropdown}
                            name="listId"
                            style={styleDropdown}
                            placeholder="Select list..."
                            fluid
                            disabled={this.state.newListName ? true : false}
                            selection
                            options={listArray}
                          />
                          <Modal.Header as="h2">
                            Create a New List:
                          </Modal.Header>
                          <Form.Input
                            placeholder="Create new list..."
                            onChange={this.handleChange}
                            name="newListName"
                          />
                          <Modal.Header as="h2"></Modal.Header>
                          <Button
                            onClick={this.handleSubmit}
                            basic
                            color="blue"
                            inverted
                          >
                            <Icon name="add" /> Add Lead to List
                          </Button>
                        </Modal.Actions>
                      </div>
                    ) : (
                      <div>
                        <Modal.Header as="h2">Create A New List</Modal.Header>
                        <Modal.Actions>
                          <Form.Input
                            placeholder="Create new list..."
                            onChange={this.handleChange}
                            name="newListName"
                          />
                          <Button
                            onClick={this.handleSubmit}
                            basic
                            color="blue"
                            inverted
                          >
                            <Icon name="add" /> Add Lead to List
                          </Button>
                        </Modal.Actions>
                      </div>
                    )}
                  </Modal>
                </Table.HeaderCell>
              </Table.Row>
            ) : null}
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
                <Pagination
                  boundaryRange={0}
                  defaultActivePage={1}
                  ellipsisItem={"..."}
                  firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                  lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                  prevItem={{ content: <Icon name='angle left' />, icon: true }}
                  nextItem={{ content: <Icon name='angle right' />, icon: true }}
                  siblingRange={1}
                  totalPages={10}
                  onPageChange={(event, { activePage }) => this.handlePageChange(activePage)}
                />
                {/* <Menu floated="right" pagination>
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
                </Menu> */}
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
    addLead: (leadsArray, company, website, listId, newListName, userId) => {
      dispatch(
        addLead(leadsArray, company, website, listId, newListName, userId)
      );
    }
  };
};

// Connect this component to all returns for the company search
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
