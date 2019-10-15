// All redux functions that relate to leads

import { FETCH_LEADS, START_FETCH_LEADS, START_FETCH_LEADS_AND_LIST, SUCCESS_MESSAGE, ADD_LIST, ADD_METRIC_LEADS } from './types'

const uuidv1 = require("uuid/v1");


export function thunkFetchLeads(domainName, history) {
  return function(dispatch) {
    dispatch({ type: START_FETCH_LEADS });

    fetch(
      `https://api.hunter.io/v2/domain-search?domain=${domainName}&limit=100&api_key=7ca084937e5e049696b7bb64c10366c3d077c650`
    )
      .then(res => res.json())
      .then(result => {
        dispatch({ type: FETCH_LEADS, id: uuidv1(), leads: result.data });
        history.push("/results");
      });
  };
}

// ? creating a new lead instance of the one the user saved and creating the association between list and lead
export function addLead(
  leadsArray,
  company,
  website,
  listId,
  newListName,
  userId
) {
  return function(dispatch) {
    // const token = localStorage.token;
    dispatch({ type: START_FETCH_LEADS_AND_LIST });

    fetch("http://localhost:3000/api/v1/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        leadsArray,
        company: company,
        website: website
      })
    })
      .then(res => res.json())
      .then(data => {
        const leadsData = data;
        if (listId) {
          data.forEach(lead => {
            fetch("http://localhost:3000/api/v1/leadlists", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                list_id: listId,
                lead_id: lead.id
              })
            })
              .then(res => res.json())
              .then(data => {
                dispatch({ type: SUCCESS_MESSAGE, message: data.message });
              })
              .catch(err => console.log(err));
          });
        } else {
          fetch("http://localhost:3000/api/v1/lists", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              name: newListName,
              user_id: userId
            })
          })
            .then(res => res.json())
            .then(data => {
              dispatch({ type: ADD_LIST, list: data });
              leadsData.forEach(lead => {
                fetch("http://localhost:3000/api/v1/leadlists", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                  },
                  body: JSON.stringify({
                    list_id: data.id,
                    lead_id: lead.id
                  })
                }) // end of the fetch
                  .then(res => res.json())
                  .then(data => {
                    dispatch({ type: SUCCESS_MESSAGE, message: data.message });
                  })
                  .catch(err => console.log(err));
              });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };
}

export function metricLeads(leads, history, title) {
  return function(dispatch) {
    dispatch({type: ADD_METRIC_LEADS, leads, title})
      history.push('/detailed')
  }
}
