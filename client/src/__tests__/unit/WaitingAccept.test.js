import React, { useContext } from 'react';
import { mount } from 'enzyme';
import '../../testutils/setup';
import WaitingAccept from '../../components/Game/WaitingAccept';
import {
  GameInfoContext,
  GameInfoProvider,
} from '../../contexts/GameInfoContext';

describe('Render Content', () => {
  const DummyComponent = () => {
    const { gameInfo } = useContext(GameInfoContext);

    return (
      <>
        <WaitingAccept />
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
