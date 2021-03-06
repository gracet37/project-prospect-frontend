import React, { Component } from "react";
import {
  Grid,
  Image,
  Table,
  Icon,
  Button,
  Modal,
  Form,
  Header,
  Popup,
  Search
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { clearMessage, clearSearch, updateSearch } from "../actions";
import {
  deleteList,
  thunkFetchListById,
  addList,
  sortLists
} from "../actions/lists";
import { metricLeads } from "../actions/leads";

const uuidv1 = require("uuid/v1");

const styleMetrics = {
  borderWidth: "1px",
  borderRadius: "10px",
  borderColor: "rgba(98, 0, 238, 0.2)",
  borderStyle: "solid",
  margin: "0 50px 50px 50px",
  padding: "20px",
  height: "100px",
  boxShadow: "10px 10px 15px -6px rgba(67,66,93,0.15)",
  verticalAlign: "middle",
  cursor: "pointer"
};

const styleImage = {
  position: "relative",
  top: "-30px",
  opacity: 0.8
};

const styleRow = {
  top: "70px",
  margin: "20px",
  paddingRight: "120px",
  paddingLeft: "120px",
  marginBottom: "40px",
  position: "relative",
  textAlign: "left"
};

const styleTableHead = {
  border: "solid",
  borderWidth: "1px",
  // borderColor: "rgba(98, 0, 238, 0.2)",
  backgroundColor: "#03d8C5",
  color: "white"
};

class Dashboard extends Component {
  // UPDATE DATA WITH LISTS
  state = {
    column: null,
    data: [],
    direction: null,
    modalShow: false,
    totalLeadCount: 0,
    totalMeetingsBooked: 0,
    totalNotContacted: 0,
    newListName: "",
    showModal: false
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  componentDidMount() {
    this.props.clearSearch();
    this.props.clearMessage();
  }

  // show = dimmer => this.setState({ dimmer, modalShow: true });
  // handleConfirmModal = () => this.setState({ modalShow: false });
  // handleCancelModal = () => {
  //   this.setState({ modalShow: false });
  // };

  handleConfirm = (event, id) => {
    // let newArray = this.props.lists.filter(list => list.id !== id);
    this.setState({ modalShow: false });
    this.props.deleteList(id);
  };

  handleRowClick = id => {
    this.props.thunkFetchListById(
      id,
      this.props.auth.user.id,
      this.props.history
    );
  };

  handleSort = clickedColumn => () => {
    const { column, direction } = this.state;
    const dataArray = this.props.lists;

    const dataSorted = _.sortBy(dataArray, [clickedColumn]);

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        direction: "ascending"
      });
      this.props.sortLists(_.sortBy(dataArray, [clickedColumn]));
      return;
    }

    this.setState({
      direction: direction === "ascending" ? "descending" : "ascending"
    });
    this.props.sortLists(dataArray.reverse());
  };

  handleChange = e => {
    const targetValue = e.target.value;
    const targetName = e.target.name;
    this.setState({ [targetName]: targetValue });
  };

  handleSubmit = () => {
    const { newListName } = this.state;
    const capitalizedName =
      newListName.charAt(0).toUpperCase() + newListName.substring(1);
    const userId = this.props.auth.user.id;
    this.closeModal();
    this.props.clearMessage();
    this.props.addList(capitalizedName, userId);
  };

  handleClearMessage = () => {
    this.props.clearMessage();
  };

  renderListBody() {
    let listArr = this.props.lists;
    if (this.props.search === "") {
      listArr = this.props.lists;
    } else {
      listArr = this.props.lists.filter(list => {
        return list.name
          .toUpperCase()
          .includes(this.props.search.toUpperCase());
      });
    }
    if (listArr.length > 0) {
      return (
        <Table.Body
          style={{
            borderColor: "#03D8C5",
            boxShadow: "0px 1px 36px -16px rgba(0,0,0,0.15)",
            borderWidth: "1px",
            borderRadius: "10px"
          }}
        >
          {_.map(listArr, ({ id, name, created_at, leads }) => {
            let dateString = new Date(created_at).toDateString();
            let leadCount = leads.length;
            // let dateString = date
            return (
              <Table.Row textAlign="center" key={uuidv1()}>
                <Table.Cell onClick={() => this.handleRowClick(id)}>
                  {name}
                </Table.Cell>
                <Table.Cell onClick={() => this.handleRowClick(id)}>
                  {leadCount}
                </Table.Cell>
                <Table.Cell onClick={() => this.handleRowClick(id)}>
                  {dateString}
                </Table.Cell>
                <Table.Cell>
                  <Modal
                    closeIcon
                    size="mini"
                    trigger={
                      <Icon
                        style={{ cursor: "pointer" }}
                        name={"trash alternate outline"}
                        name="trash alternate outline"
                        size="large"
                      />
                    }
                  >
                    <Modal.Header>Delete List</Modal.Header>
                    <Modal.Content>
                      <p>Are you sure you want to delete this list?</p>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        style={{
                          borderRadius: "30px",
                          color: "white",
                          backgroundColor: "#6200EE"
                        }}
                        onClick={this.handleCancelModal}
                        basic
                        color="violet"
                      >
                        No
                      </Button>
                      <Button
                        onClick={event => this.handleConfirm(event, id)}
                        // icon="checkmark"
                        // labelPosition="right"
                        content="Yes"
                        style={{
                          borderRadius: "30px",
                          color: "white",
                          backgroundColor: "#03DAC6"
                        }}
                      />
                    </Modal.Actions>
                  </Modal>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      );
    } else {
      return (
        <Table.Row style={{textAlign: 'center', fontSize: '15px'}}>
          You do not have any lists
        </Table.Row>
      );
    }
  }

  renderLeadCount() {
    if (this.props.lists.length > 0) {
      let leadCountArray = [];
      let totalLeads = 0;
      this.props.lists.forEach(list => {
        let count = list.leads.length;
        leadCountArray.push(count);
      });
      totalLeads = leadCountArray.reduce((total, count) => total + count);
      return (
        <Grid.Column style={styleMetrics}>
          <Header as="h4">Total Leads</Header>
          <Header style={{ margin: "0" }} as="h1">
            {totalLeads}
          </Header>
          <Image
            style={styleImage}
            size="tiny"
            floated="right"
            src="https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/71338480_839476829779627_88982982114672640_n.png?_nc_cat=103&_nc_oc=AQk-PoFytrGO-egRH0bNhdK77YgmvNvozJbUsZvn9xAPPpjioM-SRk6hyr3rXfVVq2Y&_nc_ht=scontent-ort2-2.xx&oh=c1bc858aa386c365cae63c3eea610b9e&oe=5DF88CFF"
          />
        </Grid.Column>
      );
    } else {
      return null;
    }
  }

  renderMeetingsBookedList = () => {
    let leadArray = [];
    let leadwithnotes = [];
    if (this.props.listWithLeadNotes.length) {
      leadwithnotes = this.props.listWithLeadNotes.filter(lead => {
        return lead.leadnotes.length !== 0;
        // return leadnote.status === "Meeting booked"
      });
    }
    let filteredLeads = leadwithnotes.filter(lead => {
      return (
        lead.leadnotes[lead.leadnotes.length - 1].status === "Meeting booked"
      );
    });
    this.props.metricLeads(
      filteredLeads,
      this.props.history,
      "Meetings Booked"
    );
  };

  renderMeetingsBooked() {
    let meetingsBookedCount = 0;
    // let leadArray = []
    if (this.props.listWithLeadNotes.length) {
      this.props.listWithLeadNotes.forEach(lead => {
        if (lead.leadnotes.length) {
          if (
            lead.leadnotes[lead.leadnotes.length - 1].status ===
            "Meeting booked"
          ) {
            meetingsBookedCount += 1;
          }
        }
        // lead.leadnotes.forEach(leadnote => {
        //   if (leadnote.status === "Meeting booked") {
        //   }
        // });
      });
      return (
        <Grid.Column
          onClick={this.renderMeetingsBookedList}
          style={styleMetrics}
        >
          <Header as="h4">Meetings Booked</Header>
          <Header style={{ margin: "0" }} as="h1">
            {meetingsBookedCount}
          </Header>
          <Image
            style={styleImage}
            size="tiny"
            floated="right"
            src="https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/71382639_511374239440274_5689414491201077248_n.png?_nc_cat=102&_nc_oc=AQkSRgZv9fHBIZ5lFzTKwmraacs6QUA5uRFBuJR4EydKHSVwwZgfGIlTbZ1xT9ZobnU&_nc_ht=scontent-ort2-2.xx&oh=22d18caf4e251af44eb4b5b5807195cc&oe=5DF1636E"
          />
        </Grid.Column>
      );
    } else {
      return null;
    }

    // if (this.props.listWithLeadNotes.length) {
    //   this.props.listWithLeadNotes.forEach(lead => {
    //     return lead.leadnotes.filter(leadnote => {
    //       if (leadnote.status === "Meeting booked") {
    //         meetingsBookedCount += 1
    //       }
    //     });
    //   });
    // }
  }

  renderNotContactedList = () => {
    let notContacted = [];
    if (this.props.listWithLeadNotes.length) {
      notContacted = this.props.listWithLeadNotes.filter(lead => {
        return lead.leadnotes.length === 0;
      });
      this.props.metricLeads(notContacted, this.props.history, "Not Contacted");
    }
  };

  renderNotContacted() {
    let notContacted = 0;

    if (this.props.listWithLeadNotes.length) {
      this.props.listWithLeadNotes.forEach(lead => {
        if (lead.leadnotes.length < 1) {
          notContacted += 1;
        }
      });
      return (
        <Grid.Column onClick={this.renderNotContactedList} style={styleMetrics}>
          <Header as="h4">Not Yet Contacted</Header>
          <Header style={{ margin: "0" }} as="h1">
            {notContacted}
          </Header>
          <Image
            style={styleImage}
            size="tiny"
            floated="right"
            src="https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/70880021_751349978649592_7265954774900539392_n.png?_nc_cat=101&_nc_oc=AQk5RRMoC9mgfA61QWoq_mT8y4SylOWJWzRclLynSDsznJetifnuN5Ks-YcHFkuFiMs&_nc_ht=scontent-ort2-2.xx&oh=51a411e11a9181923a23d3a7d1e05c21&oe=5E35AB9A"
          />
        </Grid.Column>
      );
    } else {
      return null;
    }
  }

  handleFilterChange = (event, value) => {
    this.props.updateSearch(value);
  };

  render() {
    const { column, direction } = this.state;
    return (
      <div>
        {this.renderMetricCards}
        {/* METRIC CARDS */}
        <Grid>
          <Grid.Row columns="equal" style={styleRow}>
            {this.renderLeadCount()}
            {this.renderMeetingsBooked()}
            {this.renderNotContacted()}
          </Grid.Row>

          {/* STYLING FOR THE BUTTON */}
          <Grid.Row columns={1}>
            <Grid.Column>
              <Modal
                basic
                closeIcon
                onClose={this.closeModal}
                open={this.state.showModal}
                style={{ width: "300px" }}
                trigger={
                  <Button
                    onClick={() => this.setState({ showModal: true })}
                    style={{
                      borderRadius: "20px",
                      color: "white",
                      backgroundColor: "#6200EE"
                    }}
                  >
                    <Icon name="add" /> Create New List
                  </Button>
                }
              >
                <div style={{ verticalAlign: "center", textAlign: "center" }}>
                  <Modal.Header as="h2">New List</Modal.Header>
                  <Modal.Content>
                    <Form.Input
                      placeholder="List Name..."
                      onChange={this.handleChange}
                      name="newListName"
                    >
                      <input
                        style={{ borderRadius: "20px", width: "200px" }}
                      ></input>
                    </Form.Input>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                      onClick={this.handleSubmit}
                      style={{
                        // margin: "20px",
                        borderRadius: "30px",
                        margin: "20px",
                        // marginBottom: '10px',
                        color: "white",
                        backgroundColor: "#6200EE"
                        // position: "relative",
                        // float: "left"
                      }}
                    >
                      Create New List
                    </Button>
                  </Modal.Actions>
                </div>
              </Modal>
            </Grid.Column>
          </Grid.Row>
          {/* TABLE OF CONTENTS */}
          <Grid.Row
            style={{
              margin: "15px",
              marginLeft: "70px",
              marginRight: "70px"
            }}
            columns={1}
          >
            <Grid.Column>
              <Table
                sortable
                selectable
                celled
                style={{
                  padding: "0px 10px 10px 10px",
                  borderColor: "rgba(3, 216, 197, 0.2)",
                  boxShadow: "0px 1px 36px -16px rgba(0,0,0,0.15)",
                  borderWidth: "1px",
                  borderRadius: "10px"
                }}
              >
                <Table.Header>
                  <Table.Row>
                    {" "}
                    <Popup
                      content="Search List Name"
                      trigger={
                        <Search
                          style={{
                            margin: "20px 20px 20px 20px"
                          }}
                          // style={{ margin: "15px", position: 'fixed', top: 0 }}
                          onSearchChange={_.debounce(
                            (event, { value }) =>
                              this.handleFilterChange(event, value),
                            300
                          )}
                          noResultsMessage="No results found"
                          showNoResults={false}
                        />
                      }
                    />
                  </Table.Row>
                </Table.Header>
                <Table.Header>
                  <Table.Row textAlign="center">
                    <Table.HeaderCell
                      style={styleTableHead}
                      sorted={column === "name" ? direction : null}
                      onClick={this.handleSort("name")}
                    >
                      List Name
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      style={styleTableHead}
                      sorted={column === "leads" ? direction : null}
                      onClick={this.handleSort("leads")}
                    >
                      No. of Leads
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      style={styleTableHead}
                      sorted={column === "date" ? direction : null}
                      onClick={this.handleSort("date")}
                    >
                      Date Created
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      style={{
                        border: "solid",
                        borderWidth: "1px",
                        backgroundColor: "#03d8C5",
                        color: "white",
                        width: "8px"
                      }}
                    >
                      Delete List
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                {this.renderListBody()}
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
    listWithLeadNotes: state.listWithLeadNotes,
    message: state.message,
    search: state.search
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
  {
    deleteList,
    thunkFetchListById,
    addList,
    clearMessage,
    clearSearch,
    updateSearch,
    sortLists,
    metricLeads
  }
)(withRouter(Dashboard));

// <Modal
//   closeOnDimmerClick={this.state.modalShow}
//   closeIcon
//   open={this.state.modalShow}
//   centered
//   trigger={
//     <Button
//       onClick={this.show}
//       style={{
//         borderRadius: "30px",
//         color: "white",
//         backgroundColor: "#6200EE"
//       }}
//     >
//       <Icon name="add" /> Create New List
//     </Button>
//   }
//   basic
//   size="small"
// >
//   <div style={{ verticalAlign: "center", textAlign: "center" }}>
//     <Modal.Header as="h2">Create a New List:</Modal.Header>
//     <Form.Group>
//       <Form.Input
//         placeholder="Create new list..."
//         onChange={this.handleChange}
//         name="newListName"
//       >
//         <input
//           style={{ borderRadius: "30px", width: "200px" }}
//         ></input>
//       </Form.Input>
//       <Button
//         onClick={this.handleSubmit}
//         style={{
//           margin: "20px",
//           borderRadius: "30px",
//           color: "white",
//           backgroundColor: "#03DAC6"
//         }}
//       >
//         <Icon name="add" /> Add Lead to List
//       </Button>
//     </Form.Group>
//   </div>
// </Modal>
