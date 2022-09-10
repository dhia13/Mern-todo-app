import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './Reducers/index'
const intialState = {}

const middleware = [thunk]
const store = createStore(rootReducer, intialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store;
