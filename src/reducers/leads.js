import {
  FETCH_LEADS
} from "../actions/types";


export default function leads(state = [], action) {
  switch (action.type) {
    case FETCH_LEADS:
      return action.leads;
    default:
      return state;
  }
}