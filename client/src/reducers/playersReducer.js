import { PLAYER_LIST } from '../actions/constinfo';

const playerReducer = (state = [], action) => {
  switch (action.type) {
    case PLAYER_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default playerReducer;
