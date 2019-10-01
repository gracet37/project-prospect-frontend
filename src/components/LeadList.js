import React, { Component } from "react";
import {
  Grid,
  Image,
  Table,
  Icon,
  Button,
  Pagination,
  Header,
  Modal,
  Form,
  Search,
  Segment,
  Label,
  Popup,
  Sticky,
  Visibility
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import Navbar from "./Navbar";
import MailForm from "./MailForm";
import {
  deleteList,
  deleteListLead,
  addLeadNote,
  updateSearch
} from "../actions";
import PropTypes from "prop-types";
import FilterLeads from "./FilterLeads";

const styleMetrics = {
  borderWidth: "2px",
  // marginRight: '30px',
  borderRadius: "10px",
  borderColor: "#CECFD0",
  borderStyle: "solid",
  margin: "20px",
  padding: "20px",
  // width: "10px",
  height: "150px",
  boxShadow: "10px 10px 15px -6px rgba(67,66,93,0.68)"
  // padding: "20px"
};

const styleImage = {
  position: "relative",
  top: "-40px",
  opacity: 0.8
};

const styleButton = {
  borderRadius: "30px",
  color: "white",
  backgroundColor: "#6200EE",
  padding: "14px",
  paddingRight: "20px",
  paddingLeft: "20px"
};

const statusArray = [
  { key: "10", text: "Meeting booked", value: "Meeting booked" },
  {
    key: "25",
    text: "Met with decision maker",
    value: "Met with decision maker"
  },
  { key: "50", text: "Proposal sent", value: "Proposal sent" },
  { key: "90", text: "Verbal confirmation", value: "Verbal confirmation" },
  { key: "100", text: "Sale closed", value: "Sale closed" },
  {
    key: "notfit",
    text: "Not fit for business",
    value: "Not fit for business"
  },
  { key: "incorrect", text: "Incorrect contact", value: "Incorrect contact" },
  {
    key: "contact",
    text: "Contact at later date",
    value: "Contact at later date"
  }
];

// ! Search bar

const resultRenderer = ({ first_name }) => <Label content={first_name} />;

resultRenderer.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  position: PropTypes.string
};

class Dashboard extends Component {
  // UPDATE DATA WITH LISTS
  state = {
    column: null,
    data: [],
    direction: null,
    activePage: 1,
    statusInput: "",
    nextStepsInput: "",
    commentsInput: "",
    totalLeadCount: 0,
    totalMeetingsBooked: 0,
    totalNotContacted: 0,
    filter: ""
  };

  // ! ////////////////////////////////////// CLASS COMPONENT FUNCTIONS ////////////////////////////////////////////////////////////

  componentDidMount() {
    this.formattedListArray();
  }

  formattedListArray = () => {
    let listArray = this.props.listleads.leads;
    if (listArray) {
      let array = listArray.map(lead => {
        let last = null;
        if (lead.leadnotes.length) {
          last = lead.leadnotes[lead.leadnotes.length - 1];
        }
        if (lead.leadnotes.length > 0) {
          let date = new Date(last.created_at);
          let dateString = date.toDateString();
          return {
            id: lead.lead.id,
            first_name: lead.lead.first_name,
            last_name: lead.lead.last_name,
            position: lead.lead.position,
            company: lead.lead.company,
            status: last.status,
            next_steps: last.next_steps,
            comments: last.comments,
            comments_date: dateString,
            last_date_contacted: lead.lead.contacted_date,
            email: lead.lead.email,
            phone_number: lead.lead.phone_number
          };
        } else {
          return {
            id: lead.lead.id,
            first_name: lead.lead.first_name,
            last_name: lead.lead.last_name,
            position: lead.lead.position,
            company: lead.lead.company,
            status: null,
            next_steps: null,
            comments: null,
            comments_date: null,
            last_date_contacted: lead.lead.contacted_date,
            email: lead.lead.email,
            phone_number: lead.lead.phone_number
          };
        }
      });
      this.setState({ data: array });
    }
  };

