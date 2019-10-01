export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const START_FETCH_CATEGORIES = "START_FETCH_CATEGORIES";
export const START_FETCH_LEADS = "START_FETCH_LEADS";
export const START_FETCH_LEADS_AND_LIST = "START_FETCH_LEADS_AND_LIST";
export const FETCH_LEADS = "FETCH_LEADS";
export const START_FETCH_LISTS = "FETCH_LISTS";
export const START_FETCH_LEADNOTES = "START_FETCH_LEADNOTES";
export const FETCH_LISTS = "FETCH_LISTS";
export const FETCH_LEADNOTES = "FETCH_LEADNOTES";
export const ADD_LIST = "ADD_LIST";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const START_DELETE_LIST = "START_DELETE_LIST";
export const START_DELETE_LEAD = "START_DELETE_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const DELETE_LISTLEAD = "DELETE_LISTLEAD";
export const FETCH_LIST_BY_ID = "FETCH_LIST_BY_ID";
export const ADD_LEAD_NOTE = "ADD_LEAD_NOTE";
export const ACTION_SUCCESS = "ACTION_SUCCESS";
export const FETCH_LIST_WITH_LEADNOTES = "FETCH_LIST_WITH_LEADNOTES";
export const COMPLETE_FETCH_LEADS_AND_LIST = "COMPLETE_FETCH_LEADS_AND_LIST";
export const FETCH_ERROR = "FETCH_ERROR";
export const SUCCESS_MESSAGE = "SUCCESS_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";
export const DELETE_LIST_WITH_LEADNOTE = "DELETE_LIST_WITH_LEADNOTE";
export const UPDATE_SEARCH = "UPDATE_SEARCH";
export const CLEAR_SEARCH = "CLEAR_SEARCH";

// export const START_DELETE_LEADLIST = "START_DELETE_LEADLIST";

const uuidv1 = require("uuid/v1");

// LOGIN

export function loginUser(user) {
  return {
    type: "LOGIN_USER",
    user
  };
}

export function logoutUser() {
  return {
    type: "LOGOUT_USER"
  };
}

export function currentUser(history) {
  return dispatch => {
    const token = localStorage.token;
    const reqObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    // dispatch with "loading" current user

    return fetch("http://localhost:3000/api/v1/current_user", reqObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          //handle error
          history.push("/");
          console.log("current user", data.error);
        } else {
          dispatch(loginUser({ user: data.user }));
        }
      });
  };
}

// ? testing
export function loadUser(loadingCb, successCb, failCb) {
  return function(dispatch) {
    loadingCb();
    const token = localStorage.token;
    const reqObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    return fetch("http://localhost:3000/api/v1/current_user", reqObj)
      .then(resp => resp.json())
      .then(data => {
        dispatch({ type: "ACTION_SUCCESS", user: data.user });
        successCb();
      })
      .catch(err => {
        failCb();
      });
  };
}

export function login(formData, history) {
  return dispatch => {
    const reqObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    };

    return fetch("http://localhost:3000/api/v1/login", reqObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.message) {
          //handle error case
          dispatch({ type: "FETCH_ERROR", error: data.message });
        } else {
          console.log("fetch login", data);
          localStorage.token = data.token;
          dispatch(loginUser({ user: data.user }));
          dispatch({ type: "CLEAR_MESSAGE" });
          history.push("/");
        }
      })
      .catch(err => console.log(err));
  };
}

export function registerUser(formData, history) {
  return dispatch => {
    const reqObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    };

    return fetch("http://localhost:3000/api/v1/auth", reqObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          //handle error case
          console.log(data.error)
          dispatch({type: FETCH_ERROR, error: data.error})
        } else {
          localStorage.token = data.token;
          dispatch(loginUser(data.user));
          history.push("/");
        }
      });
  };
}

// ? Invoked on App.js and fetches all lists in array format with leads data
// ? Used to populate the Dashboard.js

export function thunkFetchLists(id) {
  return function(dispatch) {
    // dispatch({ type: START_FETCH_LISTS });

    fetch(`http://localhost:3000/api/v1/lists/show_lists/${id}`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: FETCH_LISTS, lists: data });
      })
      .catch(err => console.log(err));
  };
}

// ? Search by id of the LIST and return a list with leads and leadnote data
// ? Used to populate LeadList.js

