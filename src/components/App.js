import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Navbar from './Navbar'
import LeadListContainer from './LeadListContainer'
import SearchContainer from './SearchContainer'
import UserProfile from './UserProfile'

const CATEGORY_URL = 'http://localhost:3000/api/v1/categories'
// const USER_URL = 'http://localhost:3000/users'
const LEADS_URL = 'http://localhost:3000/api/v1/leads'



export default class App extends Component {
  state = {
    categories: [],
    domainInput: "",
    domainQueryResults: []
  }
  
componentDidMount() {
  // this.fetchHunter()
  // this.fetchCategories()
  // this.fetchLeads()
}

fetchHunter = () => {
  // // const domain = this.state.domainInput
  // const domain = "mintel.com"
  // const hunterAPI = `https://api.hunter.io/v2/domain-search?domain=${domain}&limit=100&api_key=7ca084937e5e049696b7bb64c10366c3d077c650`
  // fetch(hunterAPI)
  //   .then(res => res.json())
  //   .then(console.log)
  //   .catch(err => console.log(err))
}

fetchCategories = () => {
  fetch(CATEGORY_URL)
  .then(res => res.json())
  .then(console.log)
}

fetchLeads = () => {
  fetch(LEADS_URL)
  .then(res => res.json())
  .then(console.log)
}

// Update routes with the components they should render
  render() {
    // console.log(this.state)
    return (
      <Router>
        <div className="app">
          <Navbar />
          <Route exact path="/" component={SearchContainer} />
          <Route exact path="/leadlists" component={LeadListContainer} />
          <Route exact path="/profile" component={UserProfile} />
          {/* <Route exact path="/logout" component={} /> */}
        </div>
      </Router>
    )
  }
}