  // ! need to refactor out " data "
  handleDeleteClick = (event, lead_id) => {
    event.preventDefault();
    // let newArray = this.state.data.filter(data => data.id !== lead_id);
    // this.setState({ data: newArray });
    this.props.deleteListLead(this.props.listleads.list.id, lead_id);
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

  handlePageChange = activePage => {
    this.setState({ activePage });
  };

  handleChange = e => {
    const targetValue = e.target.value;
    const targetName = e.target.name;
    this.setState({ [targetName]: targetValue });
  };

  handleDropdown = (e, data) => {
    const targetValue = data.value;
    this.setState({ statusInput: targetValue });
  };

  handleAddLeadNote = leadId => {
    const { statusInput, nextStepsInput, commentsInput } = this.state;
    this.props.addLeadNote(
      statusInput,
      nextStepsInput,
      this.props.auth.user.id,
      leadId,
      commentsInput
    );
  };

  // ? Search Bar code

  handleFilterChange = (event, value) => {
    this.props.updateSearch(value);
  };

  renderLeadCount() {
    if (this.props.listleads) {
      let totalLeads = 0;
      totalLeads = this.props.listleads.leads.length;
      return (
        <Grid.Column style={styleMetrics}>
          <Header as="h2">Total Leads</Header>
          <Header as="h2">{totalLeads}</Header>
          <Image
            style={styleImage}
            size="small"
            floated="right"
            src="https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/71338480_839476829779627_88982982114672640_n.png?_nc_cat=103&_nc_oc=AQk-PoFytrGO-egRH0bNhdK77YgmvNvozJbUsZvn9xAPPpjioM-SRk6hyr3rXfVVq2Y&_nc_ht=scontent-ort2-2.xx&oh=c1bc858aa386c365cae63c3eea610b9e&oe=5DF88CFF"
          />
        </Grid.Column>
      );
    } else {
      return null;
    }
  }

  renderMeetingsBooked() {
    let meetingsBookedCount = 0;
    if (this.props.listleads) {
      this.props.listleads.leads.forEach(lead => {
        lead.leadnotes.forEach(leadnote => {
          if (leadnote.status === "Meeting booked") {
            meetingsBookedCount += 1;
          }
        });
      });
      return (
        <Grid.Column style={styleMetrics}>
          <Header as="h2">Meetings Booked</Header>
          <Header as="h2">{meetingsBookedCount}</Header>
          <Image
            size="small"
            floated="right"
            style={styleImage}
            src="https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/71338480_839476829779627_88982982114672640_n.png?_nc_cat=103&_nc_oc=AQk-PoFytrGO-egRH0bNhdK77YgmvNvozJbUsZvn9xAPPpjioM-SRk6hyr3rXfVVq2Y&_nc_ht=scontent-ort2-2.xx&oh=c1bc858aa386c365cae63c3eea610b9e&oe=5DF88CFF"
          />
        </Grid.Column>
      );
    } else {
      return null;
    }
  }

  renderNotContacted() {
    let notContacted = 0;
    if (this.props.listleads) {
      this.props.listleads.leads.forEach(lead => {
        if (lead.leadnotes.length < 1) {
          notContacted += 1;
        }
      });
      return (
        <Grid.Column style={styleMetrics}>
          <Header as="h2">Not Yet Contacted</Header>
          <Header as="h2">{notContacted}</Header>
          <Image
            size="small"
            floated="right"
            style={styleImage}
            src="https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/70880021_751349978649592_7265954774900539392_n.png?_nc_cat=101&_nc_oc=AQk5RRMoC9mgfA61QWoq_mT8y4SylOWJWzRclLynSDsznJetifnuN5Ks-YcHFkuFiMs&_nc_ht=scontent-ort2-2.xx&oh=51a411e11a9181923a23d3a7d1e05c21&oe=5E35AB9A"
          />
        </Grid.Column>
      );
    } else {
      return null;
    }
  }

  renderTableBody() {
    // Set original list array to the full array in store
    let listArr = this.props.listleads.leads;
    if (this.props.search === "") {
      listArr = this.props.listleads.leads;
    } else {
      listArr = this.props.listleads.leads.filter(lead => {
        return lead.lead.first_name
          .toUpperCase()
          .includes(this.props.search.toUpperCase());
      });
    }

    // if (this.props.searchEntry === '') {
    //    return entire array
    //
    //}
    // else {
    // filter ba
    //sed on this.props.searchEntry then call map= on the result like below
    //}

    // if t
    // let renderArray = listArr.slice((this.state.activePage * 10) - 10, (this.state.activePage * 10) - 1)
    return (
      <Table.Body onScroll={() => console.log("scroll")}>
        {_.map(listArr, ({ lead, leadnotes }) => {
          let last = null;
          let dateString;
          if (leadnotes.length) {
            last = leadnotes[leadnotes.length - 1];
          }
          if (last) {
            dateString = new Date(last.created_at).toDateString();
          }
          return (
            <Table.Row
              textAlign="center"
              key={lead.id}
              // onClick={() => this.handleRowClick(id)}
            >
              <Table.Cell>{lead.first_name}</Table.Cell>
              <Table.Cell>{lead.last_name}</Table.Cell>
              <Table.Cell>{lead.position}</Table.Cell>
              <Table.Cell>{lead.company}</Table.Cell>
              <Table.Cell>{last ? last.status : null}</Table.Cell>
              <Table.Cell>{last ? last.next_steps : null}</Table.Cell>
              <Table.Cell>{last ? dateString : null}</Table.Cell>
              <Table.Cell>
                {/* {leadnotesArray.find(lead => )} */}
                <Modal
                  closeIcon
                  trigger={<Icon name={"edit outline"} size="large" />}
                >
                  <Modal.Header as="h1">
                    {lead.first_name} {lead.last_name} <br />{" "}
                    {lead.position ? lead.position + "," : null} {lead.company}
                  </Modal.Header>
                  <Modal.Header as="h3">
                    Email: {lead.email}
                    {/* <Icon name={"envelope"}></Icon> */}
                    <Modal
                      trigger={
                        <Icon
                          style={{ color: "#6200EE" }}
                          name={"envelope"}
                        ></Icon>
                      }
                    >
                      <Modal.Header>
                        Send an email to {lead.first_name}
                      </Modal.Header>
                      <Modal.Content>
                        <MailForm
                          email={lead.email}
                          myEmail={this.props.auth.user.email}
                        />
                      </Modal.Content>
                    </Modal>
                  </Modal.Header>
                  {/* <Modal.Header as='h3'>{position}, {company}</Modal.Header> */}

                  <Modal.Content>
                    <Form>
                      <Form.Group>
                        <Form.Select
                          // fluid
                          onChange={this.handleDropdown}
                          name="statusInput"
                          label="Status"
                          options={statusArray}
                          placeholder={last ? last.status : "Select status"}
                        />
                        {/* <Form.Header>Next Steps</Form.Header> */}
                        <Form.Input
                          onChange={this.handleChange}
                          name="nextStepsInput"
                          label="Next Steps"
                          placeholder={last ? last.next_steps : "Next steps"}
                        ></Form.Input>
                      </Form.Group>
                      <Form.Input
                        onChange={this.handleChange}
                        name="commentsInput"
                        control="textarea"
                        rows="3"
                        label="Notes"
                        value={last ? dateString + last.comments : null}
                      />
                      <Button
                        style={{
                          borderRadius: "50px",
                          backgroundColor: "#03DAC6",
                          color: "white"
                        }}
                        onClick={() => this.handleAddLeadNote(lead.id)}
                      >
                        Save
                      </Button>
                      {/* <Form.Description></Form.Description> */}
                    </Form>
                  </Modal.Content>
                </Modal>
              </Table.Cell>
              <Table.Cell>
                <Icon
                  name={"trash alternate outline"}
                  onClick={event => this.handleDeleteClick(event, lead.id)}
                  size="large"
                />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    );
  }
  // ! /////////////////////////////////////////////////////////// RENDER START ///////////////////////////////////////////////////////////////////////////////

  render() {
    const { column, data, direction, activePage, filter } = this.state;
    const leadnotesArray = this.props.leadnotes;
    // console.log(this.state);
    // let renderData;
    // let dataSlice;
    // if (filter) {
    //   renderData = this.filteredLeads();
    // } else {
    //   renderData = data;
    // }

    // console.log(renderData)
    // if (renderData) {
    //   renderData.slice((activePage * 10) - 10, (activePage * 10) - 1)
    //   if (activePage === 1) {
    //     dataSlice = renderData.slice(0, 9);
    //   } else if (activePage === 2) {
    //     dataSlice = renderData.slice(10, 19);
    //   } else if (activePage === 3) {
    //     dataSlice = renderData.slice(20, 29);
    //   } else if (activePage === 4) {
    //     dataSlice = renderData.slice(30, 39);
    //   } else if (activePage === 5) {
    //     dataSlice = renderData.slice(40, 49);
    //   } else if (activePage === 6) {
    //     dataSlice = renderData.slice(50, 59);
    //   } else if (activePage === 7) {
    //     dataSlice = renderData.slice(60, 69);
    //   } else if (activePage === 8) {
    //     dataSlice = renderData.slice(70, 79);
    //   } else if (activePage === 9) {
    //     dataSlice = renderData.slice(80, 89);
    //   } else if (activePage === 10) {
    //     dataSlice = renderData.slice(90, 99);
    //   } else {
    //     dataSlice = [];
    //   }
    //   // return dataSlice
    // }

    return (
      <div>
        <Navbar />
        <Grid
          style={{
            backgroundImage: `url(${"https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/s2048x2048/70590332_836756946718765_3473765009224368128_n.png?_nc_cat=111&_nc_oc=AQnI8TKKO2F4LqO-fZDRyZuRDWWLWhMONIpEB2mHf1QEmAP04HdNNIq8JU0QUq5LYwE&_nc_ht=scontent-ort2-2.xx&oh=e9db466921239dad5b5ae5b132f1f40f&oe=5E3DD369"})`,
            minHeight: "1000px"
          }}
        >
          {/* METRIC CARDS */}
          <Grid.Row
            columns="equal"
            style={{
              top: "70px",
              margin: "20px",
              paddingRight: "120px",
              paddingLeft: "120px",
              marginBottom: "40px",
              position: "fixed",
              textAlign: "left"
            }}
          >
            {this.renderLeadCount()}
            {this.renderMeetingsBooked()}
            {this.renderNotContacted()}
          </Grid.Row>

          {/*  BACK TO DASHBOARD BUTTON  */}
          <Grid.Row
            style={{
              margin: "1px",
              position: "fixed",
              top: "300px",
              display: "inline-block"
            }}
          >
            <Button as={Link} to="/leadlists" style={styleButton}>
              <Icon name="arrow alternate circle left outline" /> Back to
              Dashboard
            </Button>
          </Grid.Row>

          {this.props.listleads.leads.length ? (
            <Grid.Row
              style={{
                margin: "20px",
                marginRight: "60px",
                marginLeft: "60px",
                minHeight: "450px"
              }}
              columns={1}
            >
              {/* TABLE OF CONTENTS */}
              <Grid.Column>
                <div
                  style={{
                    position: 'fixed',
                    top: '400px',
                    right: '400px',
                    height: "550px",
                    width: "1100px",
                    overflowX: "scroll",
                    textAlign: "center",
                    display: "inline-block"
                  }}
                >
                  <Table sortable selectable celled fixed >
                    <Table.Header>
                      <Popup
                        content="Search First Name"
                        trigger={
                          <Search
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
                    </Table.Header>
                    <Table.Header style={{ position: "sticky", top: 0 }}>
                      <Table.Row
                        style={{ position: "sticky" }}
                        textAlign="center"
                      >
                        <Table.HeaderCell
                          sorted={column === "first_name" ? direction : null}
                          onClick={this.handleSort("first_name")}
                        >
                          First Name
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "last_name" ? direction : null}
                          onClick={this.handleSort("last_name")}
                        >
                          Last Name
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "position" ? direction : null}
                          onClick={this.handleSort("position")}
                        >
                          Position
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "company" ? direction : null}
                          onClick={this.handleSort("company")}
                        >
                          Company
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "status" ? direction : null}
                          onClick={this.handleSort("status")}
                        >
                          Status
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "next_steps" ? direction : null}
                          onClick={this.handleSort("next_steps")}
                        >
                          Next Steps
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={
                            column === "last_date_contacted" ? direction : null
                          }
                          onClick={this.handleSort("last_date_contacted")}
                        >
                          Last Date Contacted
                        </Table.HeaderCell>
                        <Table.HeaderCell>Edit Lead</Table.HeaderCell>
                        <Table.HeaderCell>Delete Lead</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    {this.renderTableBody()}
                    {/* <Table.Footer>
                    {data.length > 10 ? (
                      <Table.Row>
                        <Table.HeaderCell colSpan="3">
                          <Pagination
                            boundaryRange={0}
                            defaultActivePage={1}
                            ellipsisItem={"..."}
                            firstItem={{
                              content: <Icon name="angle double left" />,
                              icon: true
                            }}
                            lastItem={{
                              content: <Icon name="angle double right" />,
                              icon: true
                            }}
                            prevItem={{
                              content: <Icon name="angle left" />,
                              icon: true
                            }}
                            nextItem={{
                              content: <Icon name="angle right" />,
                              icon: true
                            }}
                            siblingRange={1}
                            totalPages={10}
                            onPageChange={(event, { activePage }) =>
                              this.handlePageChange(activePage)
                            }
                          />
                        </Table.HeaderCell>
                      </Table.Row>
                    ) : null}
                  </Table.Footer> */}
                  </Table>
                </div>
              </Grid.Column>
            </Grid.Row>
          ) : (
            <Grid.Row
              style={{
                margin: "20px",
                position: "fixed",
                top: "400px",
                display: "inline-block",
                left: "-30px"
              }}
            >
              <Header>Oops! You do not have any leads saved under this list</Header>

              <Button
                as={Link}
                to="/"
                style={{
                  borderRadius: "30px",
                  color: "#43425D",
                  backgroundColor: "#FFF176",
                  padding: "14px",
                  paddingRight: "20px",
                  paddingLeft: "20px"
                }}
              >
                <Icon name="arrow alternate circle left outline" /> Search For
                Leads
              </Button>
            </Grid.Row>
          )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lists: state.lists,
    listleads: state.listleads,
    auth: state.auth,
    leadnotes: state.leadnotes,
    search: state.search
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     deleteList: id => {
//       dispatch(deleteList(id));
//     },
//     deleteListLead: (list_id, lead_id) => {
//       dispatch(deleteListLead(list_id, lead_id));
//     },
//     addLeadNote: (status, nextSteps, userId, leadId, comment) => {
//       dispatch(addLeadNote(status, nextSteps, userId, leadId, comment))
//     }
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Dashboard);

export default connect(
  mapStateToProps,
  { deleteList, deleteListLead, addLeadNote, updateSearch }
)(Dashboard);

// handleFetchClick = (id) => {
//   this.props.thunkFetchLeadNote(this.props.auth.user.id, id)
// }

// countTotalLeads = () => {
//   if (this.props.listleads) {
//     let totalLeads;
//     // console.log(this.props.lists);
//     totalLeads = this.props.listleads.leads.length;
//     this.setState({ totalLeadCount: totalLeads });
//   } else {
//     return null;
//   }
// };

// countMeetingsBooked = () => {
//   let meetingsBookedCount = 0;
//   if (this.props.listleads) {
//     this.props.listleads.leads.forEach(lead => {
//       lead.leadnotes.forEach(leadnote => {
//         if (leadnote.status === "Meeting booked") {
//           meetingsBookedCount += 1;
//         }
//       });
//     });
//     this.setState({ totalMeetingsBooked: meetingsBookedCount });
//   } else {
//     return null;
//   }
// };

// countNotContacted = () => {
//   let notContacted = 0;
//   // let testArray = []
//   if (this.props.listleads) {
//     this.props.listleads.leads.forEach(lead => {
//       if (lead.leadnotes.length < 1) {
//         notContacted += 1;
//       }
//     });
//     this.setState({ totalNotContacted: notContacted });
//   } else {
//     return null;
//   }
// };

// id,
// first_name,
// last_name,
// position,
// company,
// status,
// next_steps,
// last_date_contacted,
// phone_number,
// email,
// comments,
// comments_date
