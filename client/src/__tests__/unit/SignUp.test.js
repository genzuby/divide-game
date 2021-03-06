import React, { useContext } from 'react';
import { mount } from 'enzyme';
import '../../testutils/setup';
import { testStore } from '../../testutils/utils';
import SignUp from '../../components/Login/SignUp';
import {
  GameInfoContext,
  GameInfoProvider,
} from '../../contexts/GameInfoContext';

describe('Render Game', () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {};
    const store = testStore(initialState);
    const DummyComponent = () => {
      const { gameInfo } = useContext(GameInfoContext);

      return (
        <>
          <SignUp store={store} />
        </>
      );
    };
    wrapper = mount(
      <GameInfoProvider>
        <DummyComponent />
      </GameInfoProvider>
    );
  });

  describe('Render Player list', () => {
    describe('Snapshot test', () => {
      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
