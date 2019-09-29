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
  Form
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import Navbar from "./Navbar";
import { deleteList, thunkFetchListById, addList } from "../actions";

const uuidv1 = require("uuid/v1");

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
    //  this.countTotalLeads()
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
        date: dateString
      });
    });
    this.setState({ data: array });
    // return array
  };

  // countTotalLeads = () => {
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
    // this.countTotalLeads();
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
    this.formattedListArray()
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
        <Grid>
          <Grid.Row
            style={{
              // position: "fixed",
              top: "40px",
              margin: "40px",
              marginLeft: "70px",
              padding: "px"
            }}
            columns={3}
          >
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Card.Header>Total Leads</Card.Header>
                  <Card.Description>{totalLeadCount}</Card.Description>
                  <Image
                    floated="right"
                    size="small"
                    src="https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/71382639_511374239440274_5689414491201077248_n.png?_nc_cat=102&_nc_oc=AQmxMPkcSBw3tsH3vtHdty3xBIiwwwo1u58qIFM6JBWKhgr_vArb8fKIvHJeZbUXVHA&_nc_ht=scontent-ort2-2.xx&oh=5ecbfc218c65ca3f290c9e06988b2804&oe=5DF1636E"
                  />
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Card.Header>Total Meetings Booked</Card.Header>
                  <Card.Description>{totalMeetingsBooked}</Card.Description>
                  <Image
                    floated="right"
                    size="small"
                    src="https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/71338480_839476829779627_88982982114672640_n.png?_nc_cat=103&_nc_oc=AQlz6riL_5nCn_aFSeq7vrwmHLIvmmoEXuFWQLi-o0ouY9NmTb65RrwrN8grKcefjAc&_nc_ht=scontent-ort2-2.xx&oh=abcf184851a1381d3c1e6f1a2655708f&oe=5DF88CFF"
                  />
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Card.Header>Not Yet Contacted</Card.Header>
                  <Card.Description>{totalNotContacted}</Card.Description>
                  <Image
                    floated="right"
                    size="small"
                    src="https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/70880021_751349978649592_7265954774900539392_n.png?_nc_cat=101&_nc_oc=AQn6B5Hc2QHFjLfjzwx8QK_KTfxQXSwEJn6eWDeWtUc5nEU37bRyVKv1v3-ZPPbd7p8&_nc_ht=scontent-ort2-2.xx&oh=9b4a7332352bb07373e20a8830861a35&oe=5E35AB9A"
                  />
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row
            style={{ marginTop: "40px", marginLeft: "70px" }}
            columns={1}
          >
            <Grid.Column>
              <Modal
                centered
                trigger={<Button>New List</Button>}
                basic
                size="small"
              >
                <div>
                  <Modal.Header as="h2">Create a New List:</Modal.Header>
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
                </div>
              </Modal>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row
            style={{
              // position: "fixed",
              top: "250px",
              margin: "40px",
              minHeight: "600px"
            }}
            columns={1}
          >
            <Grid.Column>
              <Table sortable selectable celled fixed>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell
                      sorted={column === "name" ? direction : null}
                      onClick={this.handleSort("name")}
                    >
                      List Name
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
                  {_.map(data, ({ id, name, date }) => (
                    <Table.Row key={uuidv1()}>
                      <Table.Cell onClick={() => this.handleRowClick(id)}>
                        {name}
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
