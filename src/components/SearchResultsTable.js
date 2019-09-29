import React from 'react';
import {connect} from 'react-redux';
import { addLead } from "../actions";
import Navbar from "./Navbar";
import EnhancedTable from "./EnhancedTable";

const style={
  backgroundImage: `url(${"https://scontent-ort2-2.xx.fbcdn.net/v/t1.15752-9/s2048x2048/71093458_463527317706998_6857018496128122880_n.png?_nc_cat=101&_nc_oc=AQl2gDIEaIvqJ9nlneGMjfaDHtgfbFjLjkXKrF1ATz_lG8I8Qq2SYVjDCYwbysjSCwM&_nc_ht=scontent-ort2-2.xx&oh=644556da3c91d328452fcb67714c1c7d&oe=5E3A8CD8"})`,
  backgroundSize: "cover",
  width: "100%",
  height: "100%",
  minHeight: 800,
  padding: "1em 0em"
}


class DataTable extends React.Component {
  state = {
    listId: "",
    leadSelection: "",
    company: "",
    website: "",
    newListName: "",
    leadsArray: [],
    rows: [],
    isLoading: true
  }  
  
  componentDidMount() {
    console.log(this.props.leads);
    const array = this.props.leads;
    this.createRowData()
    this.setState({ company: array.organization, website: array.domain });
  }

  createData = (name, last_name, email, position, company, confidence) => {
    return { name, last_name, email, position, company, confidence};
  }

  createRowData = () => {
    let array = []
    this.props.leads.emails.forEach(lead => {
        let newRow = this.createData(lead.first_name, lead.last_name, lead.value, lead.position, this.props.leads.organization, lead.confidence)
        array.push(newRow)
    })
    this.setState({rows: array})
    this.setState({isLoading: false})
  }
  
  // handleDropdown = (e, data) => {
  //   const targetValue = data.value;
  //   this.setState({ listId: targetValue });
  // };

  // handleChange = e => {
  //   const targetValue = e.target.value;
  //   const targetName = e.target.name;
  //   this.setState({ [targetName]: targetValue });
  // };

  handleSubmit = () => {
    const { leadsArray, company, website, listId, newListName } = this.state;
    console.log("SUBMIT", this.state);
    const userId = this.props.auth.user.id;
    this.props.addLead(
      leadsArray,
      company,
      website,
      listId,
      newListName,
      userId
    );
  };

  // handleLeadClick = (lead, checked) => {
  //   console.log(lead);
  //   console.log(checked);
  //   if (checked) {
  //     this.props.listWithLeadNotes.forEach(l => {
  //       console.log("what is l", l)
  //       if (l.lead.email !== lead.value) {
  //         this.setState({ leadsArray: [...this.state.leadsArray, lead] });
  //       } else {
  //         return (
  //           null
  //         )
  //       }
  //     })
  //   } else {
  //     const newArray = this.state.leadsArray.filter(
  //       l => l.value !== lead.value
  //     );
  //     this.setState({ leadsArray: newArray });
  //   }
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

