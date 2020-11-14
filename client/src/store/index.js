import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import RootReducer from '../reducers';

const middlewares = [ReduxThunk];
const composeEnhencers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  RootReducer,
  composeEnhencers(applyMiddleware(...middlewares))
);
