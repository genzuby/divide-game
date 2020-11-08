import React from 'react';
import styled from 'styled-components';
import { PADDING } from '../../styles/MainStyle';
import { IMAGE, TITLE, DESCTEXT, ICONBG } from '../../styles/ComponentStyle';
import { BASIC_COLORS } from '../../styles/styleConstant';

const { MAIN_COLOR_TAKEAWAY, MAIN_TEXT_COLOR_WHITE } = BASIC_COLORS;

function GameCard({ isYou, playerid, playerinput, lastsum, result }) {
  const cardCompes = isYou ? 'right' : 'left';
  return (
    <GAMECARDBODY compose={cardCompes}>
      <GAMECARDINFO gridcolumn={isYou ? '2' : '1'}>
        <PADDING padding="1em" />
        <ICONBG size="3.8em">
          <IMAGE
            height="3.6em"
            src={isYou ? '/assets/myface.svg' : '/assets/competitor.svg'}
            alt={isYou ? 'your happy face' : "competitor's angry face"}
          />
        </ICONBG>
        <PADDING padding="0.5em" />
        <DESCTEXT
          style={{
            textAlign: 'center',
            whiteSpace: 'nowrap',
            width: '60px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {isYou ? 'You' : playerid}
        </DESCTEXT>
      </GAMECARDINFO>
      <GAMECARDINFO gridcolumn={isYou ? '1' : '2'}>
        <GAMEPOINT compose={cardCompes}>
          <TITLE style={{ textAlign: 'center' }}>{playerinput}</TITLE>
        </GAMEPOINT>
        <PADDING padding="0.5em" />
        <GAMEDESC compose={cardCompes}>
          <DESCTEXT>
            [({playerinput}+{lastsum})/3] = {result}
          </DESCTEXT>
        </GAMEDESC>
        <PADDING padding="0.2em" />
        <GAMEDESC compose={cardCompes}>
          <DESCTEXT>{result}</DESCTEXT>
        </GAMEDESC>
      </GAMECARDINFO>
    </GAMECARDBODY>
  );
}

const GAMECARDBODY = styled.div`
  display: grid;
  grid-template-columns: ${props =>
    props.compose === 'right' ? `65% 35%` : `35% 65%`};
  grid-template-rows: 1fr;
  background-color: ${props =>
    props.compose === 'right' ? MAIN_COLOR_TAKEAWAY : MAIN_TEXT_COLOR_WHITE};
  border: 1px solid
    ${props =>
      props.compose === 'right' ? MAIN_TEXT_COLOR_WHITE : MAIN_COLOR_TAKEAWAY};
  color: ${props =>
    props.compose === 'right' ? MAIN_TEXT_COLOR_WHITE : MAIN_COLOR_TAKEAWAY};
  align-self: ${props =>
    props.compose === 'right' ? 'flex-end' : 'flex-start'};
  height: 120px;
  width: 240px;
  border-radius: 2px;
  margin-bottom: 1em;
  right: 0;
`;

const GAMECARDINFO = styled.div`
  grid-column: ${props => props.gridcolumn};
  grid-row: 1;
  disply: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
  div {
    align-self: center;
  }
`;

const GAMEPOINT = styled.div`
  background-color: ${props =>
    props.compose === 'right' ? MAIN_TEXT_COLOR_WHITE : MAIN_COLOR_TAKEAWAY};
  color: ${props =>
    props.compose === 'right' ? MAIN_COLOR_TAKEAWAY : MAIN_TEXT_COLOR_WHITE};
  border: 1px solid
    ${props =>
      props.compose === 'right' ? MAIN_COLOR_TAKEAWAY : MAIN_TEXT_COLOR_WHITE};
  height: 50%;
  width: 100%;
  border-radius: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GAMEDESC = styled.div`
  padding: 0 0.5em;
  display: flex;
  justify-content: center;
  border: 1px solid
    ${props =>
      props.compose === 'right' ? MAIN_TEXT_COLOR_WHITE : MAIN_COLOR_TAKEAWAY};
`;

export default GameCard;
