import React, { useContext, useEffect } from 'react';
import { GameInfoContext } from '../../contexts/GameInfoContext';
import { FLEXGROUPROW } from '../../styles/MainStyle';
import { BUTTON } from '../../styles/ComponentStyle';
import { BASIC_COLORS } from '../../styles/styleConstant';

const { POINT_COLOR_BLUE, LIGHT_GRAY, MAIN_TEXT_COLOR_WHITE } = BASIC_COLORS;

function GameInput() {
  const {
    gameInfo,
    sendGameMessage,
    isMyTurn,
    lastTurn,
    availableInput,
  } = useContext(GameInfoContext);
  const { myid, competitorid, lastNumber, gameNumber, isAutoPlay } = gameInfo;

  const iconstyle = {
    backgroundColor: POINT_COLOR_BLUE,
    fontSize: '1.6rem',
    margin: '0.5em',
    cursor: 'pointer',
    padding: '0.5em',
    height: '2.4em',
    width: '2.4em',
    borderRadius: '50%',
    color: MAIN_TEXT_COLOR_WHITE,
  };
  const iconstyle_able = {
    backgroundColor: POINT_COLOR_BLUE,
  };
  const iconstyle_disable = {
    backgroundColor: LIGHT_GRAY,
  };

  const btnStyle = operator => {
    return isMyTurn && availableInput === operator
      ? { ...iconstyle, ...iconstyle_able }
      : { ...iconstyle, ...iconstyle_disable };
  };

  useEffect(() => {
    // auto play
    const chkTurn = lastTurn.isReady && lastTurn.whosTurn === myid;
    if (chkTurn && isAutoPlay && isMyTurn) {
      const playNumber = lastNumber === -1 ? gameNumber : lastNumber;
      const value = [-1, 0, 1].filter(val => (val + playNumber) % 3 === 0);

      let autoTimer = setTimeout(
        () => sendGameMessage(competitorid, value[0], playNumber),
        2000
      );

      return () => clearTimeout(autoTimer);
    }
  }, [
    sendGameMessage,
    isMyTurn,
    isAutoPlay,
    competitorid,
    gameNumber,
    lastNumber,
    availableInput,
    lastTurn.isReady,
    lastTurn.whosTurn,
    myid,
  ]);

  const handleOnClik = value => {
    const playNumber = lastNumber === -1 ? gameNumber : lastNumber;
    // send game message
    if (!isAutoPlay) {
      sendGameMessage(competitorid, value, playNumber);
    }
  };

  return (
    <FLEXGROUPROW>
      <BUTTON
        style={btnStyle(-1)}
        disabled={!isMyTurn || !(availableInput === -1) || isAutoPlay}
        onClick={() => handleOnClik(-1)}
      >
        -1
      </BUTTON>
      <BUTTON
        style={btnStyle(0)}
        disabled={!isMyTurn || !(availableInput === 0) || isAutoPlay}
        onClick={() => handleOnClik(0)}
      >
        0
      </BUTTON>
      <BUTTON
        style={btnStyle(1)}
        disabled={!isMyTurn || !(availableInput === 1) || isAutoPlay}
        onClick={() => handleOnClik(1)}
      >
        1
      </BUTTON>
    </FLEXGROUPROW>
  );
}

export default GameInput;
