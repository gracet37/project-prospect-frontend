import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import "../App.css";

export default class MailForm extends Component {
  render() {
    return (
      <div className="container">
        <Form>
          <Form.Field>
            <label>To</label>
            <value>{this.props.email}</value>
          </Form.Field>
          <Form.Field>
            <label>From</label>
            <value>{this.props.myEmail}</value>
          </Form.Field>
          <Form.Field>
            <label>Subject</label>
            <input placeholder="subject"/>
          </Form.Field>
          <Form.Input rows="10" style={{height:'200px'}}>
          </Form.Input>
          <Button style={{borderRadius: '50px', backgroundColor: '#03DAC6', color: 'white'}} type="send">Send</Button>
        </Form>
      </div>
    );
  }
}
