import React, { useContext } from 'react';
import { GameInfoContext } from '../../contexts/GameInfoContext';
import styled from 'styled-components';
import GameCard from './GameCard';

function GameBody() {
  const { gameInfo, gamehistory } = useContext(GameInfoContext);

  const renderGameCard = () => {
    return gamehistory.map((game, idx) => {
      const { player, inputNumber, numFromComp, resultNum } = game;
      const isMe = gameInfo.myid === player;
      return (
        <GameCard
          key={idx}
          isYou={isMe}
          playerid={player}
          playerinput={inputNumber}
          lastsum={numFromComp}
          result={resultNum}
        />
      );
    });
  };

  return <BODY>{gamehistory && renderGameCard()}</BODY>;
}

const BODY = styled.div`
  padding: 3.5em 0 0 0;
  height: 640px;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  // justify-content: flex-end;
`;

export default GameBody;