export function thunkFetchListById(id, history) {
  return function(dispatch) {
    fetch(`http://localhost:3000/api/v1/lists/show_special/${id}`)
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: FETCH_LIST_BY_ID,
          leads: data.leads,
          list: data.list
        });
        history.push("/leads");
      })
      .catch(err => console.log(err));
  };
}

export function thunkFetchAllListById(id) {
  return function(dispatch) {
    fetch(`http://localhost:3000/api/v1/lists/show_special_all/${id}`)
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: FETCH_LIST_WITH_LEADNOTES,
          leads: data.leads_with_notes
        });
      })
      .catch(err => console.log(err));
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

export function addList(newListName, userId) {
  return function(dispatch) {
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
        dispatch({ type: SUCCESS_MESSAGE, message: "🎉 List Created!" });
      })
      .catch(err => console.log(err));
  };
}

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

export function deleteList(id) {
  return function(dispatch) {
    dispatch({ type: START_DELETE_LIST });

    fetch(`http://localhost:3000/api/v1/lists/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: DELETE_LIST, id });
        dispatch({ type: DELETE_LIST_WITH_LEADNOTE, id });
        dispatch({ type: SUCCESS_MESSAGE, message: data.message });
      })
      .catch(err => console.log(err));
  };
}

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

export function addLeadNote(status, nextSteps, userId, leadId, comment) {
  return function(dispatch) {
    fetch("http://localhost:3000/leadnotes/create", {
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

// ! I DONT THINK THIS FUNCTION IS FINISHED YET (29/SEP)
export function updateUser(formData, history) {
  return dispatch => {
    const reqObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    };

    return fetch("http://localhost:3000/api/v1/auth", reqObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          //handle error case
          console.log(data.error);
        } else {
          localStorage.token = data.token;
          dispatch(loginUser(data.user));
          history.push("/profile");
        }
      });
  };
}

export function fetchError(error) {
  return function(dispatch) {
    dispatch({ type: FETCH_ERROR, error });
  };
}

export function clearMessage() {
  return function(dispatch) {
    dispatch({ type: CLEAR_MESSAGE });
  };
}

export function updateSearch(search) {
  return function(dispatch) {
    dispatch({type: UPDATE_SEARCH, search })
  }
}

export function clearSearch() {
  return function(dispatch) {
    dispatch({type: CLEAR_SEARCH})
  }
}

// ! Fetch categories (Not in use)

// export function thunkFetchCategories() {
//   return function(dispatch) {
//     dispatch({ type: START_FETCH_CATEGORIES });

//     fetch("http://localhost:3000/api/v1/categories")
//       .then(res => res.json())
//       .then(data => {
//         dispatch({ type: FETCH_CATEGORIES, categories: data });
//       });
//   };
// }

//! FETCHES ONE LEADNOTE (DONT THINK I NEED THIS ANYMORE)
// export function thunkFetchLeadNote(user_id, lead_id) {
//   return function(dispatch) {
//     dispatch({ type: START_FETCH_LEADNOTE });

//     fetch("http://localhost:3000/leadnotes/show", {
//       method: "POST",
//       headers: {
//         "Content-Type": 'application/json',
//         "Accept": 'application/json'
//       },
//       body: JSON.stringify({
//         user_id: user_id,
//         lead_id: lead_id
//       })
//     })
//     .then(res => res.json())
//     .then(data => {
//       console.log("leadnote", data)
//       // dispatch({ type: FETCH_LEADNOTE, leadnote: data});
//       // history.push('/leads')
//     })
//   }
// }

// ! FETCHES ALL LEADNOTES

// export function thunkFetchLeadNotes(user_id) {
//   return function(dispatch) {
//     dispatch({ type: START_FETCH_LEADNOTES });

//     fetch(`http://localhost:3000/leadnotes/${user_id}`)
//     .then(res => res.json())
//     .then(data => {
//       console.log("leadnotes", data)
//       dispatch({ type: FETCH_LEADNOTES, leadnotes: data});
//       // history.push('/leads')
//     })
//   }
// }

/////////////////// FETCHING LEADLIST /////////////////////////

// export function thunkFetchListById(id, history) {
//   return function(dispatch) {
//     // dispatch({ type: START_FETCH_LISTS });

//     fetch(`http://localhost:3000/api/v1/lists/show/${id}`)
//       .then(res => res.json())
//       .then(data => {
//         console.log(data.leads)
//         dispatch({ type: FETCH_LIST_BY_ID, listlead: data.leads, listid: data.id});
//         history.push('/leads')
//       });
//   };
// }
