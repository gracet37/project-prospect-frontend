import { LOGIN_USER, LOGOUT_USER, ACTION_SUCCESS, FETCH_ERROR, CLEAR_MESSAGE } from './types'

// LOGIN

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    user
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
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

    return fetch("https://frozen-shore-20550.herokuapp.com/api/v1/current_user", reqObj)
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

    return fetch("https://frozen-shore-20550.herokuapp.com/api/v1/current_user", reqObj)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        dispatch({ type: ACTION_SUCCESS, user: data });
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

    return fetch("https://frozen-shore-20550.herokuapp.com/api/v1/login", reqObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.message) {
          //handle error case
          dispatch({ type: "FETCH_ERROR", error: data.message });
        } else {
          console.log("fetch login", data);
          localStorage.token = data.token;
          dispatch(loginUser({ user: data.user }));
          dispatch({ type: CLEAR_MESSAGE });
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

    return fetch("https://frozen-shore-20550.herokuapp.com/api/v1/auth", reqObj)
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