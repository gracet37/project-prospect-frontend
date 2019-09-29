import React from "react";
import { userEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Modal, Button, Dropdown, Form, Icon } from "semantic-ui-react";

const uuidv1 = require("uuid/v1");

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "First Name" },
  {
    id: "last_name",
    numeric: false,
    disablePadding: false,
    label: "Last Name"
  },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "position", numeric: false, disablePadding: false, label: "Position" },
  { id: "company", numeric: false, disablePadding: false, label: "Company" },
  {
    id: "confidence",
    numeric: true,
    disablePadding: false,
    label: "Confidence"
  }
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead style={{ fontSize: "12px" }}>
      <TableRow style={{ fontSize: "12px" }}>
        <TableCell style={{ fontSize: "12px" }} padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all leads" }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            style={{ fontSize: "15px" }}
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
    // marginLeft: '200px'
  },
  title: {
    flex: "0 0 auto"
  }
}));

function getClasses(props) {
  let classes;
  classes = makeStyles(theme => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    highlight: {
      backgroundColor: "black"
    },
    // theme.palette.type === 'light'
    //   ? {
    //       color: theme.palette.secondary.main,
    //       backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    //     }
    // : {
    //     color: theme.palette.text.primary,
    //     backgroundColor: theme.palette.secondary.dark,
    //   },
    spacer: {
      flex: "1 1 100%"
    },
    actions: {
      color: theme.palette.text.secondary
    },
    title: {
      flex: "0 0 auto"
    }
  }));
  return classes;
}

class EnhancedTableToolbar extends React.Component {
  state = {
    listId: "",
    leadSelection: "",
    company: "",
    website: "",
    newListName: "",
    activePage: 1,
    leadsPagination: [],
    classes: ""
  };

  componentDidMount() {
    // let classes = useToolbarStyles()
    // this.setState({classes})
  }

  handleDropdown = (e, data) => {
    const targetValue = data.value;
    this.setState({ listId: targetValue });
  };

  handleChange = e => {
    const targetValue = e.target.value;
    const targetName = e.target.name;
    this.setState({ [targetName]: targetValue });
  };

  handleSubmit = () => {
    const { listId, newListName } = this.state;
    const { leadsArray, company, website } = this.props;
    console.log("SUBMIT", this.state);
    const userId = this.props.userId;
    this.props.addLead(
      leadsArray,
      company,
      website,
      listId,
      newListName,
      userId
    );
  };

  render() {
    console.log(this.state);
    const classes = getClasses();
    const { numSelected } = this.props;
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
        // style={{ backgroundColor: "black", color: "white" }}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="h6">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="h4" id="tableTitle">
              Search Results
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div style={{margin:'20px'}}>
          {numSelected > 0 ? (
            <Tooltip title="Save">
              {/* <IconButton aria-label="delete"> */}
              <Modal
                centered
                trigger={<Button style={{borderRadius: "100px", backgroundColor: '#6200EE', color: 'white', width: '150px',fontSize: 'medium', verticalAlign: 'middle', textAlign: 'center'}}>Save Leads</Button>}
                basic
                size="small"
              >
                {this.props.listArray.length ? (
                  <div style={{position: 'absolute', left: '30%', bottom: '-30%'}}>
                    <Modal.Header as="h2">
                      Select an Existing List:
                    </Modal.Header>
                    <Modal.Actions>
                      <Dropdown
                        onChange={this.handleDropdown}
                        name="listId"
                        style={{ width: "40%" }}
                        placeholder="Select list..."
                        // fluid
                        disabled={this.state.newListName ? true : false}
                        selection
                        options={this.props.listArray}
                      />
                      <Modal.Header as="h2">Create a New List:</Modal.Header>
                      <Form.Input
                        placeholder="Create new list..."
                        onChange={this.handleChange}
                        name="newListName"
                      />
                      <Modal.Header as="h2"></Modal.Header>
                      <Button
                        onClick={this.handleSubmit}
                        basic
                        color="blue"
                        inverted
                      >
                        <Icon name="add" /> Add Lead to List
                      </Button>
                    </Modal.Actions>
                  </div>
                ) : (
                  <div>
                    <Modal.Header as="h2">Create A New List</Modal.Header>
                    <Modal.Actions>
                      <Form.Input
                        placeholder="Create new list..."
                        onChange={this.handleChange}
                        name="newListName"
                      />
                      <Button
                        onClick={this.handleSubmit}
                        basic
                        color="blue"
                        inverted
                      >
                        <Icon name="add" /> Add Lead to List
                      </Button>
                    </Modal.Actions>
                  </div>
                )}
              </Modal>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="filter list">
                {/* <FilterListIcon /> */}
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
  }
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "85%",
    margin: "20px",
    marginTop: 80,
    display: "inline-block"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: "auto"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  head: {
    fontSize: "12px"
  }
}));

export default function EnhancedTable(props) {
  const listArray = props.listArray;
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("last_name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [leadsArray, setLeadsArray] = React.useState([]);

  const handleLeadClick = (lead, event) => {
    console.log(lead);
    console.log(event.target.checked);
    if (event.target.checked) {
      setLeadsArray(leadsArray => [...leadsArray, lead]);
    } else {
      const newArray = leadsArray.filter(l => l.email !== lead.email);
      setLeadsArray(leadsArray => newArray);
    }
  };

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = props.rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, email) => {
    const selectedIndex = selected.indexOf(email);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, email);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeDense = event => {
    setDense(event.target.checked);
  };

  const isSelected = email => selected.indexOf(email) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.rows.length - page * rowsPerPage);
  console.log(leadsArray);
  if (props.rows) {
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar
            addLead={props.addLead}
            leadsArray={leadsArray}
            company={props.company}
            website={props.website}
            listArray={listArray}
            userId={props.userId}
            numSelected={selected.length}
          />
          <div className={classes.tableWrapper}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={props.rows.length}
              />
              <TableBody>
                {stableSort(props.rows, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.email);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, row.email)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={uuidv1()}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onChange={event => {
                              handleLeadClick(row, event);
                            }}
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.last_name}</TableCell>
                        <TableCell id={labelId} align="left">
                          {row.email}
                        </TableCell>
                        <TableCell align="left">{row.position}</TableCell>
                        <TableCell align="left">{row.company}</TableCell>
                        <TableCell align="left">{row.confidence}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "previous page"
            }}
            nextIconButtonProps={{
              "aria-label": "next page"
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
