// import React, { Component } from "react";
// import NavBar from "../components/Navbar";
// import DatatablePage from "../NOT USING/DatatablePage";
// import LoginForm from "../components/LoginForm";
// import { thunkFetchLeads, thunkFetchLists } from "../actions";
// import { connect } from "react-redux";


// const CATEGORY_URL = "https://frozen-shore-20550.herokuapp.com/api/v1/categories";
// const LEADS_URL = "https://frozen-shore-20550.herokuapp.com/api/v1/leads";

// class SearchContainer extends Component {

//   render() {
//     // console.log(this.state)
//     return (
//       <div>
//         <NavBar />
//           <div>
//             {/* <SearchBar /> */}
//             {/* <LeadList /> */}
//             {/* <SearchResultsTest /> */}
//           </div>
//         {/* <SearchResultsTest />} */}
//       </div>
//     );
//   }
// }

// // const mapStateToProps = state => {
// //   return {leads: state.leads}
// // }

// // const mapDispatchToProps = dispatch => {
// //   return {
// //     thunkFetchLeads: () => {
// //       dispatch(thunkFetchLeads());
// //     },
// //     thunkFetchLists: () => {
// //       dispatch(thunkFetchLists());
// //     }
// //   };
// // };

// const mapStateToProps = state => {
//   return {
//     auth: state.auth
//   };
// };

// export default connect(
//   mapStateToProps,
//   null
// )(SearchContainer);
