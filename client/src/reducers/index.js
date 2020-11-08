import playerReducer from './playersReducer';
import loginReducer from './loginReducer';
import competitorReducer from './competitorReducer';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
  playerList: playerReducer,
  loginInfo: loginReducer,
  competitorState: competitorReducer,
});

export default rootReducers;
