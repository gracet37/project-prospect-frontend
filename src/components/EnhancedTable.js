import React from "react";
import { useState } from "react";
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
import { Modal, Button, Dropdown, Form, Icon } from "semantic-ui-react";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { Link } from "react-router-dom";

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
  { id: "company", numeric: false, disablePadding: false, label: "Company" }
  // {
  //   id: "confidence",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Lead Accuracy"
  // }
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
            style={{
              marginLeft: "20px",
              marginRight: "20px"
            }}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
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
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
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
    classes: "",
    submitted: false,
    showModal: false
  };

  handleDropdown = (e, data) => {
    const targetValue = data.value;
    this.setState({ listId: targetValue });
  };

  handleChange = e => {
    const targetValue = e.target.value;
    const targetName = e.target.name;
    this.setState({ [targetName]: targetValue , listId: ""});
  };

  handleSubmit = () => {
    const { listId, newListName } = this.state;
    const capitalizedName =
      newListName.charAt(0).toUpperCase() + newListName.substring(1);
    const { selected, company, website } = this.props;
    const userId = this.props.userId;
    this.props.addLead(
      // leadsArray,
      selected,
      company,
      website,
      listId,
      capitalizedName,
      userId
    );
    this.handleClearListName();
    this.closeModal();
  };

  handleClearListName() {
    this.setState({ newListName: "" });
  }

  // handleClearMessage = () => {

  // }

  closeModal = () => {
    this.setState({ showModal: false });
    this.props.clearMessage();
  };

  render() {
    const classes = getClasses();
    const { showModal } = this.state;
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
            <div style={{ width: "100%" }}>
              <div style={{ display: "inline-block" }}>
                <Typography variant="h4" id="tableTitle">
                  Search Results
                </Typography>
              </div>
              <div
                style={{
                  display: "inline-block",
                  float: "right",
                  marginLeft: "30px"
                }}
              >
                <Button
                  as={Link}
                  to="/"
                  style={{
                    borderRadius: "30px",
                    color: "#6200EE",
                    backgroundColor: "white",
                    // borderColor: "#6200EE",
                    float: "right",
                    top: "20px"
                  }}
                >
                  <Icon name="arrow alternate circle left outline" /> Back to
                  Search
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className={classes.spacer} />
        <div style={{ margin: "20px" }}>
          {numSelected > 0 ? (
            <Modal
              closeIcon
              onClose={this.closeModal}
              open={showModal}
              centered
              trigger={
                <Button
                  onClick={() => this.setState({ showModal: true })}
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#6200EE",
                    color: "white",
                    width: "150px",
                    fontSize: "medium",
                    verticalAlign: "middle",
                    textAlign: "center"
                  }}
                >
                  Save Leads
                </Button>
              }
              basic
              size="small"
            >
              {this.props.listArray.length ? (
                <div style={{ verticalAlign: "center", textAlign: "center" }}>
                  {this.props.message ? (
                    <Modal.Header style={{ color: "#71EFE0" }} as="h2">
                      {this.props.message}
                    </Modal.Header>
                  ) : null}
                  <Modal.Header as="h2">Select an Existing List:</Modal.Header>
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
                    >
                      <input style={{ width: "272px", height: "38px" }}></input>
                    </Form.Input>
                    <Modal.Header as="h2"></Modal.Header>
                    <Form.Button
                      onClick={this.handleSubmit}
                      // basic
                      // color="violet"
                      // inverted
                      style={{
                        borderRadius: "70px",
                        backgroundColor: "#6200EE",
                        color: "white",
                        width: "150px",
                        padding: "10px"
                      }}
                    >
                      <Icon name="add" /> Add Lead to List
                    </Form.Button>
                  </Modal.Actions>
                </div>
              ) : (
                <div style={{ verticalAlign: "center", textAlign: "center" }}>
                  {this.props.message ? (
                    <Modal.Header style={{ color: "#71EFE0" }} as="h2">
                      {this.props.message}
                    </Modal.Header>
                  ) : null}
                  <Modal.Header as="h2">Create A New List</Modal.Header>
                  <Modal.Actions>
                    <Form.Input
                      placeholder="Create new list..."
                      onChange={this.handleChange}
                      name="newListName"
                    >
                      <input
                        style={{ borderRadius: "50px", width: "300px" }}
                      ></input>
                    </Form.Input>
                    <Form.Button
                      onClick={this.handleSubmit}
                      // basic
                      // color="violet"
                      // inverted
                      style={{
                        borderRadius: "70px",
                        backgroundColor: "#6200EE",
                        color: "white",
                        width: "150px",
                        padding: "10px",
                        margin: "20px"
                      }}
                    >
                      <Icon name="add" /> Add Lead to List
                    </Form.Button>
                  </Modal.Actions>
                </div>
              )}
            </Modal>
          ) : (
            // </Tooltip>
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
    margin: "50px",
    marginTop: 100,
    // verticalAlign: "middle",
    textAlign: "center",
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
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  // const [leadsArray, setLeadsArray] = React.useState([]);

  // const handleLeadClick = (lead, event) => {
  //   if (event.target.checked) {
  //     setLeadsArray(leadsArray => [...leadsArray, lead]);
  //   } else {
  //     const newArray = leadsArray.filter(l => l.email !== lead.email);
  //     setLeadsArray(leadsArray => newArray);
  //   }
  // };

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = props.rows.map(n => n);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
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

  const isSelected = row => selected.indexOf(row) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.rows.length - page * rowsPerPage);
  if (props.rows) {
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar
            clearMessage={props.clearMessage}
            addLead={props.addLead}
            selected={selected}
            // leadsArray={leadsArray}
            company={props.company}
            website={props.website}
            listArray={listArray}
            userId={props.userId}
            numSelected={selected.length}
            message={props.message}
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
                    const isItemSelected = isSelected(row);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        // style={{fontSize: '20px' }}
                        hover
                        onClick={event => handleClick(event, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={uuidv1()}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            style={{
                              marginLeft: "20px",
                              marginRight: "20px"
                            }}
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite />}
                            // onChange={event => {
                            //   handleLeadClick(row, event);
                            // }}
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          // style={{ paddingRight: "30px"}
                          component="th"
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.last_name}</TableCell>
                        <TableCell id={labelId} align="left">
                          {row.email}
                        </TableCell>
                        <TableCell align="left">{row.position}</TableCell>
                        <TableCell align="left">{row.company}</TableCell>
                        {/* <TableCell align="left">{row.confidence}</TableCell> */}
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
            rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
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
