import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameInfoContext } from '../../contexts/GameInfoContext';
import { BASIC_COLORS } from '../../styles/styleConstant';
import { SWITCH } from '../../styles/ComponentStyle';
import { PADDING } from '../../styles/MainStyle';

const { MAIN_COLOR_TAKEAWAY } = BASIC_COLORS;

function GameOption() {
  const { gameInfo, setGameInfo } = useContext(GameInfoContext);
  const { isAutoplay } = gameInfo;

  const handleChange = () => {
    setGameInfo(prev => {
      return { ...gameInfo, isAutoPlay: !prev.isAutoPlay };
    });
  };

  return (
    <INFOBODY bgcolor={MAIN_COLOR_TAKEAWAY}>
      <PADDING wpadding="0.2em" />
      <SWITCH>
        <input
          type="checkbox"
          id="autoplay"
          defaultChecked={isAutoplay}
          onChange={handleChange}
        />
        <label htmlFor="autoplay">auto play</label>
      </SWITCH>
    </INFOBODY>
  );
}

const INFOBODY = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 3em;
  width: 100%;
  padding: 1em 1em 0.4em 0;
  border-radius: 0 0 1em 1em;
  background-color: ${props => props.bgcolor};
`;

export default GameOption;
