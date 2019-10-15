// All redux functions that relate to lists

import { FETCH_LISTS, FETCH_LIST_BY_ID, START_DELETE_LIST, FETCH_LIST_WITH_LEADNOTES, ADD_LIST, SUCCESS_MESSAGE, DELETE_LIST, DELETE_LIST_WITH_LEADNOTE, SORT_LISTS } from './types'

const uuidv1 = require("uuid/v1");


// ? Invoked on App.js and fetches all lists in array format with leads data
// ? Used to populate the Dashboard.js

export function thunkFetchLists(id) {
  return function(dispatch) {
    // dispatch({ type: START_FETCH_LISTS });

    fetch(`http://localhost:3000/api/v1/lists/show_lists/${id}`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: FETCH_LISTS, lists: data });
      })
      .catch(err => console.log(err));
  };
}

// ? Search by id of the LIST and return a list with leads and leadnote data
// ? Used to populate LeadList.js

export function thunkFetchListById(id, history) {
  return function(dispatch) {
    fetch(`http://localhost:3000/api/v1/lists/show_special/${id}`)
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: FETCH_LIST_BY_ID,
          leads: data.leads,
          list: data.list
        });
        history.push("/leads");
      })
      .catch(err => console.log(err));
  };
}

export function thunkFetchAllListById(id) {
  return function(dispatch) {
    fetch(`http://localhost:3000/api/v1/lists/show_special_all/${id}`)
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: FETCH_LIST_WITH_LEADNOTES,
          leads: data.leads_with_notes
        });
      })
      .catch(err => console.log(err));
  };
}


export function addList(newListName, userId) {
  return function(dispatch) {
    fetch("http://localhost:3000/api/v1/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: newListName,
        user_id: userId
      })
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: ADD_LIST, list: data });
        dispatch({ type: SUCCESS_MESSAGE, message: "🎉 List Created!" });
      })
      .catch(err => console.log(err));
  };
}


export function deleteList(id) {
  return function(dispatch) {
    dispatch({ type: START_DELETE_LIST });

    fetch(`http://localhost:3000/api/v1/lists/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: DELETE_LIST, id });
        dispatch({ type: DELETE_LIST_WITH_LEADNOTE, id });
        dispatch({ type: SUCCESS_MESSAGE, message: data.message });
      })
      .catch(err => console.log(err));
  };
}


export function sortLists(lists) {
  return function(dispatch) {
    dispatch({type: SORT_LISTS, lists})
  }
}