import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

export function configureStore(initialState = {}) {
    // Middleware and store enhancers
    const middlewares = [
        thunk,
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
    ];

    const store = createStore(rootReducer, initialState, compose(...enhancers));

    return store;
}
