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
  FETCH_LEADNOTES,
  ADD_LEAD_NOTE
} from "../actions";

export default combineReducers({
  categories: categories,
  leads: leads,
  lists: lists,
  auth: auth,
  listlead: listlead,
  leadnotes: leadnotes
});

function categories(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.categories;
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
    case "LOGIN_USER":
      return action.user;
    case "LOGOUT_USER":
      return {};
    default:
      return state;
  }
}

// ! NEED TO FINISH OFF THE DELETE LIST LEAD ACTION

function listlead(state = [], action) {
  // let findLead = state.find(lead => lead.id === action.id);
  // let leadId = findLead.id
  // let leadlist = state.find(leadlist => )

  switch (action.type) {
    case "FETCH_LIST_BY_ID":
      return [action.listlead, action.listid];
    // case "DELETE_LISTLEAD":
    //   let listlead_state = state;
    //   let newListState = [
    //     ...state[0].filter(listlead => listlead.id !== action.id)
    //   ];
    //   let newListLeadState = [
    //     {
    //       leads: newListState,
    //       id: state[1].id
    //     }
    //   ];
    //   return newListLeadState;
    default:
      return state;
  }
}

function leadnotes(state = [], action) {
  switch (action.type) {
    case "FETCH_LEADNOTES":
      return action.leadnotes;
    case "ADD_LEAD_NOTE":
      return action.leadnote
    default:
      return state;
  }
}

