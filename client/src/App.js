import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Game from './components/Game';
import { SocketProvider } from './contexts/SocketContext';
import { GameInfoProvider } from './contexts/GameInfoContext';

export default function App() {
  const [playerId, setPlayerId] = useState('');
  const loginInfo = useSelector(state => state.loginInfo);

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
