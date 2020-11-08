import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { endGameSet, selectCompetitor } from '../../actions';
import { GameInfoContext } from '../../contexts/GameInfoContext';
import { PADDING, FLEXGROUPROW } from '../../styles/MainStyle';
import { TITLE, IMAGE, BUTTON } from '../../styles/ComponentStyle';
import { BASIC_COLORS } from '../../styles/styleConstant';

const { MAIN_TEXT_COLOR_WHITE, POINT_COLOR_BLUE, DARK_GRAY } = BASIC_COLORS;

function WinnerPage({ endGameSet, selectCompetitor }) {
  const { gameInfo, gameReset } = useContext(GameInfoContext);
  const { myid, winnerId, endGame } = gameInfo;
  const areYouWinner = endGame && winnerId === myid;

  const handleOnClick = async type => {
    gameReset(type);
    const messageBody = {
      userId: myid,
      isAvailable: true,
    };

    await selectCompetitor(myid, messageBody);

    if (type === 'QUIT_GAME') {
      endGameSet();
    }
  };

  return (
    <>
      <TITLE style={{ textAlign: 'center' }}>
        {areYouWinner ? `Congraturations ${myid}` : `Oh No, ${myid}!`}
      </TITLE>
      <PADDING padding="0.5em" />
      <TITLE style={{ textAlign: 'center', fontSize: '2.8rem' }}>
        {areYouWinner ? `You win!` : `You Lose!`}
      </TITLE>
      <PADDING padding="2em" />
      {areYouWinner ? (
        <IMAGE height="6em" src="/assets/winner.png" />
      ) : (
        <IMAGE height="6em" src="/assets/loose.png" />
      )}
      <PADDING padding="2em" />
      <TITLE style={{ textAlign: 'center' }}>Do you wanna play again?</TITLE>
      <PADDING padding="2em" />
      <FLEXGROUPROW>
        <BUTTON
          textcolor={MAIN_TEXT_COLOR_WHITE}
          bgcolor={POINT_COLOR_BLUE}
          borderColor={POINT_COLOR_BLUE}
          style={{ width: '120px' }}
          onClick={() => handleOnClick('RESTART_GAME')}
        >
          Ja!
        </BUTTON>
        <PADDING wpadding="0.2em" />
        <BUTTON
          textcolor={MAIN_TEXT_COLOR_WHITE}
          bgcolor={DARK_GRAY}
          borderColor={DARK_GRAY}
          style={{ width: '120px' }}
          onClick={() => handleOnClick('QUIT_GAME')}
        >
          Ne!
        </BUTTON>
      </FLEXGROUPROW>
    </>
  );
}

export default connect(null, { endGameSet, selectCompetitor })(WinnerPage);
