import { ADD_LEAD_NOTE } from './types'


export function addLeadNote(status, nextSteps, userId, leadId, comment) {
  return function(dispatch) {
    fetch("https://frozen-shore-20550.herokuapp.com/leadnotes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        status: status,
        next_steps: nextSteps,
        comments: comment,
        lead_id: leadId,
        user_id: userId
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("lead note", data);
        dispatch({ type: ADD_LEAD_NOTE, leadnote: data, id: leadId });
        // dispatch(thunkFetchAllListById(userId))
      })
      .catch(err => console.log(err));
  };
}