import moxios from 'moxios';
import { testStore } from '../../testutils/utils';
import {
  signupUser,
  signinUser,
  getUserList,
  selectCompetitor,
  endGameSet,
} from '../../actions';
import { loginInfo, playerList } from '../../testutils/mockData';

describe('Test actions for Login', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Store is updated correctly from signUp', () => {
    const expectState = loginInfo;
    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectState,
      });
    });

    return store.dispatch(signupUser()).then(() => {
      const newState = store.getState();
      expect(newState.loginInfo).toBe(expectState);
    });
  });

  it('Store is updated correctly from signIn', () => {
    const expectState = [loginInfo];
    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectState,
      });
    });

    return store.dispatch(signinUser()).then(() => {
      const newState = store.getState();
      expect(newState.loginInfo).toBe(expectState[0]);
    });
  });
});

describe('Test actions for playerlist', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Store is updated correctly from getUserList', () => {
    const expectState = playerList;
    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectState,
      });
    });

    return store.dispatch(getUserList()).then(() => {
      const newState = store.getState();
      expect(newState.playerList).toBe(expectState);
    });
  });
});

describe('Test actions for selectCompetitor', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Store is updated correctly from selectCompetitor', () => {
    const expectState = { n: 1 };
    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectState,
      });
    });

    return store.dispatch(selectCompetitor()).then(() => {
      const newState = store.getState();
      expect(newState.competitorState).toBe(expectState);
    });
  });
});

describe('Test actions for endGameSet', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Store is updated correctly from endGameSet', () => {
    const expectState = [{ userId: '' }];
    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectState,
      });
    });

    store.dispatch(endGameSet());
    const newState = store.getState();
    expect(newState.loginInfo.length).toBe(1);
  });
});
