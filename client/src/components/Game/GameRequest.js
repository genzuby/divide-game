import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { selectCompetitor } from '../../actions';
import { GameInfoContext } from '../../contexts/GameInfoContext';
import { FLEXGROUPROW, PADDING } from '../../styles/MainStyle';
import { TITLE, ROUNDDIV, BUTTON, DESCTEXT } from '../../styles/ComponentStyle';
import { BASIC_COLORS } from '../../styles/styleConstant';
const {
  MAIN_COLOR_TAKEAWAY,
  MAIN_TEXT_COLOR_WHITE,
  POINT_COLOR_BLUE,
  DARK_GRAY,
} = BASIC_COLORS;

function GameRequest({ selectCompetitor }) {
  const {
    gameInfo,
    setGameInfo,
    setLastTurn,
    invitation,
    sendRequestCancel,
    acceptInvitation,
  } = useContext(GameInfoContext);

  const updateData = id => {
    const messageBody = {
      userId: id,
      isAvailable: false,
    };
    selectCompetitor(id, messageBody);
  };

  const onClickPlay = isPlay => {
    const myid = gameInfo.myid;
    const competitorid = gameInfo.competitorid;

    acceptInvitation(invitation.sender, isPlay);
    setGameInfo(prev => ({
      ...prev,
      competitorid: isPlay ? invitation.sender : '',
    }));

    if (isPlay) {
      // the requester will be the first turn!!
      setLastTurn({ whosTurn: competitorid, isReady: true });
      updateData(myid);
      updateData(competitorid);
    } else {
      sendRequestCancel(invitation.sender);
    }
  };

  return (
    <>
      <TITLE style={{ textAlign: 'center' }}>
        {invitation.sender} asked you to play!
      </TITLE>
      <PADDING padding="3em" />
      <DESCTEXT>Game number is</DESCTEXT>
      <PADDING padding="1.5em" />
      <ROUNDDIV
        height="100px"
        width="100px"
        bgcolor={MAIN_TEXT_COLOR_WHITE}
        color={MAIN_COLOR_TAKEAWAY}
        fontsize="3rem"
        padding="0.5em"
      >
        {gameInfo.gameNumber}
      </ROUNDDIV>
      <PADDING padding="7em" />
      <FLEXGROUPROW>
        <BUTTON
          textcolor={MAIN_TEXT_COLOR_WHITE}
          bgcolor={POINT_COLOR_BLUE}
          borderColor={POINT_COLOR_BLUE}
          style={{ width: '120px' }}
          onClick={() => onClickPlay(true)}
        >
          Ja!
        </BUTTON>
        <PADDING wpadding="0.2em" />
        <BUTTON
          textcolor={MAIN_TEXT_COLOR_WHITE}
          bgcolor={DARK_GRAY}
          borderColor={DARK_GRAY}
          style={{ width: '120px' }}
          onClick={() => onClickPlay(false)}
        >
          Ne!
        </BUTTON>
      </FLEXGROUPROW>
    </>
  );
}

export default connect(null, { selectCompetitor })(GameRequest);
