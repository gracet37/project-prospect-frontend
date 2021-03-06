import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import React, { Component } from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import { clearMessage } from "../actions";
import { logoutUser, currentUser } from "../actions/auth";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const HomepageHeading = ({ mobile }) => (
  <Container text centered>
    <Header
      as="h1"
      content="Search for Prospects Instantly"
      style={{
        fontSize: mobile ? "2em" : "3.2em",
        fontWeight: "bold",
        marginBottom: "10px",
        marginTop: mobile ? "1.5em" : "3.8em"
      }}
    />
    <SearchBar />
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
};

class DesktopContainer extends Component {
  state = {
    logoutChange: false
  };

  componentDidMount = () => {
    this.props.currentUser(this.props.history)
    this.props.clearMessage()
  }

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  handleLogout = () => {
    this.props.logoutUser();
    localStorage.removeItem("token");
    this.setState({ logoutChange: true });
    // this.props.history.push("/");
    // redirect to landing page
  };

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            // inverted
            textAlign="center"
            // style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
            style={{
              backgroundImage: `url(${"https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/s2048x2048/71093458_463527317706998_6857018496128122880_n.png?_nc_cat=101&_nc_oc=AQl2gDIEaIvqJ9nlneGMjfaDHtgfbFjLjkXKrF1ATz_lG8I8Qq2SYVjDCYwbysjSCwM&_nc_ht=scontent-ort2-2.xx&oh=644556da3c91d328452fcb67714c1c7d&oe=5E3A8CD8"})`,
              backgroundSize: "cover",
              minHeight: "800px",
              padding: "1em 0em"
            }}
          >
            <Menu
              fixed={fixed ? "top" : null}
              // inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item
                  style={{ fontSize: "large", color: "#43425D" }}
                  as={Link}
                  to="/"
                  active
                  onClick={this.props.clearMessage}
                >
                  Home
                </Menu.Item>
                <Menu.Item
                  style={{ fontSize: "large", color: "#43425D" }}
                  as={Link}
                  to={this.props.auth.user ? "/dashboard" : "/login" }
                  onClick={this.props.clearMessage}
                >
                  Dashboard
                </Menu.Item>
                <Menu.Item
                  style={{ fontSize: "large", color: "#43425D" }}
                  as={Link}
                  to={this.props.auth.user ? "/profile" : '/login' }
                  onClick={this.props.clearMessage}
                >
                  My Account
                </Menu.Item>
                {this.props.auth.user ? (
                  <Menu.Item position="right">
                    <Button
                      onClick={() => this.handleLogout()}
                      basic
                      color="grey"
                      // inverted
                      primary={fixed}
                      style={{
                        // backgroundColor: "#03DAC6",
                        // color: "white",
                        marginLeft: "1em"
                      }}
                    >
                      Logout
                    </Button>
                  </Menu.Item>
                ) : (
                  <Menu.Item position="right">
                    <Button
                      as={Link}
                      to="/login"
                      // style={{ backgroundColor: "#6200EE", color: "white" }}
                      // inverted
                      basic
                      color="grey"
                    >
                      Log in
                    </Button>
                    <Button
                      as={Link}
                      to="/signup"
                      // basic
                      // inverted
                      basic
                      color="grey"
                      style={{
                        // backgroundColor: "#03DAC6",
                        color: "white",
                        marginLeft: "0.5em"
                      }}
                      primary={fixed}
                    >
                      Sign Up
                    </Button>
                  </Menu.Item>
                )}
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as={Link} to="/" active>
            Home
          </Menu.Item>
          <Menu.Item as={Link} to="/dashboard">
            Dashboard
          </Menu.Item>
          <Menu.Item as={Link} to="/profile">
            My Profile
          </Menu.Item>
          {this.props.auth.user ? (
            <Menu.Item onClick={() => this.handleLogout()}
            >Log out</Menu.Item>
          ) : (
            <div>
              <Menu.Item as={Link} to="/login">Log in</Menu.Item>{" "}
              <Menu.Item as={Link} to="/signup">Sign Up</Menu.Item>
            </div>
          )}
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Button as={Link} to="/login" inverted>
                    Log in
                  </Button>
                  <Button
                    as={Link}
                    to="/signup"
                    inverted
                    style={{ marginLeft: "0.5em" }}
                  >
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(
  mapStateToProps,
  { logoutUser, currentUser, clearMessage }
)(withRouter(DesktopContainer));

// const HomepageLayout = () => (
//   <ResponsiveContainer>
//     <Segment style={{ padding: "8em 0em" }} vertical>
//       <Grid container stackable verticalAlign="middle">
//         <Grid.Row>
//           <Grid.Column width={8}>
//             <Header as="h3" style={{ fontSize: "2em" }}>
//               We Help Companies and Companions
//             </Header>
//             <p style={{ fontSize: "1.33em" }}>
//               We can give your company superpowers to do things that they never
//               thought possible. Let us delight your customers and empower your
//               needs... through pure data analytics.
//             </p>
//             <Header as="h3" style={{ fontSize: "2em" }}>
//               We Make Bananas That Can Dance
//             </Header>
//             <p style={{ fontSize: "1.33em" }}>
//               Yes that's right, you thought it was the stuff of dreams, but even
//               bananas can be bioengineered.
//             </p>
//           </Grid.Column>
//           <Grid.Column floated="right" width={6}>
//             <Image
//               bordered
//               rounded
//               size="large"
//               src="/images/wireframe/white-image.png"
//             />
//           </Grid.Column>
//         </Grid.Row>
//         <Grid.Row>
//           <Grid.Column textAlign="center">
//             <Button size="huge">Check Them Out</Button>
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
//     </Segment>
//     <Segment style={{ padding: "0em" }} vertical>
//       <Grid celled="internally" columns="equal" stackable>
//         <Grid.Row textAlign="center">
//           <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
//             <Header as="h3" style={{ fontSize: "2em" }}>
//               "What a Company"
//             </Header>
//             <p style={{ fontSize: "1.33em" }}>
//               That is what they all say about us
//             </p>
//           </Grid.Column>
//           <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
//             <Header as="h3" style={{ fontSize: "2em" }}>
//               "I shouldn't have gone with their competitor."
//             </Header>
//             <p style={{ fontSize: "1.33em" }}>
//               <Image avatar src="/images/avatar/large/nan.jpg" />
//               <b>Nan</b> Chief Fun Officer Acme Toys
//             </p>
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
//     </Segment>
//     <Segment style={{ padding: "8em 0em" }} vertical>
//       <Container text>
//         <Header as="h3" style={{ fontSize: "2em" }}>
//           Breaking The Grid, Grabs Your Attention
//         </Header>
//         <p style={{ fontSize: "1.33em" }}>
//           Instead of focusing on content creation and hard work, we have learned
//           how to master the art of doing nothing by providing massive amounts of
//           whitespace and generic content that can seem massive, monolithic and
//           worth your attention.
//         </p>
//         <Button as="a" size="large">
//           Read More
//         </Button>
//         <Divider
//           as="h4"
//           className="header"
//           horizontal
//           style={{ margin: "3em 0em", textTransform: "uppercase" }}
//         >
//           <a href="#">Case Studies</a>
//         </Divider>
//         <Header as="h3" style={{ fontSize: "2em" }}>
//           Did We Tell You About Our Bananas?
//         </Header>
//         <p style={{ fontSize: "1.33em" }}>
//           Yes I know you probably disregarded the earlier boasts as non-sequitur
//           filler content, but it's really true. It took years of gene splicing
//           and combinatory DNA research, but our bananas can really dance.
//         </p>
//         <Button as="a" size="large">
//           I'm Still Quite Interested
//         </Button>
//       </Container>
//     </Segment>
//     <Segment inverted vertical style={{ padding: "5em 0em" }}>
//       <Container>
//         <Grid divided inverted stackable>
//           <Grid.Row>
//             <Grid.Column width={3}>
//               <Header inverted as="h4" content="About" />
//               <List link inverted>
//                 <List.Item as="a">Sitemap</List.Item>
//                 <List.Item as="a">Contact Us</List.Item>
//                 <List.Item as="a">Religious Ceremonies</List.Item>
//                 <List.Item as="a">Gazebo Plans</List.Item>
//               </List>
//             </Grid.Column>
//             <Grid.Column width={3}>
//               <Header inverted as="h4" content="Services" />
//               <List link inverted>
//                 <List.Item as="a">Banana Pre-Order</List.Item>
//                 <List.Item as="a">DNA FAQ</List.Item>
//                 <List.Item as="a">How To Access</List.Item>
//                 <List.Item as="a">Favorite X-Men</List.Item>
//               </List>
//             </Grid.Column>
//             <Grid.Column width={7}>
//               <Header as="h4" inverted>
//                 Footer Header
//               </Header>
//               <p>
//                 Extra space for a call to action inside the footer that could
//                 help re-engage users.
//               </p>
//             </Grid.Column>
//           </Grid.Row>
//         </Grid>
//       </Container>
//     </Segment>
//   </ResponsiveContainer>
// );
