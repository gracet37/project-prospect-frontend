export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const START_FETCH_CATEGORIES = "START_FETCH_CATEGORIES";
export const START_FETCH_LEADS = "START_FETCH_LEADS";
export const FETCH_LEADS = "FETCH_LEADS";
export const START_FETCH_LISTS = "FETCH_LISTS";
export const FETCH_LISTS = "FETCH_LISTS";
export const ADD_LIST = "ADD_LIST";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

const uuidv1 = require('uuid/v1')

// LOGIN

export function loginUser(user) {
  return {
    type: "LOGIN_USER",
    user
  }
}

export function logoutUser() {
  return {
    type: "LOGOUT_USER"
  }
}

export function currentUser(history) {
  return (dispatch) => {
    // const token = localStorage.token;
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify(localStorage.token)
    }

    return fetch('http://localhost:3000/api/v1/current_user', reqObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          //handle error
          console.log("currentUser error", data.error)
        } else {
          dispatch(loginUser({user: data.user}))
          history.push('/search')
        }
      })
  }
}

export function login(formData, history) {
  return (dispatch) => {
    const reqObj = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    }

    return fetch('http://localhost:3000/api/v1/login', reqObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.error){
          //handle error case
          console.log(data.error)
        } else {
          console.log("fetch login", data)
          localStorage.token = data.token
          dispatch(loginUser(data.user))
          history.push('/search')
        }
      })
      .catch(err => console.log(err))
  }
}

export function registerUser(formData, history) {
  return (dispatch) => {
    const reqObj = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    }

    return fetch('http://localhost:3000/api/v1/auth', reqObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.error){
          //handle error case
          console.log(data.error)
        } else {
          localStorage.token = data.token
          dispatch(loginUser( data.user ))
          history.push('/search')
        }
      })
  }
}

////LOGIN

export function thunkFetchCategories() {
  return function(dispatch) {
    dispatch({ type: START_FETCH_CATEGORIES });

    fetch("http://localhost:3000/api/v1/categories")
      .then(res => res.json())
      .then(data => {
        dispatch({ type: FETCH_CATEGORIES, categories: data });
      }); 
  };
}

export function thunkFetchLists(id) {
  return function(dispatch) {
    dispatch({ type: START_FETCH_LISTS });

    fetch(`http://localhost:3000/api/v1/lists/${id}`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: FETCH_LISTS, lists: data });
      }); 
  };
}
// creating a new lead instance of the one the user saved and creating the association between list and lead
export function addLead(leadObj, company, website, listId, newListName, userId) {
  return function(dispatch) {
    dispatch({ type: START_FETCH_LEADS });

    fetch("http://localhost:3000/api/v1/leads", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        first_name: leadObj.first_name,
        last_name: leadObj.last_name, 
        email: leadObj.value,
        phone_number: leadObj.phone_number,
        position: leadObj.position,
        confidence_score: leadObj.confidence,
        company: company,
        website: website
      })
    })
      .then(res => res.json())
      .then(data => {
        if (listId) { 
        fetch("http://localhost:3000/api/v1/leadlists", {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
          },
          body: JSON.stringify({
            list_id: listId,
            lead_id: data.id
          })
        }).catch(err => console.log(err));
      } else { 
        fetch("http://localhost:3000/api/v1/lists", {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
          },
          body: JSON.stringify({
            name: newListName, 
            user_id: userId
          })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
      }
      })
      .catch(err => console.log(err)); 
  };
}

export function addList(listName) {
  return function(dispatch) {

    fetch("http://localhost:3000/api/v1/lists", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        name: listName
      })
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: ADD_LIST, lists: data})
      })
      .catch(err => console.log(err)); 
  };
}

export function thunkFetchLeads(domainName, history) {
  return function(dispatch) {
    dispatch({ type: START_FETCH_LEADS });

    fetch(
      `https://api.hunter.io/v2/domain-search?domain=${domainName}&limit=10&api_key=7ca084937e5e049696b7bb64c10366c3d077c650`
    )
      .then(res => res.json())
      .then(result => {
        dispatch({ type: FETCH_LEADS, id: uuidv1(), leads: result.data })
        history.push('/results')
      });


      // ! ASK FOR HELP HERE ////
      // .then(data => {
      //   // const dataArray = data[0];
      //   fetch("http://localhost:3000/api/v1/leads", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json"
      //     },
      //     body: JSON.stringify({data})
      //   }).then(res => res.json())
      //   .then(console.log)
      //   .catch(err => console.log(err));
      // });
  };
}

// .then(console.log
// const dataArray = data[0];
// const leadData = dataArray.emails.map(lead => {
//   return (
//     first_name: lead.first_name,
//     last_name: lead.last_name,
//     confidence_score: lead.confidence,
//     last_name: params[:last_name],
//     phone_number: params[:phone_number],
//     position: params[:position],
//     email: params[:value],
//     website: params[:website]
//   )
// })
//   fetch("http://localhost:3000/api/v1/leads", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({
//       confidence_score:
//       first_name:
//       confidence_score: params[:confidence],
//       first_name: params[:first_name],
//       last_name: params[:last_name],
//       linkedin: params[:linkedin],
//       phone_number: params[:phone_number],
//       position: params[:position],
//       email: params[:value],
//       website: params[:website]
//     })
//   })
// })
// .then(result => {
//   dispatch({ type: FETCH_LEADS, leads: result.data })
//   history.push('/results')
// });

// handleSubmit = () => {
//   // ACTION - QUERYSEARCH
//   const domainName = this.state.searchParam
//   hunter.domainSearch(
//     {domain: domainName},
//     function(err, body) {
//       if (err) {
//         console.log(err);
//       } else {
//         // Will contain same body as the raw API call
//         console.log(body);
//       }
//     }
//   );
// }
