import React, { useContext } from 'react';
import { GameInfoContext } from '../../contexts/GameInfoContext';
import { PADDING } from '../../styles/MainStyle';
import { ROUNDDIV, BUTTON, DESCTEXT } from '../../styles/ComponentStyle';
import { BASIC_COLORS } from '../../styles/styleConstant';

const {
  MAIN_COLOR_TAKEAWAY,
  MAIN_TEXT_COLOR_WHITE,
  POINT_COLOR_BLUE,
} = BASIC_COLORS;

function WaitingGame() {
  const gameNumber = Math.floor(Math.random() * (999 - 2 + 1)) + 2;
  const { gameInfo, setGameInfo, sendInvitation } = useContext(GameInfoContext);

  const onClickPlay = () => {
    setGameInfo({ ...gameInfo, gameNumber, lastNumber: gameNumber });
    sendInvitation(gameInfo.competitorid, gameNumber);
  };

  return (
    <>
      <DESCTEXT>Game number is</DESCTEXT>
      <PADDING padding="2em" />
      <ROUNDDIV
        height="100px"
        width="100px"
        bgcolor={MAIN_TEXT_COLOR_WHITE}
        color={MAIN_COLOR_TAKEAWAY}
        fontsize="3rem"
      >
        {gameNumber}
      </ROUNDDIV>
      <PADDING padding="7em" />
      <BUTTON
        textcolor={MAIN_TEXT_COLOR_WHITE}
        bgcolor={POINT_COLOR_BLUE}
        borderColor={POINT_COLOR_BLUE}
        style={{ width: '160px' }}
        onClick={onClickPlay}
      >
        Play
      </BUTTON>
    </>
  );
}

export default WaitingGame;
