import {
  FETCH_LIST_WITH_LEADNOTES,
  DELETE_LIST_WITH_LEADNOTE
} from "../actions/types";

export default function listWithLeadNotes(state = [], action) {
  switch (action.type) {
    case FETCH_LIST_WITH_LEADNOTES:
      return action.leads;
    case DELETE_LIST_WITH_LEADNOTE:
      return [...state.filter(lead => lead.list_id !== action.id)];
    default:
      return state;
  }
}
