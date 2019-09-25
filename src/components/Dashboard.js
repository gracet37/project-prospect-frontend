import React, { Component } from "react";
import { Grid, Image, Card, Table, Icon, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import _ from 'lodash'
import Navbar from "./Navbar";
import { deleteList } from '../actions'

class Dashboard extends Component {
  // UPDATE DATA WITH LISTS 
  state = {
    column: null,
    data: [],
    direction: null
  };

  componentDidMount() {
   
  }

  formatListArray = (listArray) => {
      console.log("list array", listArray)
      let filteredArray = [];
      // let lists = this.props.lists[0];
      Object.keys(listArray).forEach(function(i) {
        let date = new Date(listArray[i].created_at)
        let dateString = date.toDateString()
        filteredArray.push({
          id: listArray[i].id,
          name: listArray[i].name,
          created: dateString
        });
      });
      // this.setState({data: listArray})}
      return filteredArray
  }

  handleDeleteClick = (event, id) => {
    event.preventDefault()
    console.log(id)
    this.props.deleteList(id)
  }

  handleRowClick = (id) => {
    console.log("row clicked", id)
  }
  
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

  render() {
    let data = []
    if (this.props.lists.length) {
      data = this.formatListArray(this.props.lists[0])
    }
    const { column, direction } = this.state;
    console.log(this.props.lists)
    console.log(this.state)
    return (
      <div style={{ height: "100%" }}>
        <Navbar />
        <Grid divided="vertically">
          <Grid.Row columns={3}>
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

          <Grid.Row columns={1}>
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
                      sorted={column === "meetings" ? direction : null}
                      onClick={this.handleSort("meetings")}
                    >
                      Meetings Booked
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === "total" ? direction : null}
                      onClick={this.handleSort("total")}
                    >
                      Total Leads
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === "date" ? direction : null}
                      onClick={this.handleSort("date")}
                    >
                      Date Created
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === "date" ? direction : null}
                      onClick={this.handleSort("date")}
                    >
                      Delete List
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {_.map(data, ({ id, name, user_id, created, updated_at }) => (
                    <Table.Row key={id} onClick={() => this.handleRowClick(id)}>
                      <Table.Cell>{name}</Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell>{created}</Table.Cell>
                      <Table.Cell><Icon name={'trash alternate outline'} onClick={(event) => this.handleDeleteClick(event, id)} name='trash alternate outline' size='large' /></Table.Cell>
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
    lists: state.lists
  }
};

const mapDispatchToProps = dispatch => {
  return {
    deleteList: (id) => {
      dispatch(deleteList(id))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
