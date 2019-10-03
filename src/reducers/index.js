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
import {
  FETCH_CATEGORIES,
  FETCH_LEADS,
  FETCH_LISTS,
  ADD_LIST,
  LOGIN_USER,
  LOGOUT_USER,
  DELETE_LIST,
  DELETE_LISTLEAD,
  ADD_METRIC_LEADS,
  // FETCH_LEADNOTES,
  ADD_LEAD_NOTE,
  ACTION_SUCCESS,
  FETCH_ERROR,
  FETCH_LIST_WITH_LEADNOTES,
  SUCCESS_MESSAGE,
  CLEAR_MESSAGE,
  DELETE_LIST_WITH_LEADNOTE,
  UPDATE_SEARCH,
  CLEAR_SEARCH,
  SORT_LISTS,
  FETCH_LIST_BY_ID,
  SORT_LEADLISTS
} from "../actions";

export default combineReducers({
  categories: categories,
  leads: leads,
  lists: lists,
  auth: auth,
  listleads: listleads,
  // leadnotes: leadnotes,
  listWithLeadNotes: listWithLeadNotes,
  message: message,
  search: search,
  metricleads: metricleads
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
    case FETCH_LIST_WITH_LEADNOTES:
      return action.leads;
    case DELETE_LIST_WITH_LEADNOTE:
      return [...state.filter(lead => lead.list_id !== action.id)];
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
      case SORT_LISTS: 
      return action.lists
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
    case ACTION_SUCCESS:
      return action.user;
    case LOGIN_USER:
      return action.user;
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
}

// ? Updates state with the lead-> leadnote association data for LeadList.js

function listleads(state = { leads: [], list: [] }, action) {
  switch (action.type) {
    case FETCH_LIST_BY_ID:
      return { leads: action.leads, list: action.list };
      case SORT_LEADLISTS:
        return {...state, leads: action.leads}
    case DELETE_LISTLEAD:
      return {
        ...state,
        leads: state.leads.filter(lead => lead.lead.id !== action.id)
      };
      case ADD_LEAD_NOTE:
          const newLeadWithNote = state.leads.map(leadObj => {
            if (action.id === leadObj.lead.id) {
              return {
                lead: leadObj.lead,
                leadnotes: [...leadObj.leadnotes, action.leadnote]

                // lead: leadObj.lead,
                // list_id: leadObj.list_id,
                // leadnotes: [...leadObj.leadnotes, action.leadnote]
              };
              // swap out
            } else {
              return leadObj;
            }
          });
          return {...state, leads: newLeadWithNote}
    default:
      return state;
  }
}

function message(state = [], action) {
  switch (action.type) {
    case FETCH_ERROR:
      return action.error;
    case SUCCESS_MESSAGE:
      return action.message;
    case CLEAR_MESSAGE:
      return [];
    default:
      return state;
  }
}

function search(state = "", action) {
  switch (action.type) {
    case UPDATE_SEARCH:
      return action.search;
      case CLEAR_SEARCH:
        return ""
    default:
      return state;
  }
}

function metricleads(state = [], action) {
  switch (action.type) {
    case ADD_METRIC_LEADS:
      return action.leads;
    default:
      return state;
  }
}



