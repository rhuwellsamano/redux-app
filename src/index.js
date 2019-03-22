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

// npm install redux
// npm install react-redux
// npm install react-router-dom
// npm install --save-dev redux-devtools-extension
// npm install redux-thunk

// ALTERNATIVELY: npm install --save redux react-redux redux-thunk

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
