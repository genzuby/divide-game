import React, { useContext } from 'react';
import { mount } from 'enzyme';
import '../../testutils/setup';
import { testStore } from '../../testutils/utils';
import WinnerPage from '../../components/Game/WinnerPage';
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
          <WinnerPage store={store} />
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
