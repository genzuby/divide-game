import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Login from './components/Login';
import Game from './components/Game';
import { SocketProvider } from './contexts/SocketContext';
import { GameInfoProvider } from './contexts/GameInfoContext';

function App({ loginInfo }) {
  const [playerId, setPlayerId] = useState('');

  useEffect(() => {
    setPlayerId(loginInfo.userId);
  }, [loginInfo]);

  const appmain = (
    <SocketProvider id={playerId}>
      <GameInfoProvider id={playerId}>
        <Game />
      </GameInfoProvider>
    </SocketProvider>
  );

  return <div data-test="appComponent">{playerId ? appmain : <Login />}</div>;
}

const mapStateToProps = ({ loginInfo }) => {
  return { loginInfo };
};

export default connect(mapStateToProps)(App);
