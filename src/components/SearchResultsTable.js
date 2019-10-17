import React from "react";
import { connect } from "react-redux";
import { addLead } from "../actions/leads";
import { clearMessage } from "../actions";
import Navbar from "./Navbar";
import EnhancedTable from "./EnhancedTable";

const style = {
  backgroundImage: `url(${"https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/s2048x2048/71093458_463527317706998_6857018496128122880_n.png?_nc_cat=101&_nc_oc=AQl2gDIEaIvqJ9nlneGMjfaDHtgfbFjLjkXKrF1ATz_lG8I8Qq2SYVjDCYwbysjSCwM&_nc_ht=scontent-ort2-2.xx&oh=644556da3c91d328452fcb67714c1c7d&oe=5E3A8CD8"})`,
  backgroundSize: "cover",
  width: "100%",
  height: "100%",
  minHeight: 1000,
  padding: "1em 0em"
};

class DataTable extends React.Component {
  state = {
    listId: "",
    leadSelection: "",
    company: "",
    website: "",
    newListName: "",
    // leadsArray: [],
    rows: [],
    isLoading: true
  };

  componentDidMount() {
    const array = this.props.leads;
    this.createRowData();
    this.setState({ company: array.organization, website: array.domain });
  }

  createData = (name, last_name, email, position, company, confidence) => {
    return { name, last_name, email, position, company, confidence };
  };

  createRowData = () => {
    let array = [];
    this.props.leads.emails.forEach(lead => {
      let newRow = this.createData(
        lead.first_name,
        lead.last_name,
        lead.value,
        lead.position,
        this.props.leads.organization,
        lead.confidence
      );
      array.push(newRow);
    });
    this.setState({ rows: array });
    this.setState({ isLoading: false });
  };

  // handleSubmit = () => {
  //   const { leadsArray, company, website, listId, newListName } = this.state;
  //   console.log("SUBMIT", this.state);
  //   const userId = this.props.auth.user.id;
  //   this.props.addLead(
  //     leadsArray,
  //     company,
  //     website,
  //     listId,
  //     newListName,
  //     userId
  //   );
  // };


  render() {
    let lists = this.props.lists;
    let listArray = lists.map(list => {
      return {
        key: list.id,
        text: list.name,
        value: list.id
      };
    });

    if (this.state.isLoading) {
      return <div>Loading</div>;
    }
    return (
      <div style={style}>
        <Navbar />
       
        <EnhancedTable
          clearMessage={this.props.clearMessage}
          message={this.props.message}
          addLead={this.props.addLead}
          company={this.state.company}
          website={this.state.website}
          rows={this.state.rows}
          listArray={listArray}
          userId={this.props.auth.user.id}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    leads: state.leads,
    lists: state.lists,
    auth: state.auth,
    message: state.message,
    listWithLeadNotes: state.listWithLeadNotes
  };
};

export default connect(
  mapStateToProps,
  { addLead, clearMessage }
)(DataTable);
