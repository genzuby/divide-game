import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { GAMEBODY, PADDING } from '../../styles/MainStyle';
import { BUTTON, TITLE, DESCTEXT } from '../../styles/ComponentStyle';
import { BASIC_COLORS } from '../../styles/styleConstant';
import { getUserList } from '../../actions';
import { GameInfoContext } from '../../contexts/GameInfoContext';

const { MAIN_COLOR_TAKEAWAY, MAIN_TEXT_COLOR_WHITE } = BASIC_COLORS;

function PlayerList({ playerList, getUserList, loginInfo }) {
  const {
    gameInfo,
    setGameInfo,
    contextPlayerList,
    setContextPlayerList,
  } = useContext(GameInfoContext);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  useEffect(() => {
    setContextPlayerList(playerList);
  }, [setContextPlayerList, playerList]);

  const onClickPlay = playerid => {
    //context info update
    setGameInfo({
      ...gameInfo,
      competitorid: playerid,
    });
  };

  const playerlistTag = () => {
    const list = contextPlayerList
      .filter(player => player.userId !== loginInfo.userId)
      .map(player => {
        return (
          <LIST key={player._id} available={player.isAvailable}>
            {player.userId}
            {player.isAvailable && (
              <BUTTON
                textcolor={MAIN_TEXT_COLOR_WHITE}
                bgcolor={MAIN_COLOR_TAKEAWAY}
                borderColor={MAIN_TEXT_COLOR_WHITE}
                style={{ width: '80px', height: '40px' }}
                onClick={() => onClickPlay(player.userId)}
              >
                Play!
              </BUTTON>
            )}
          </LIST>
        );
      });

    return <LISTGROUP>{list}</LISTGROUP>;
  };

  return (
    <GAMEBODY style={{ justifyContent: 'flex-start' }}>
      <TITLE>Which one will be your next competitor?</TITLE>
      <PADDING padding="1.2em" />
      {playerList.length === 0 ? (
        <DESCTEXT>No players yet</DESCTEXT>
      ) : (
        playerlistTag()
      )}
    </GAMEBODY>
  );
}

const mapStateToProps = ({ playerList, loginInfo }) => {
  return { playerList, loginInfo };
};

const LISTGROUP = styled.ul`
  width: 100%;
  padding: 0;
  max-height: 76%;
  overflow-y: auto;
`;

const LIST = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props =>
    props.available ? MAIN_TEXT_COLOR_WHITE : MAIN_COLOR_TAKEAWAY};
  color: ${props =>
    props.available ? MAIN_COLOR_TAKEAWAY : MAIN_TEXT_COLOR_WHITE};
  height: 56px;
  padding: 1em;
  margin-bottom: 0.2em;
  border: 1px solid
    ${props => (props.available ? MAIN_COLOR_TAKEAWAY : MAIN_TEXT_COLOR_WHITE)};
  border-radius: 2px;
`;

export default connect(mapStateToProps, { getUserList })(PlayerList);
