import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, compose} from "redux";
import reducer from './reducers';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {Router} from "react-router-dom";
import history from './history';

const logger = createLogger({
    duration: true,
    level: 'info'
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk, logger),
    // other store enhancers if any
);
const store = createStore(reducer, enhancer);


ReactDOM.render(<Provider store={store}><Router history={history}>
    <App /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();

