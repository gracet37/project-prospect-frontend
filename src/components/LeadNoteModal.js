import React, { Component } from "react";
import { Button, Header, Image, Modal, Card, Form, Dropdown } from "semantic-ui-react";


const styleDropdown = {
  width: "40%"
};

const statusArray = [
{key: "10", text: "Meeting booked", value: "10"},
{key: "25", text: "Met with decision maker", value: "25"},
{key: "50", text: "Proposal sent", value: "50"},
{key: "90", text: "Verbal confirmation", value: "90"},
{key: "100", text: "Sale closed", value: "100"},
{key: "notfit", text: "Not fit for business", value: "notfit"},
{key: "incorrect", text: "Incorrect contact", value: "incorrect"},
{key: "contact", text: "Contact at later date", value: "contact"}
]

export default class LeadNoteModal extends Component {

  render() {
    return (
      <div>
      
      </div>
    );
  }
}
