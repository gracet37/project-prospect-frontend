import React, { Component } from "react";
import Navbar from "./Navbar";
import { Header, Image, Segment, Container, Grid} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { currentUser, loadUser } from "../actions";

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
    } else if (this.state.success == true) {
      condRender = (
        <div style={{textAlign: 'center', backgroundImage: `url(${"https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/s2048x2048/70590332_836756946718765_3473765009224368128_n.png?_nc_cat=111&_nc_oc=AQnI8TKKO2F4LqO-fZDRyZuRDWWLWhMONIpEB2mHf1QEmAP04HdNNIq8JU0QUq5LYwE&_nc_ht=scontent-ort2-2.xx&oh=e9db466921239dad5b5ae5b132f1f40f&oe=5E3DD369"})`}}>
          {" "}
          
          <Navbar />
          {/* <Header
            style={{ position: "fixed", top: "80px", left: "50px" }}
            as="h3"
            content="Text Container"
            textAlign="center"
          > */}
          <Container style={{display: 'inline-block', minHeight: '830px', width: '50%', backgroundImage: `url(${"https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/s2048x2048/70590332_836756946718765_3473765009224368128_n.png?_nc_cat=111&_nc_oc=AQnI8TKKO2F4LqO-fZDRyZuRDWWLWhMONIpEB2mHf1QEmAP04HdNNIq8JU0QUq5LYwE&_nc_ht=scontent-ort2-2.xx&oh=e9db466921239dad5b5ae5b132f1f40f&oe=5E3DD369"})`, backgroundSize: 'cover'}}>
            <Grid>
              <Grid.Column style={{ positon: "absolute", top: '70px', verticalAlign: 'center'}}>
                <Grid.Row columns={1} centered doubling>
                  <Grid.Column centered>
                    <Segment textAlign='center'>
                      <Header as="h1">
                        {" "}
                        {this.props.auth.user.first_name}{" "}
                        {this.props.auth.user.last_name}
                      </Header>
                      <Image circular src={this.props.auth.user.img_url} />
                    <Segment style={{ marginBottom: "20px", marginTop: "20px" }} as={Link} to='/edit'>Edit Account</Segment>
                    <Segment style={{ marginBottom: "20px", marginTop: "20px" }} as={Link} to='/leadlists'>View Lead Lists</Segment>
                    <Segment style={{ marginBottom: "20px", marginTop: "20px" }} onClick={this.handleDeleteClick} >Delete Account</Segment>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
              {/* <Grid.Column style={{ positon: "absolute", left: "150px" }}>
                <Grid.Row columns={3} doubling>
                  <Grid.Column style={{ marginBottom: "20px" }}>
                    <Segment>Edit Account</Segment>
                  </Grid.Column>
                  <Grid.Column style={{ marginBottom: "20px" }}>
                    <Segment>View Lead Lists</Segment>
                  </Grid.Column>
                  <Grid.Column style={{ marginBottom: "20px" }}>
                    <Segment>Delete Account</Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column> */}
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

//   }

//   render() {
//     console.log(this.props.auth)
//     // const {img_url, first_name, last_name, email} = this.props.auth.user
//     const isLoading = this.state.isLoading
//     if (isLoading) {
//       return (
//         <div>Loading...</div>
//         )
//       } else {
//         console.log(this.props.auth.user.img_url)
//     return (
//       <div>
//         <Navbar />
//         <Header
//           style={{ position: "fixed", top: "80px", left: "50px" }}
//           as="h3"
//           content="Text Container"
//           textAlign="center"
//         >
//           <Grid columns={2}>
//             <Grid.Column>
//               <Grid columns={2} doubling stackable>
//                 <Grid.Column>
//                   <Segment>
//                     <Image circular  />
//                   </Segment>
//                 </Grid.Column>
//                 <Grid.Column>
//                   <Header> </Header>
//                 </Grid.Column>
//               </Grid>
//             </Grid.Column>
//             <Grid.Column>
//               <Grid columns={3} doubling stackable>
//                 <Grid.Column>
//                   <Segment>Content</Segment>
//                 </Grid.Column>
//                 <Grid.Column>
//                   <Segment>Content</Segment>
//                 </Grid.Column>
//                 <Grid.Column>
//                   <Segment>Content</Segment>
//                 </Grid.Column>
//               </Grid>
//             </Grid.Column>
//           </Grid>
//         </Header>
//       </div>
//     );
//     }
//   }
// }

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { loadUser }
)(UserProfile);
