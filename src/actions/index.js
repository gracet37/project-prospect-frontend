// General functions that are used throughout the app

import { UPDATE_SEARCH, CLEAR_MESSAGE, FETCH_ERROR, CLEAR_SEARCH } from './types'
// const uuidv1 = require("uuid/v1");
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

//     fetch("https://frozen-shore-20550.herokuapp.com/api/v1/categories")
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

//     fetch("https://frozen-shore-20550.herokuapp.com/leadnotes/show", {
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

//     fetch(`https://frozen-shore-20550.herokuapp.com/leadnotes/${user_id}`)
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

//     fetch(`https://frozen-shore-20550.herokuapp.com/api/v1/lists/show/${id}`)
//       .then(res => res.json())
//       .then(data => {
//         console.log(data.leads)
//         dispatch({ type: FETCH_LIST_BY_ID, listlead: data.leads, listid: data.id});
//         history.push('/leads')
//       });
//   };
// }
