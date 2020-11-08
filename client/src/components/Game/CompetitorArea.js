import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameInfoContext } from '../../contexts/GameInfoContext';
import { IMAGE, TITLE } from '../../styles/ComponentStyle';
import { BASIC_COLORS } from '../../styles/styleConstant';

const { MAIN_COLOR_TAKEAWAY } = BASIC_COLORS;

function CompetitorArea() {
  const { gameInfo } = useContext(GameInfoContext);
  const { competitorid, gameNumber, lastNumber } = gameInfo;
  const currentGameNumber = lastNumber === -1 ? gameNumber : lastNumber;

  return (
    <INFOBODY bgcolor={MAIN_COLOR_TAKEAWAY}>
      <TITLE>{currentGameNumber}</TITLE>
      <TITLE
        style={{
          textAlign: 'center',
          whiteSpace: 'nowrap',
          width: '200px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {competitorid}
      </TITLE>
      <IMAGE
        height="2.6em"
        src="/assets/competitor.svg"
        alt="competitor's angry face"
      />
    </INFOBODY>
  );
}

const INFOBODY = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  height: 5.4em;
  width: 100%;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  padding: 2em;
  border-radius: 1em 1em 0 0;
  background-color: ${props => props.bgcolor};
`;

export default CompetitorArea;
