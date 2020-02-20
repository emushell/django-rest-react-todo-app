import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import authReducer from './store/reducers/auth';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { setAuthorisationToken } from './axios-api';

const rootReducer = combineReducers({
    auth: authReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if (localStorage.token) {
    setAuthorisationToken(localStorage.token);
}
const rootElement = document.getElementById('root');

render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
