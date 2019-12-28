import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer';

const initialState = {
    users : [
        { id:1, name: "test1", email : "test@mail.com"}
    ]
};

const middleware = [];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
    )
);

export default store;
