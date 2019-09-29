import React, { Component } from "react";
import {
  Grid,
  Image,
  Card,
  Table,
  Icon,
  Button,
  Pagination,
  Header,
  Modal,
  Form
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import Navbar from "./Navbar";
import MailForm from "./MailForm";
import { deleteList, deleteListLead, addLeadNote } from "../actions";

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

class Dashboard extends Component {
  // UPDATE DATA WITH LISTS
  state = {
    column: null,
    data: [],
    direction: null,
    activePage: 1,
    statusInput: "",
    nextStepsInput: "",
    commentsInput: ""
  };

  componentDidMount() {
    this.formattedListArray();
  }

  formattedListArray = () => {
    // let listArray = this.props.listlead[0];
    let listArray = this.props.listleads.leads;
    // let leadNotesArray = this.props.leadnotes
    // let leadnoteArray= lead.leadnotes
    // let lastLeadnote = leadnoteArray.slice(-1)[0]
    if (listArray) {
      // console.log("LISTARRAY??", listArray)
      let array = listArray.map(lead => {
        // const oneLead = lead.lead
        let last = null;
        if (lead.leadnotes.length) {
          last = lead.leadnotes[lead.leadnotes.length - 1];
        }
        console.log("LAST", last);
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
      console.log("LISTARRAY", listArray);
      this.setState({ data: array });
    }
  };

  handleDeleteClick = (event, lead_id) => {
    event.preventDefault();
    let newArray = this.state.data.filter(data => data.id !== lead_id);
    this.setState({ data: newArray });
    this.props.deleteListLead(this.props.listleads.list.id, lead_id);
    // debugger
  };

  // handleRowClick = id => {
  //   console.log("row clicked", id);
  // };

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
    console.log(leadId);
    const { statusInput, nextStepsInput, commentsInput } = this.state;
    this.props.addLeadNote(
      statusInput,
      nextStepsInput,
      this.props.auth.user.id,
      leadId,
      commentsInput
    );
  };

  // handleFetchClick = (id) => {
  //   this.props.thunkFetchLeadNote(this.props.auth.user.id, id)
  // }

  render() {
    console.log("LEADLIST", this.state);
    const { column, data, direction, activePage } = this.state;
    const leadnotesArray = this.props.leadnotes;

    let dataSlice;
    if (data) {
      if (activePage === 1) {
        dataSlice = data.slice(0, 9);
      } else if (activePage === 2) {
        dataSlice = data.slice(10, 19);
      } else if (activePage === 3) {
        dataSlice = data.slice(20, 29);
      } else if (activePage === 4) {
        dataSlice = data.slice(30, 39);
      } else if (activePage === 5) {
        dataSlice = data.slice(40, 49);
      } else if (activePage === 6) {
        dataSlice = data.slice(50, 59);
      } else if (activePage === 7) {
        dataSlice = data.slice(60, 69);
      } else if (activePage === 8) {
        dataSlice = data.slice(70, 79);
      } else if (activePage === 9) {
        dataSlice = data.slice(80, 89);
      } else if (activePage === 10) {
        dataSlice = data.slice(90, 99);
      } else {
        dataSlice = [];
      }
      // return dataSlice
    }

    return (
      <div>
        <Navbar />
        <Grid
          style={{
            backgroundImage: `url(${"https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/s2048x2048/71093458_463527317706998_6857018496128122880_n.png?_nc_cat=101&_nc_oc=AQl2gDIEaIvqJ9nlneGMjfaDHtgfbFjLjkXKrF1ATz_lG8I8Qq2SYVjDCYwbysjSCwM&_nc_ht=scontent-ort2-2.xx&oh=644556da3c91d328452fcb67714c1c7d&oe=5E3A8CD8"})`
          }}
          divided="vertically"
        >
          <Grid.Row
            style={{ marginTop: "40px", marginLeft: "70px" }}
            columns={3}
          >
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Card.Header>Total Leads</Card.Header>
                  <Card.Description>XXXXXX</Card.Description>
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
                  <Card.Header>Open Leads</Card.Header>
                  <Card.Description>XXXX</Card.Description>
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
                  <Card.Header>Another METRIC</Card.Header>
                  <Card.Description>XXXX</Card.Description>
                  <Image
                    floated="right"
                    size="small"
                    src="https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/70880021_751349978649592_7265954774900539392_n.png?_nc_cat=101&_nc_oc=AQn6B5Hc2QHFjLfjzwx8QK_KTfxQXSwEJn6eWDeWtUc5nEU37bRyVKv1v3-ZPPbd7p8&_nc_ht=scontent-ort2-2.xx&oh=9b4a7332352bb07373e20a8830861a35&oe=5E35AB9A"
                  />
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          {this.props.listleads.leads ? (
            <Grid.Row
              style={{ margin: "40px", minHeight: "450px" }}
              columns={1}
            >
              <Grid.Column>
                <Table sortable selectable celled fixed>
                  <Table.Header>
                    <Table.Row>
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
                  <Table.Body>
                    {_.map(
                      dataSlice,
                      ({
                        id,
                        first_name,
                        last_name,
                        position,
                        company,
                        status,
                        next_steps,
                        last_date_contacted,
                        phone_number,
                        email,
                        comments,
                        comments_date
                      }) => (
                        <Table.Row
                          key={id}
                          // onClick={() => this.handleRowClick(id)}
                        >
                          <Table.Cell>{first_name}</Table.Cell>
                          <Table.Cell>{last_name}</Table.Cell>
                          <Table.Cell>{position}</Table.Cell>
                          <Table.Cell>{company}</Table.Cell>
                          <Table.Cell>{status}</Table.Cell>
                          <Table.Cell>{next_steps}</Table.Cell>
                          <Table.Cell>{comments_date}</Table.Cell>
                          <Table.Cell>
                            {/* {leadnotesArray.find(lead => )} */}
                            <Modal
                              trigger={
                                <Icon name={"edit outline"} size="large" />
                              }
                            >
                              <Modal.Header as="h2">
                                {first_name} {last_name} <br />{" "}
                                {position ? position + "," : null} {company}
                              </Modal.Header>
                              <Modal.Header as="h3">
                                {phone_number ? "Phone:" + phone_number : null}{" "}
                                Email: {email}
                                {/* <Icon name={"envelope"}></Icon> */}
                                <Modal
                                  trigger={<Icon name={"envelope"}></Icon>}
                                >
                                  <Modal.Header>Send an email to {first_name}</Modal.Header>
                                    <Modal.Content>
                                    <MailForm email={email} myEmail={this.props.auth.user.email}/>
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
                                      placeholder={
                                        status ? status : "Select status"
                                      }
                                    />
                                    {/* <Form.Header>Next Steps</Form.Header> */}
                                    <Form.Input
                                      onChange={this.handleChange}
                                      name="nextStepsInput"
                                      label="Next Steps"
                                      placeholder={
                                        next_steps ? next_steps : "Next steps"
                                      }
                                    ></Form.Input>
                                  </Form.Group>
                                  <Form.Input
                                    onChange={this.handleChange}
                                    name="commentsInput"
                                    control="textarea"
                                    rows="3"
                                    label="Notes"
                                    value={
                                      comments ? comments_date + comments : null
                                    }
                                  />
                                  <Button
                                    onClick={() => this.handleAddLeadNote(id)}
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
                              onClick={event =>
                                this.handleDeleteClick(event, id)
                              }
                              size="large"
                            />
                          </Table.Cell>
                        </Table.Row>
                      )
                    )}
                  </Table.Body>
                  <Table.Footer>
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
              </Grid.Column>
            </Grid.Row>
          ) : (
            <div>
              <Header>You do not have any leads saved under this list.</Header>
              <Button as={Link} to="/search">
                Go to Search
              </Button>
            </div>
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
    leadnotes: state.leadnotes
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
  { deleteList, deleteListLead, addLeadNote }
)(Dashboard);
