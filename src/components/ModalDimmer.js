<<<<<<< HEAD
// ! Component not in use

// state = {

//   show: false
// };

// show = dimmer => this.setState({ dimmer, show: true });
// handleConfirm = () => this.setState({ show: false });
// handleCancel = () => {
//   this.setState({ show: false });
//   // let newArray = this.state.data.filter(data => data.id !== id);
//   // this.setState({ data: newArray });
//   // this.props.deleteList(id);
// };

// handleConfirm = (event, id) => {
//   event.preventDefault();
//   let newArray = this.props.lists.filter(list => list.id !== id);
//   this.setState({ show: false });
//   this.props.deleteList(id);
// };
=======
state = {

  show: false
};

show = dimmer => this.setState({ dimmer, show: true });
handleConfirm = () => this.setState({ show: false });
handleCancel = () => {
  this.setState({ show: false });
  // let newArray = this.state.data.filter(data => data.id !== id);
  // this.setState({ data: newArray });
  // this.props.deleteList(id);
};

handleConfirm = (event, id) => {
  event.preventDefault();
  let newArray = this.props.lists.filter(list => list.id !== id);
  this.setState({ show: false });
  this.props.deleteList(id);
};
>>>>>>> b722cbf115b1d614d934d8c54f5ab2e5ba3426bb
