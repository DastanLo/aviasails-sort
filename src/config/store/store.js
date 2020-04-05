import thunkMiddleware from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import flightsReducer from "../../store/flightsReducer";


const store = createStore(flightsReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);
export default store;
