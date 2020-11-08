import React, { useContext } from 'react';
import { mount } from 'enzyme';
import '../../testutils/setup';
import GameBody from '../../components/Game/GameBody';
import {
  GameInfoContext,
  GameInfoProvider,
} from '../../contexts/GameInfoContext';

describe('Render Content', () => {
  const DummyComponent = () => {
    const { gameInfo } = useContext(GameInfoContext);

    return (
      <>
        <GameBody />
      </>
    );
  };

  const wrapper = mount(
    <GameInfoProvider>
      <DummyComponent />
    </GameInfoProvider>
  );
  describe('Should render without error', () => {
    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
