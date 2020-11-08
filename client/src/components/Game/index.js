import React, { useContext } from 'react';
import PlayerList from './PlayerList';
import GameBoard from './GameBoard';
import GameRequest from './GameRequest';
import WaitingGame from './WaitingGame';
import WaitingAccept from './WaitingAccept';
import { GameInfoContext } from '../../contexts/GameInfoContext';
import { GAMEBODY } from '../../styles/MainStyle';

function Game() {
  const { gameInfo, invitation } = useContext(GameInfoContext);
  const { competitorid, isGameon, endGame } = gameInfo;

  const gameDisplay = () => {
    if (competitorid && isGameon) {
      return <GameBoard />;
    } else if (
      competitorid &&
      !isGameon &&
      !endGame &&
      typeof invitation.receiver === 'undefined'
    ) {
      return <WaitingGame />;
    } else if (
      competitorid &&
      !isGameon &&
      !endGame &&
      invitation.receiver === gameInfo.myid
    ) {
      return <GameRequest />;
    } else if (
      competitorid &&
      !isGameon &&
      !endGame &&
      invitation.sender === gameInfo.myid
    ) {
      return <WaitingAccept />;
    } else {
      return <PlayerList />;
    }
  };
  return <GAMEBODY>{gameDisplay()}</GAMEBODY>;
}

export default Game;
