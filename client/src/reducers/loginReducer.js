import { PLAYER_SIGNUP, PLAYER_SIGNIN, GAME_QUIT } from '../actions/constinfo';

const loginReducer = (state = [], action) => {
  switch (action.type) {
    case PLAYER_SIGNUP:
      return action.payload;
    case PLAYER_SIGNIN:
      return action.payload;
    case GAME_QUIT:
      return action.payload;
    default:
      return state;
  }
};

export default loginReducer;
