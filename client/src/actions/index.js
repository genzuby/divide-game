import axios from 'axios';
import {
  PLAYER_SIGNUP,
  PLAYER_SIGNIN,
  PLAYER_LIST,
  SELECT_COMPETITOR,
  GAME_QUIT,
  BASE_URL,
} from './constinfo';

//Signup
export const signupUser = userinfo => async dispatch => {
  try {
    const response = await axios.post(BASE_URL, userinfo);

    dispatch({
      type: PLAYER_SIGNUP,
      payload: response.data,
    });
  } catch (e) {
    console.log(e);
  }
};

// find user
export const signinUser = userid => async dispatch => {
  try {
    const response = await axios.get(`${BASE_URL}/${userid}`);

    dispatch({
      type: PLAYER_SIGNIN,
      payload: response.data[0],
    });
  } catch (e) {
    console.log(e);
  }
};

export const getUserList = () => async dispatch => {
  try {
    const response = await axios.get(BASE_URL);

    dispatch({
      type: PLAYER_LIST,
      payload: response.data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const selectCompetitor = (userid, msgbody) => async dispatch => {
  try {
    const response = await axios.put(`${BASE_URL}/${userid}`, msgbody);

    dispatch({
      type: SELECT_COMPETITOR,
      payload: response.data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const endGameSet = () => dispatch => {
  try {
    dispatch({
      type: GAME_QUIT,
      payload: [{ userId: '' }],
    });
  } catch (e) {
    console.log(e);
  }
};
