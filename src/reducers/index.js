import { combineReducers } from "redux";
import {
  FETCH_CATEGORIES,
  FETCH_LEADS,
  FETCH_LISTS,
  ADD_LIST,
  LOGIN_USER,
  LOGOUT_USER,
  DELETE_LIST,
  DELETE_LISTLEAD,
  // FETCH_LEADNOTES,
  // ADD_LEAD_NOTE,
  ACTION_SUCCESS,
  FETCH_LIST_WITH_LEADNOTES
} from "../actions";

export default combineReducers({
  categories: categories,
  leads: leads,
  lists: lists,
  auth: auth,
  listleads: listleads,
  // leadnotes: leadnotes,
  listWithLeadNotes: listWithLeadNotes
});

function categories(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}

function listWithLeadNotes(state = [], action) {
  switch (action.type) {
    case  FETCH_LIST_WITH_LEADNOTES:
      return action.leads;
    default:
      return state;
  }
}

function leads(state = [], action) {
  switch (action.type) {
    case FETCH_LEADS:
      return action.leads;
    default:
      return state;
  }
}

function lists(state = [], action) {
  // let newState = []
  switch (action.type) {
    case FETCH_LISTS:
      return action.lists;
    case ADD_LIST:
      return [...state, action.list];
    case DELETE_LIST:
      return [...state.filter(list => list.id !== action.id)];
    default:
      return state;
  }
}

function auth(state = {}, action) {
  switch (action.type) {
    case "ACTION_SUCESS":
        return action.user;
    case "LOGIN_USER":
      return action.user;
    case "LOGOUT_USER":
      return {};
    default:
      return state;
  }
}

// ? Updates state with the lead-> leadnote association data for LeadList.js

function listleads(state = {leads: [], list: []}, action) {
  switch (action.type) {
    case "FETCH_LIST_BY_ID":
      return {leads: action.leads, list: action.list};
    case "DELETE_LISTLEAD":
        return {...state, leads: state.leads.filter(lead => lead.id !== action.id)};
    default:
      return state;
  }
}

// function leadnotes(state = [], action) {
//   switch (action.type) {
//     case "FETCH_LEADNOTES":
//       return action.leadnotes;
//     case "ADD_LEAD_NOTE":
//       return action.leadnote
//     default:
//       return state;
//   }
// }

