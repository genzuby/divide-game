import {
  PLAYER_SIGNUP,
  PLAYER_SIGNIN,
  PLAYER_LIST,
  SELECT_COMPETITOR,
  GAME_QUIT,
} from '../actions/constinfo';
import competitorReducer from '../reducers/competitorReducer';
import loginReducer from '../reducers/loginReducer';
import playerReducer from '../reducers/playersReducer';
import { loginInfo, playerList } from '../testutils/mockData';

describe('loginReducer Reducers test', () => {
  it('Should return default state', () => {
    const newState = loginReducer(undefined, {});

    expect(newState).toEqual([]);
  });

  it('Should return new state from PLAYER_SIGNUP', () => {
    const signup = loginInfo;
    const newState = loginReducer(undefined, {
      type: PLAYER_SIGNUP,
      payload: signup,
    });
    expect(newState).toEqual(signup);
  });

  it('Should return new state from PLAYER_SIGNIN', () => {
    const signin = loginInfo;
    const newState = loginReducer(undefined, {
      type: PLAYER_SIGNIN,
      payload: signin,
    });
    expect(newState).toEqual(signin);
  });

  it('Should return new state from GAME_QUIT', () => {
    const signin = loginInfo;
    const newState = loginReducer(undefined, {
      type: GAME_QUIT,
      payload: signin,
    });
    expect(newState).toEqual(signin);
  });

  it('Should return new state from PLAYER_LIST', () => {
    const signin = playerList;
    const newState = playerReducer(undefined, {
      type: PLAYER_LIST,
      payload: signin,
    });
    expect(newState).toEqual(signin);
  });

  it('Should return new state from SELECT_COMPETITOR', () => {
    const signin = loginInfo;
    const newState = competitorReducer(undefined, {
      type: SELECT_COMPETITOR,
      payload: signin,
    });
    expect(newState).toEqual(signin);
  });
});
