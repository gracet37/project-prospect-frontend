import {
  FETCH_ERROR, SUCCESS_MESSAGE, CLEAR_MESSAGE
} from "../actions/types";

export default function message(state = [], action) {
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