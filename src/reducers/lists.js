import {
  FETCH_LISTS, SORT_LISTS, ADD_LIST, DELETE_LIST
} from "../actions/types";

export default function lists(state = [], action) {
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