import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import tasksReducer from './reducers/tasks';
import profileReducer from './reducers/profile';
import registerReducer from './reducers/register';
import verifyEmailReducer from './reducers/verifyEmail';
import passwordResetReducer from './reducers/passwordReset';
import passwordResetConfirmReducer from './reducers/passwordResetConfirm';

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

export {
    store
};