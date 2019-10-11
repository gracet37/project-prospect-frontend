import {
  ACTION_SUCCESS, LOGIN_USER, LOGOUT_USER
} from "../actions/types";

export default function auth(state = {}, action) {
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
