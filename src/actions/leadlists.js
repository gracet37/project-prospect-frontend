// All redux functions relating to listleads (or leadlists in some places)

import { DELETE_LISTLEAD, SORT_LEADLISTS } from './types'


// ? delete lead from LeadList.js
export function deleteListLead(list_id, lead_id) {
  return function(dispatch) {
    fetch(`http://localhost:3000/api/v1/leadlists`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        list_id: list_id,
        lead_id: lead_id
      })
    })
      .then(res => res.json())
      .then(data => dispatch({ type: DELETE_LISTLEAD, id: lead_id }))
      .catch(err => console.log(err));
  };
}

export function sortLeadLists(leads) {
  return function(dispatch) {
    dispatch({type: SORT_LEADLISTS, leads})
  }
}