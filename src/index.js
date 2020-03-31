import './index.css';

import * as serviceWorker from './serviceWorker';
/* eslint-disable */

import App from './App';
import Layout from './components/layout/layout';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";


const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];


function* initSaga() {
  console.log("Redux-Saga initialized");
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);
sagaMiddleware.run(initSaga);
sagaMiddleware.run(rootSaga);


const routing = (
  <Provider store={store}>
    <Router>
      <Layout /> 
    </Router>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
