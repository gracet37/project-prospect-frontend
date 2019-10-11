import {
  FETCH_LIST_BY_ID, SORT_LEADLISTS, DELETE_LISTLEAD, ADD_LEAD_NOTE
} from "../actions/types";


// ? Updates state with the lead-> leadnote association data for LeadList.js

export default function listleads(state = { leads: [], list: [] }, action) {
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