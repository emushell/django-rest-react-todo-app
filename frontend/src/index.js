import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import authReducer from './store/reducers/auth';
import tasksReducer from './store/reducers/tasks';
import profileReducer from './store/reducers/profile';
import registerReducer from './store/reducers/register';
import verifyEmailReducer from './store/reducers/verifyEmail';
import passwordResetReducer from './store/reducers/passwordReset';
import passwordResetConfirmReducer from './store/reducers/passwordResetConfirm';

import App from './App';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
    auth: authReducer,
    tasks: tasksReducer,
    profile: profileReducer,
    register: registerReducer,
    psswReset: passwordResetReducer,
    psswResetConfirm: passwordResetConfirmReducer,
    email: verifyEmailReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

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
