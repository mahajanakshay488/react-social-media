import { legacy_createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducers from './reducers/index'

const initialState = {};

const middleware = [thunk];

const store = legacy_createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware)
);

export default store;