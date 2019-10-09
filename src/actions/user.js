
// ! I DONT THINK THIS FUNCTION IS FINISHED YET (29/SEP)
export function updateUser(formData, history) {
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
          console.log(data.error);
        } else {
          localStorage.token = data.token;
          dispatch(loginUser(data.user));
          history.push("/profile");
        }
      });
  };
}