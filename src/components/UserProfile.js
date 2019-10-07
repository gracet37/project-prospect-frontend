import React, { Component } from "react";
import Navbar from "./Navbar";
import { Header, Image, Segment, Container, Grid} from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadUser } from "../actions";

class UserProfile extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      success: null
    };
  }

  componentWillMount() {
    this.props.loadUser(
      () => {
        this.setState({ loading: true });
      },
      () => {
        this.setState({ success: true, loading: false });
      },
      () => {
        this.setState({ success: false, loading: false });
      }
    );
  }

  handleDeleteClick = () => {

  }

  render() {
    let condRender = null;

    if (this.state.loading) {
      condRender = <div> LOADING </div>;
    } else if (this.state.success === true) {
      condRender = (
        <div style={{textAlign: 'center',  minHeight: '800px', backgroundImage: `url(${"https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/s2048x2048/70590332_836756946718765_3473765009224368128_n.png?_nc_cat=111&_nc_oc=AQnI8TKKO2F4LqO-fZDRyZuRDWWLWhMONIpEB2mHf1QEmAP04HdNNIq8JU0QUq5LYwE&_nc_ht=scontent-ort2-2.xx&oh=e9db466921239dad5b5ae5b132f1f40f&oe=5E3DD369"})`}}>
          {" "}
          
          <Navbar />
          <Container style={{display: 'inline-block', minHeight: '500px', width: '50%'}}>
            <Grid>
              <Grid.Column style={{ positon: "absolute", top: '90px', verticalAlign: 'center'}}>
                <Grid.Row columns={1} centered>
                  <Grid.Column style={{display: 'inline-block', textAlign: 'center'}}>
                    <Segment style={{paddingRight: "100px", paddingLeft: "100px"}}>
                      <Header as="h1" style={{margin: '10px'}}>
                        {" "}
                        {this.props.auth.user.first_name}{" "}
                        {this.props.auth.user.last_name}
                      </Header>
                      <Image style={{display: 'inline-block', textAlign: 'center', margin: '10px'}} circular src={this.props.auth.user.img_url} />
                    <Grid.Row style={{ margin: "40px"}}>
                    <Segment style={{ borderRadius: '50px', minWidth: '200px', height: '30px', backgroundColor: "#6200EE", color: 'white' }} as={Link} to='/edit' >Edit Account</Segment>
                    </Grid.Row>
                    <Grid.Row style={{ margin: "20px", marginBottom: "30px"}}>                    
                    <Segment style={{ borderRadius: '50px', backgroundColor: "#03DAC6", color: 'white', borderColor: "#03DAC6" }} as={Link} to='/dashboard'>View Lead Lists Account</Segment>
                    </Grid.Row>
                    <Grid.Row style={{ margin: "20px"}}>                    
                    <Segment style={{ borderRadius: '50px', backgroundColor: "#43425D", color: 'white'}} onClick={this.handleDeleteClick} >Delete Account</Segment>
                    </Grid.Row>
                    </Segment>

                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      );
    } else if (!this.state.success) {
      condRender = <div> ERROR </div>;
    }

    return condRender;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { loadUser }
)(UserProfile);
