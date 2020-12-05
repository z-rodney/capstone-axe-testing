import { createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import reducer from './redux'

// const initialState = {
//   userSigIn: {
//     userInfo: localStorage.getItem('userInfo')
//       ? JSON.parse(localStorage.getItem('userInfo'))
//       : null,
//   },
// };

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   reducer,
//   initialState,
//   composeEnhancer(applyMiddleware(thunk))
// );

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger))

export default store
