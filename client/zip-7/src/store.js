import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootRedusers from './redux/reducers';

const initialState = {};

//thunk middleware used for asynchronous actions
const middlewares = [thunk];

const store = createStore(
  rootRedusers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
