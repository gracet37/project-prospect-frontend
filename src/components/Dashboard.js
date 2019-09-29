import React, { Component } from "react";
import {
  Grid,
  Image,
  Card,
  Table,
  Icon,
  Confirm,
  Button,
  Modal,
  Form,
  Header
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import Navbar from "./Navbar";
import { deleteList, thunkFetchListById, addList } from "../actions";

const uuidv1 = require("uuid/v1");

const styleMetrics = {
  borderWidth: "3px",
  borderRadius: "10px",
  borderColor: "#808495",
  borderStyle: "solid",
  margin: "40px", 
  width: "10px",
  height: "180px",
  padding: "20px"
}


class Dashboard extends Component {
  // UPDATE DATA WITH LISTS
  state = {
    column: null,
    data: [],
    direction: null,
    deleteConfirmation: false,
    totalLeadCount: 0,
    totalMeetingsBooked: 0,
    totalNotContacted: 0,
    newListName: ""
  };

  componentDidMount() {
    this.formattedListArray();
    //  ! this.countTotalLeads()
    this.countMeetingsBooked();
    this.countNotContacted();
  }

  show = dimmer => this.setState({ dimmer, deleteConfirmation: true });
  handleConfirm = () => this.setState({ deleteConfirmation: false });
  handleCancel = () => {
    this.setState({ deleteConfirmation: false });
    // let newArray = this.state.data.filter(data => data.id !== id);
    // this.setState({ data: newArray });
    // this.props.deleteList(id);
  };

  formattedListArray = () => {
    // if (this.props.lists.length) {
    let array = [];
    this.props.lists.forEach(list => {
      let date = new Date(list.created_at);
      let dateString = date.toDateString();
      array.push({
        id: list.id,
        name: list.name,
        date: dateString,
        leadCount: list.leads.length
      });
    });
    this.setState({ data: array });
    // return array
  };

  // ! countTotalLeads = () => {
  //   if (this.props.lists) {
  //   let leadCountArray = []
  //   let totalLeads
  //   console.log(this.props.lists)
  //   this.props.lists.forEach(list => {
  //     let count = list.leads.length
  //     leadCountArray.push(count)
  //   })
  //   totalLeads = leadCountArray.reduce((total, count) => total + count)
  //   this.setState({totalLeadCount: totalLeads})
  //   } else {
  //     return null
  //   }
  // }

  countMeetingsBooked = () => {
    let meetingsBookedCount = 0;
    if (this.props.listWithLeadNotes) {
      this.props.listWithLeadNotes.forEach(lead => {
        lead.leadnotes.forEach(leadnote => {
          if (leadnote.status === "Meeting booked") {
            meetingsBookedCount += 1;
          }
        });
      });
      this.setState({ totalMeetingsBooked: meetingsBookedCount });
    } else {
      return null;
    }
  };

  countNotContacted = () => {
    let notContacted = 0;
    // let testArray = []
    if (this.props.listWithLeadNotes) {
      this.props.listWithLeadNotes.forEach(lead => {
        if (lead.leadnotes.length < 1) {
          notContacted += 1;
        }
      });
      this.setState({ totalNotContacted: notContacted });
    } else {
      return null;
    }
  };

  handleConfirm = (event, id) => {
    event.preventDefault();
    let newArray = this.state.data.filter(data => data.id !== id);
    this.setState({ data: newArray, deleteConfirmation: false });
    // !this.countTotalLeads();
    this.countMeetingsBooked();
    this.countNotContacted();
    this.props.deleteList(id);
  };

  handleRowClick = id => {
    console.log("row clicked", id);
    this.props.thunkFetchListById(id, this.props.history);
  };

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  handleChange = e => {
    const targetValue = e.target.value;
    const targetName = e.target.name;
    this.setState({ [targetName]: targetValue });
  };

  handleSubmit = () => {
    const { newListName } = this.state;
    const userId = this.props.auth.user.id;
    this.props.addList(newListName, userId);
    this.formattedListArray();
  };

  render() {
    const {
      column,
      data,
      direction,
      totalLeadCount,
      totalMeetingsBooked,
      totalNotContacted
    } = this.state;
    // console.log(this.props.lists)
    console.log(this.state);
    return (
      <div>
        {/* METRIC CARDS */}
        <Grid>
          <Grid.Row
            columns="equal"
            style={{ top: '70px', paddingRight: "70px", paddingLeft: '70px', paddingBottom: "35px", position:'relative', textAlign: 'left'}}
          >
            <Grid.Column
              style={styleMetrics}
            >
              <Header as="h2">Total Leads</Header>
              <Header as='h3'>{totalLeadCount}</Header>
              <Image size='small' floated='right' src="https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/71338480_839476829779627_88982982114672640_n.png?_nc_cat=103&_nc_oc=AQk-PoFytrGO-egRH0bNhdK77YgmvNvozJbUsZvn9xAPPpjioM-SRk6hyr3rXfVVq2Y&_nc_ht=scontent-ort2-2.xx&oh=c1bc858aa386c365cae63c3eea610b9e&oe=5DF88CFF" />
            </Grid.Column>
            <Grid.Column
              style={styleMetrics}
            >
              <Header as="h2">Meetings Booked</Header>
              <Header as='h3'>{totalMeetingsBooked}</Header>
              <Image size='small' floated='right' src="https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/71382639_511374239440274_5689414491201077248_n.png?_nc_cat=102&_nc_oc=AQkSRgZv9fHBIZ5lFzTKwmraacs6QUA5uRFBuJR4EydKHSVwwZgfGIlTbZ1xT9ZobnU&_nc_ht=scontent-ort2-2.xx&oh=22d18caf4e251af44eb4b5b5807195cc&oe=5DF1636E" />
            </Grid.Column>
            <Grid.Column
              style={styleMetrics}
            >
              <Header as="h2">Not Yet Contacted</Header>
              <Header as='h3'>{totalNotContacted}</Header>
              <Image size='small' floated='right' src="https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/70880021_751349978649592_7265954774900539392_n.png?_nc_cat=101&_nc_oc=AQk5RRMoC9mgfA61QWoq_mT8y4SylOWJWzRclLynSDsznJetifnuN5Ks-YcHFkuFiMs&_nc_ht=scontent-ort2-2.xx&oh=51a411e11a9181923a23d3a7d1e05c21&oe=5E35AB9A" />
            </Grid.Column>
          </Grid.Row>

          {/* STYLING FOR THE BUTTON */}
          <Grid.Row columns={1} >
            <Grid.Column style={{margin: "20px"}}> 
              <Modal
                centered
                trigger={
                  <Button
                    style={{
                      borderRadius: "30px",
                      color: "white",
                      backgroundColor: "#6200EE"
                    }}
                  >
                    <Icon name="add" /> Create New List
                  </Button>
                }
                basic
                size="small"
              >
                <div style={{ verticalAlign: "center", textAlign: "center" }}>
                  <Modal.Header as="h2">Create a New List:</Modal.Header>
                  <Form.Group>
                    <Form.Input
                      placeholder="Create new list..."
                      onChange={this.handleChange}
                      name="newListName"
                    >
                      <input
                        style={{ borderRadius: "30px", width: "200px" }}
                      ></input>
                    </Form.Input>
                    <Form.Button
                      onClick={this.handleSubmit}
                      basic
                      color="violet"
                      inverted
                      style={{ margin: "20px", borderRadius: "30px" }}
                    >
                      <Icon name="add" /> Add Lead to List
                    </Form.Button>
                  </Form.Group>
                </div>
              </Modal>
            </Grid.Column>
          </Grid.Row>
          {/* TABLE OF CONTENTS */}
          <Grid.Row
            style={{
              marginLeft: "150px",
              marginRight: "150px"
            }}
            columns={1}
          >
            <Grid.Column>
              <Table sortable selectable celled>
                <Table.Header>
                  <Table.Row textAlign="center">
                    <Table.HeaderCell
                      sorted={column === "name" ? direction : null}
                      onClick={this.handleSort("name")}
                    >
                      List Name
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === "name" ? direction : null}
                      onClick={this.handleSort("name")}
                    >
                      No. of Leads
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === "date" ? direction : null}
                      onClick={this.handleSort("date")}
                    >
                      Date Created
                    </Table.HeaderCell>
                    <Table.HeaderCell>Delete List</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {_.map(data, ({ id, name, date, leadCount }) => (
                    <Table.Row textAlign="center" key={uuidv1()}>
                      <Table.Cell onClick={() => this.handleRowClick(id)}>
                        {name}
                      </Table.Cell>
                      <Table.Cell onClick={() => this.handleRowClick(id)}>
                        {leadCount}
                      </Table.Cell>
                      <Table.Cell onClick={() => this.handleRowClick(id)}>
                        {date}
                      </Table.Cell>
                      <Table.Cell>
                        <Icon
                          name={"trash alternate outline"}
                          onClick={() => this.show("inverted")}
                          name="trash alternate outline"
                          size="large"
                        />
                        <Confirm
                          open={this.state.deleteConfirmation}
                          cancelButton="Cancel"
                          confirmButton="Confirm"
                          onCancel={this.handleCancel}
                          onConfirm={event => this.handleConfirm(event, id)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    lists: state.lists,
    listWithLeadNotes: state.listWithLeadNotes
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     deleteList: id => {
//       dispatch(deleteList(id));
//     },
//     thunkFetchListById: (id, history) => {
//       dispatch(thunkFetchListById(id, history));
//     }
//   };
// };

export default connect(
  mapStateToProps,
  { deleteList, thunkFetchListById, addList }
)(withRouter(Dashboard));
