import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import reducer from "./reducers/index";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import {loadState, saveState} from './localStorage'
import throttle from 'lodash/throttle'

// const persistedState = loadState()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose;
const store = createStore(reducer, composeEnhancers(
   applyMiddleware(thunk)
));

// removed persistedState from store

// store.subscribe(throttle(() => {
//   saveState({
//     leads: store.getState().leads,
//     auth: store.getState().auth,
//     lists: store.getState().lists
// });
// }, 1000))

ReactDOM.render(
  <Provider store={store}>
    <Router>
    <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
