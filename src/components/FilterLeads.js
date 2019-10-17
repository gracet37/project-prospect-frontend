<<<<<<< HEAD
// ! Component not in use

// import React, { Component } from "react";

// export default class Search extends Component {
//   state = {
//     query: ""
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//   };

//   handleChange = event => {
//     this.setState({ query: event.target.value });
//   };

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <label>Search:</label>
//           <input type="text" onChange={this.handleChange} />
//           <input type="submit" />
//         </form>
//       </div>
//     );
//   }
// }
=======
import React, { Component } from "react";

export default class Search extends Component {
  state = {
    query: ""
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Search:</label>
          <input type="text" onChange={this.handleChange} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
>>>>>>> b722cbf115b1d614d934d8c54f5ab2e5ba3426bb
