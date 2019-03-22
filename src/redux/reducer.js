// initial state
const initialState = {
  current_user: {},
  users: [],
  message: "YEERRR"
}

// the Dispatcher who gets alert text messages from us and sends/returns the applicable specialized  fireteam to handle them
// state is the store above (initialState) and action is the actions payload it's expecting (an object, an array, etc)
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return {...state, current_user: action.payload}
    case "LOAD_USERS":
      return {...state, users: action.payload}
    default:
      return state;
  }
}


// const action = {
//   type: "THIS_STUFFF",
//   payload: {}
// }
