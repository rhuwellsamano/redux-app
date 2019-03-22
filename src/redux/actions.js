// list of all types of Actions and the payloads it sends
// fetch is kind of like an action that activates on "FETCH" and expects to get back data from the server (JSON)
// who want that Action??

export const addUserToState = userObj => {
  return {
    type: "ADD_USER_TO_STATE",
    payload: userObj
  }
}

const loadUsers = users => {
  return {
    type: "LOAD_USERS",
    payload: users
  }
}

export const usersGetFetch = () => {
  return (dispatch) => {
    return fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(users => {
      console.log("usersGetFetch:", users)
      dispatch(loadUsers(users))
    })
  }
}
