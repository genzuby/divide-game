import React, { useContext } from 'react';
import { mount } from 'enzyme';
import '../testutils/setup';
import { findByTestAttr } from '../testutils/utils';
import { GameInfoContext, GameInfoProvider } from '../contexts/GameInfoContext';

describe('login', () => {
  it('Set login status', () => {
    const DummyComponent = () => {
      const { gameInfo, setGameInfo } = useContext(GameInfoContext);

      return (
        <>
          <div data-test="value">{gameInfo.myid}</div>
          <button onClick={() => setGameInfo({ myid: 'tomato' })}>
            Sign Up
          </button>
        </>
      );
    };

    const wrapper = mount(
      <GameInfoProvider>
        <DummyComponent />
      </GameInfoProvider>
    );

    expect(findByTestAttr(wrapper, 'value')).toEqual({});
    wrapper.find('button').simulate('click');
    expect(findByTestAttr(wrapper, 'value')).toBeTruthy();
  });
});