    console.log(this.state)
    if (this.state.isLoading) {
      return <div>Loading</div>
    }
    return (
      <div style={style}>
        <Navbar />
        <EnhancedTable addLead={this.props.addLead} company={this.state.company} website={this.state.website} rows={this.state.rows} listArray={listArray} userId={this.props.auth.user.id}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    leads: state.leads,
    lists: state.lists,
    auth: state.auth,
    listWithLeadNotes: state.listWithLeadNotes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // addList: (listName, id) => {
    //   dispatch(addList(listName, id));
    // },
    addLead: (leadsArray, company, website, listId, newListName, userId) => {
      dispatch(
        addLead(leadsArray, company, website, listId, newListName, userId)
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable)


// function desc(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function stableSort(array, cmp) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = cmp(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map(el => el[0]);
// }

// function getSorting(order, orderBy) {
//   return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
// }

// const headCells = [
//   { id: 'name', numeric: false, disablePadding: true, label: 'First Name' },
//   { id: 'last_name', numeric: false, disablePadding: false, label: 'Last Name' },
//   { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
//   { id: 'position', numeric: false, disablePadding: false, label: 'Position' },
//   { id: 'company', numeric: false, disablePadding: false, label: 'Company' },
//   { id: 'confidence', numeric: true, disablePadding: false, label: 'Confidence' },
// ];

// function EnhancedTableHead(props) {
//   const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
//   const createSortHandler = property => event => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{ 'aria-label': 'select all leads' }}
//           />
//         </TableCell>
//         {headCells.map(headCell => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'default'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={order}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <span className={classes.visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </span>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// const useToolbarStyles = makeStyles(theme => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//   },
//   highlight:
//     theme.palette.type === 'light'
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   spacer: {
//     flex: '1 1 100%',
//   },
//   actions: {
//     color: theme.palette.text.secondary,
//   },
//   title: {
//     flex: '0 0 auto',
//   },
// }));

// const EnhancedTableToolbar = props => {
//   const classes = useToolbarStyles();
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       className={clsx(classes.root, {
//         [classes.highlight]: numSelected > 0,
//       })}
//     >
//       <div className={classes.title}>
//         {numSelected > 0 ? (
//           <Typography color="inherit" variant="subtitle1">
//             {numSelected} selected
//           </Typography>
//         ) : (
//           <Typography variant="h6" id="tableTitle">
//             Nutrition
//           </Typography>
//         )}
//       </div>
//       <div className={classes.spacer} />
//       <div className={classes.actions}>
//         {numSelected > 0 ? (
//           <Tooltip title="Delete">
//             <IconButton aria-label="delete">
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
//         ) : (
//           <Tooltip title="Filter list">
//             <IconButton aria-label="filter list">
//               <FilterListIcon />
//             </IconButton>
//           </Tooltip>
//         )}
//       </div>
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing(3),
//   },
//   paper: {
//     width: '100%',
//     marginBottom: theme.spacing(2),
//   },
//   table: {
//     minWidth: 750,
//   },
//   tableWrapper: {
//     overflowX: 'auto',
//   },
//   visuallyHidden: {
//     border: 0,
//     clip: 'rect(0 0 0 0)',
//     height: 1,
//     margin: -1,
//     overflow: 'hidden',
//     padding: 0,
//     position: 'absolute',
//     top: 20,
//     width: 1,
//   },
// }));

// function EnhancedTable(props) {
//   const classes = useStyles();
//   const [order, setOrder] = React.useState('asc');
//   const [orderBy, setOrderBy] = React.useState('last_name');
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleRequestSort = (event, property) => {
//     const isDesc = orderBy === property && order === 'desc';
//     setOrder(isDesc ? 'asc' : 'desc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = event => {
//     if (event.target.checked) {
//       const newSelecteds = props.rows.map(n => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = event => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleChangeDense = event => {
//     setDense(event.target.checked);
//   };

//   const isSelected = name => selected.indexOf(name) !== -1;

//   const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.rows.length - page * rowsPerPage);
//   if (props.rows) {
//   return (
//     <div className={classes.root}>
//       <Paper className={classes.paper}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <div className={classes.tableWrapper}>
//           <Table
//             className={classes.table}
//             aria-labelledby="tableTitle"
//             size={dense ? 'small' : 'medium'}
//           >
//             <EnhancedTableHead
//               classes={classes}
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={props.rows.length}
//             />
//             <TableBody>
//               {stableSort(props.rows, getSorting(order, orderBy))
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => {
//                   const isItemSelected = isSelected(row.name);
//                   const labelId = `enhanced-table-checkbox-${index}`;

//                   return (
//                     <TableRow
//                       hover
//                       onClick={event => handleClick(event, row.name)}
//                       role="checkbox"
//                       aria-checked={isItemSelected}
//                       tabIndex={-1}
//                       key={row.name}
//                       selected={isItemSelected}
//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           checked={isItemSelected}
//                           inputProps={{ 'aria-labelledby': labelId }}
//                         />
//                       </TableCell>
//                       <TableCell component="th" id={labelId} scope="row" padding="none">
//                         {row.name}
//                       </TableCell>
//                       <TableCell align="right">{row.last_name}</TableCell>
//                       <TableCell align="right">{row.email}</TableCell>
//                       <TableCell align="right">{row.position}</TableCell>
//                       <TableCell align="right">{row.company}</TableCell>
//                       <TableCell align="right">{row.confidence}</TableCell>
//                     </TableRow>
//                   );
//                 })}
//               {emptyRows > 0 && (
//                 <TableRow style={{ height: 49 * emptyRows }}>
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={props.rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           backIconButtonProps={{
//             'aria-label': 'previous page',
//           }}
//           nextIconButtonProps={{
//             'aria-label': 'next page',
//           }}
//           onChangePage={handleChangePage}
//           onChangeRowsPerPage={handleChangeRowsPerPage}
//         />
//       </Paper>
//   </div> 
//   )
//   } else {
//     return <div>Loading</div>
//   };
// }
