import React from 'react';
import { mount } from 'enzyme';
import '../../testutils/setup';
import GameCard from '../../components/Game/GameCard';

describe('Render Content', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      isYou: true,
      playerid: 'tomato',
      playerinput: 1,
      lastsum: 2,
      result: 3,
    };
    wrapper = mount(<GameCard {...props} />);
  });

  describe('Should render without error', () => {
    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
