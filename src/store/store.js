import {createStore, combineReducers, applyMiddleware} from "redux"
import {ratesReducer} from "./rates"
import {userReducer} from "./user"
import thunk from "redux-thunk"

export const store = createStore(
    combineReducers({
        user:userReducer,
        rates :ratesReducer,
    }),
     applyMiddleware(thunk)
);



