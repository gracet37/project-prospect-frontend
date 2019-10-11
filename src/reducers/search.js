import { UPDATE_SEARCH, CLEAR_SEARCH } from '../actions/types'

export default function search(state = "", action) {
  switch (action.type) {
    case UPDATE_SEARCH:
      return action.search;
      case CLEAR_SEARCH:
        return ""
    default:
      return state;
  }
}