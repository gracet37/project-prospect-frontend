// var action = { id: 2, newName: "malisa" };
// var foo = [{ id: 1, name: "raza" }, { id: 2, name: "grace" }];
// var newFoo = foo.map(obj => {
//   if (obj.id === action.id) {
//     return {
//       id: obj.id,
//       name: action.newName
//     };
//   } else {
//     return obj;
//   }
// });

// newFoo => [{id: 1, name: 'raza'}, {id: 2, name: 'malissa'}]

import { combineReducers } from "redux";
// import {
//   FETCH_CATEGORIES,
//   FETCH_LEADS,
//   FETCH_LISTS,
//   ADD_LIST,
//   LOGIN_USER,
//   LOGOUT_USER,
//   DELETE_LIST,
//   DELETE_LISTLEAD,
//   ADD_METRIC_LEADS,
//   // FETCH_LEADNOTES,
//   ADD_LEAD_NOTE,
//   ACTION_SUCCESS,
//   FETCH_ERROR,
//   FETCH_LIST_WITH_LEADNOTES,
//   SUCCESS_MESSAGE,
//   CLEAR_MESSAGE,
//   DELETE_LIST_WITH_LEADNOTE,
//   UPDATE_SEARCH,
//   CLEAR_SEARCH,
//   SORT_LISTS,
//   FETCH_LIST_BY_ID,
//   SORT_LEADLISTS
// } from "../actions";

import { listWithLeadNotes } from "./listWithLeadNotes";
import { leads } from "./leads";
import { lists } from "./lists";
import { auth } from "./auth";
import { listleads } from "./listleads";
import { message } from "./message";
import { search } from "./search";
import { metricleads } from "./metricleads";

export default combineReducers({
  categories: categories,
  leads: leads,
  lists: lists,
  auth: auth,
  listleads: listleads,
  listWithLeadNotes: listWithLeadNotes,
  message: message,
  search: search,
  metricleads: metricleads
});

// function categories(state = [], action) {
//   switch (action.type) {
//     case FETCH_CATEGORIES:
//       return action.categories;
//     default:
//       return state;
//   }
// }
