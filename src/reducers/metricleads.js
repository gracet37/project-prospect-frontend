import { ADD_METRIC_LEADS } from "../actions/types";

export default function metricleads(state = { leads: [], title: "" }, action) {
  switch (action.type) {
    case ADD_METRIC_LEADS:
      return { leads: action.leads, title: action.title };
    default:
      return state;
  }
}
