# REDUX LAYOUT FOR REFERENCE

###
// npm install redux
// npm install react-redux
// npm install react-router-dom
// npm install --save-dev redux-devtools-extension
// npm install redux-thunk

// ALTERNATIVELY: npm install --save redux react-redux redux-thunk

##// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './redux/reducer';
import {BrowserRouter} from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))


// wrap <APP/> with <BrowserRouter> and then wrap both in <Provider> store={store}>

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

##// App.js
import React, { Component } from 'react';
import './App.css';
import Container from './containers/Container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container />
      </div>
    );
  }
}

export default App;

##// Coontainer.js
import React from 'react';
import {connect} from 'react-redux';
import {usersGetFetch} from '../redux/actions';
import Card from '../components/Card';

class Container extends React.Component {
  componentDidMount = () => {
    this.props.usersGetFetch()
  }

  formatCards = () => {
    return this.props.users.map(user => <Card key={user.id} user={user}/>)
  }

  // YOU CAN CALL THE REDUX STORE WITH this.props.whateverkeyvalueyouneed AS
  // LONG AS MAPSTATETOPROPS FUNCTION IS IN THE JS FILE AND YOU
  // IMPORTED AND USED CONNECT IN YOUR EXPORT DEFAULT BELOW!!

  render() {
    return (
      <div>
        YO.
        {this.props.message}
        {this.formatCards()}
      </div>
    )
  }
}

// "I'm getting something from the store"
const mapStateToProps = state => {
  return {
    message: state.message,
    users: state.users
  }
}

// "I got your shipment right here boi"
const mapDispatchToProps = dispatch => {
  return {
    usersGetFetch: () => dispatch(usersGetFetch())
  }
}

// the middle-man connect // mapStateToProps to have access to Store // mapDispatchToProps to have access to Dispatcher
export default connect(mapStateToProps, mapDispatchToProps)(Container);

##// Card.js
import React from 'react';

const Card = ({user}) => {
  return (
    <div>
      Name: {user.name}
    </div>
  )
}

export default Card;

##// ./redux/reducer.js
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


##// ./redux/actions.js
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
