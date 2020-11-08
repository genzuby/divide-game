import { SELECT_COMPETITOR } from '../actions/constinfo';

const competitorReducer = (state = [], action) => {
  switch (action.type) {
    case SELECT_COMPETITOR:
      return action.payload;
    default:
      return state;
  }
};

export default competitorReducer;
