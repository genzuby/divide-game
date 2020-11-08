import React, { useContext } from 'react';
import { GAMEBODY } from '../../styles/MainStyle';
import { GameInfoContext } from '../../contexts/GameInfoContext';
import CompetitorArea from './CompetitorArea';
import GameBody from './GameBody';
import GameOption from './GameOption';
import GameInput from './GameInput';
import WinnerPage from './WinnerPage';

function GameBoard() {
  const { gameInfo } = useContext(GameInfoContext);

  return (
    <>
      {gameInfo.endGame ? (
        <WinnerPage />
      ) : (
        <GAMEBODY style={{ backgroundColor: '#fcfcfc', padding: '2.5em 0' }}>
          <GameBody />
          <GameInput />
          <CompetitorArea />
          <GameOption />
        </GAMEBODY>
      )}
    </>
  );
}

export default GameBoard;
