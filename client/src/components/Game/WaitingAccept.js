import React, { useContext } from 'react';
import { GameInfoContext } from '../../contexts/GameInfoContext';
import { PADDING } from '../../styles/MainStyle';
import { TITLE, WAITING, BUTTON } from '../../styles/ComponentStyle';
import { BASIC_COLORS } from '../../styles/styleConstant';

const { MAIN_COLOR_TAKEAWAY, MAIN_TEXT_COLOR_WHITE } = BASIC_COLORS;

function WaitingAccept() {
  const { invitation, sendRequestCancel } = useContext(GameInfoContext);

  return (
    <>
      <TITLE style={{ textAlign: 'center' }}>
        Waiting for {invitation.receiver} !
      </TITLE>
      <PADDING padding="2em" />
      <WAITING src="/assets/waiting.svg" />
      <PADDING padding="8em" />
      <BUTTON
        textcolor={MAIN_TEXT_COLOR_WHITE}
        bgcolor={MAIN_COLOR_TAKEAWAY}
        borderColor={MAIN_TEXT_COLOR_WHITE}
        style={{ width: '70%' }}
        onClick={() => sendRequestCancel(invitation.receiver)}
      >
        Cancel Request
      </BUTTON>
    </>
  );
}

export default WaitingAccept;
