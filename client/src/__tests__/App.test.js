import React from 'react';
import { shallow } from 'enzyme';
import '../testutils/setup';
import { loginInfo } from '../testutils/mockData';
import { findByTestAttr, testStore } from '../testutils/utils';
import App from '../App';

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<App store={store} />)
    .childAt(0)
    .dive();
  return wrapper;
};

describe('Login page render', () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {};
    wrapper = setUp(initialState);
  });

  it('Should render without errors', () => {
    const component = findByTestAttr(wrapper, 'appComponent');
    expect(component.length).toBe(1);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Game Page render', () => {
  let wrapper;
  beforeEach(() => {
    const initialState = { loginInfo };
    wrapper = setUp(initialState);
  });

  it('Should render without errors', () => {
    const component = findByTestAttr(wrapper, 'appComponent');
    expect(component.length).toBe(1);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
